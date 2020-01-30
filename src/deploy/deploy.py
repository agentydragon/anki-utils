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

import os
import json
import sys

flags.DEFINE_string('anki_path', '/usr/share/anki', 'Path to Anki Python stuff')
flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('slug_path', None, 'Path to update JSON slug')
flags.DEFINE_bool('dry_run', True, 'Whether to actually do it')
FLAGS = flags.FLAGS

SLUG_RUNFILES_PATH = 'anki_utils/src/models/slug.json'


def _FindModelByUUID(collection, uuid):
    found = None
    for model in collection.models.all():
        if model['crowdanki_uuid'] == uuid:
            if found:
                raise Exception("Multiple models with UUID " + uuid)
            found = model
    if found:
        return found
    raise KeyError("Model with UUID " + uuid + " not found.")


def _ApplyModelUpdate(model, model_update):
    if 'css' in model_update:
        model['css'] = model_update['css']

    for template_name, template_content in model_update['templates'].items():
        template_found = None
        for template in model['tmpls']:
            if template['name'] == template_name:
                if template_found:
                    raise Exception(
                        'Multiple templates with name {}'.format(template_name))
                template_found = template
        if not template_found:
            available_templates = [
                template['name'] for template in model['tmpls']]
            raise KeyError(
                'Template with name {} not found. Available: {}'.format(
                    template_name, available_templates))

        if 'qfmt' in template_content:
            template_found['qfmt'] = template_content['qfmt']
        if 'afmt' in template_content:
            template_found['afmt'] = template_content['afmt']


def _ApplySlug(collection, slug):
    for uuid, model_update in slug.items():
        logging.info("Updating model with UUID %s", uuid)
        model = _FindModelByUUID(collection, uuid)
        _ApplyModelUpdate(model, model_update)
        collection.models.update(model)


def main(_):
    r = runfiles.Create()
    sys.path.append(FLAGS.anki_path)
    import anki
    collection = anki.Collection(FLAGS.collection_path)

    slug_path = FLAGS.slug_path
    if slug_path is None:
        path = r.Rlocation(SLUG_RUNFILES_PATH)
        logging.info("Loading slug from runfiles: %s", path)
        slug_path = path

    with open(slug_path, 'r') as f:
        slug = json.load(f)

    _ApplySlug(collection, slug)
    collection.models.flush()

    if FLAGS.dry_run:
        logging.info("If all looks good, run with --nodry_run to commit.")
    else:
        collection.save()
        logging.info("Changes were actually commited.")


if __name__ == '__main__':
    flags.mark_flag_as_required('collection_path')
    app.run(main)
