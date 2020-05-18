"""
blaze run //src/deploy -- --alsologtostderr --collection_path=<...>

If all looks fine, run also --dry_run=False.

Example update slug:

  {
    '1234-abcd-crowdanki-uuid': {
      'css': '#card { ... } css { ... }',
      'templates': [
        'Card name': {
          'qfmt': 'HTML for question...',
          'afmt': 'HTML for answer...',
        }
      ]
    }
  }
"""

from absl import app
from absl import logging
from absl import flags

from rules_python.python.runfiles import runfiles

import operator
import anki
import os
import json
import yaml

flags.DEFINE_string('anki_path', '/usr/share/anki',
                    'Path to Anki Python stuff')
flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('config_yaml', None, 'Config YAML')
flags.DEFINE_string('slug_path', None, 'Path to update JSON slug')
flags.DEFINE_bool('dry_run', True, 'Whether to actually do it')
FLAGS = flags.FLAGS

SLUG_RUNFILES_PATH = 'anki_utils/src/models/slug.json'


def _find_unique_model(collection, predicate, human_desc):
    found = list(filter(predicate, collection.models.all()))
    if not found:
        raise KeyError(f"Model not found: {human_desc}")
    if len(found) > 1:
        raise Exception(f"Multiple models matching {human_desc}: {map(operator.itemgetter('id'), found)}")
    return found[0]


def _find_model_by_uuid(collection, uuid):
    return _find_unique_model(collection, lambda model: model.get('crowdanki_uuid') == uuid, 'crowdanki_uuid ' + uuid)


def _find_model_by_name(collection, name):
    return _find_unique_model(collection, lambda model: model['name'] == name, 'name ' + name)


def _find_model_template(model, template_name):
    template_found = None
    for template in model['tmpls']:
        if template['name'] == template_name:
            if template_found:
                raise Exception(
                    'Multiple templates with name {}'.format(template_name))
            template_found = template
    if not template_found:
        available_templates = [template['name'] for template in model['tmpls']]
        raise KeyError('Template with name {} not found. Available: {}'.format(
            template_name, available_templates))
    return template_found


def _apply_model_update(model, model_update):
    if 'css' in model_update:
        model['css'] = model_update['css']

    for template_name, template_content in model_update['templates'].items():
        template_found = _find_model_template(model, template_name)
        if 'qfmt' in template_content:
            template_found['qfmt'] = template_content['qfmt']
        if 'afmt' in template_content:
            template_found['afmt'] = template_content['afmt']


def _apply_slug(collection, config, slug):
    for model_update_spec in config['models']:
        mapping = model_update_spec['mapping']
        if 'crowdanki_uuid' in mapping:
            uuid = model_update_spec['mapping']['crowdanki_uuid']
            logging.info("Updating model with UUID %s", uuid)
            model = _find_model_by_uuid(collection, uuid)
        elif 'name' in mapping:
            name = model_update_spec['mapping']['name']
            logging.info("Updating model with name %s", name)
            model = _find_model_by_name(collection, name)
        else:
            raise Exception("no mapping spec")
        target = model_update_spec['model']
        model_update = slug[target]
        #logging.info('%s', model_update['fields'])
        #logging.info('%s', model['flds'])
        field_names_in_anki = set(
            map(operator.itemgetter('name'), model['flds']))
        field_names_in_defn = set(model_update['fields'])
        if field_names_in_anki - field_names_in_defn:
            logging.error('Anki references undefined fields: %s',
                          field_names_in_anki - field_names_in_defn)
            # TODO: crash?
        if field_names_in_defn - field_names_in_anki:
            logging.error('Defn references fields not in Anki: %s',
                          field_names_in_defn - field_names_in_anki)

        _apply_model_update(model, model_update)
        collection.models.update(model)


def main(_):
    r = runfiles.Create()
    collection = anki.Collection(FLAGS.collection_path)

    slug_path = FLAGS.slug_path
    if slug_path is None:
        path = r.Rlocation(SLUG_RUNFILES_PATH)
        logging.info("Loading slug from runfiles: %s", path)
        slug_path = path

    with open(slug_path, 'r') as f:
        slug = json.load(f)

    with open(FLAGS.config_yaml, 'r') as f:
        config = yaml.load(f, loader=yaml.Loader)

    _apply_slug(collection, config, slug)
    collection.models.flush()

    if FLAGS.dry_run:
        logging.info("If all looks good, run with --nodry_run to commit.")
    else:
        collection.save()
        logging.info("Changes were actually commited.")


if __name__ == '__main__':
    flags.mark_flags_as_required(['collection_path', 'config_yaml'])
    app.run(main)
