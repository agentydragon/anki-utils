"""
blaze run //src/deploy -- --alsologtostderr --collection_path=<...>

If all looks fine, run also --dry_run=False.
"""

from absl import app
from absl import logging
from absl import flags

from rules_python.python.runfiles import runfiles

import os
import json
import sys

sys.path.append('/usr/share/anki')
import anki

flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('slug_path', None, 'Path to update JSON slug')
flags.DEFINE_bool('dry_run', True, 'Whether to actually do it')
FLAGS = flags.FLAGS

# Example update slug:
# CONFIG = {
#     # CrowdAnki UUID
#     '': {
#         # CSS
#         'css': (CSS),
#         'templates': [
#             'Cloze': {
#                 # HTML for question
#                 'qfmt': TODO
#                 # HTML for answer
#                 'afmt': TODO
#             }
#         ]
#     }
# }
# Permuted Rows Cloze (JS powered)


def find_model_by_uuid(collection, uuid):
    found = None
    for model in collection.models.all():
        if model['crowdanki_uuid'] == uuid:
            if found:
                raise Exception("Multiple models with UUID " + uuid)
            found = model
    if found:
        return found
    raise KeyError("Model with UUID " + uuid + " not found.")


def apply_model_update(model, model_update):
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
            raise KeyError(
                'Template with name {} not found. Available: {}'.format(template_name, [template['name']
                                                                                        for template in model['tmpls']]))

        if 'qfmt' in template_content:
            template_found['qfmt'] = template_content['qfmt']
        if 'afmt' in template_content:
            template_found['afmt'] = template_content['afmt']


def apply_slug(collection, slug):
    for uuid, model_update in slug.items():
        logging.info("Updating model with UUID %s", uuid)
        model = find_model_by_uuid(collection, uuid)
        apply_model_update(model, model_update)
        if not FLAGS.dry_run:
            collection.models.update(model)


def main(_):
    collection = anki.Collection(FLAGS.collection_path)

    slug_path = FLAGS.slug_path
    if slug_path is None:
        path = runfiles.Create().Rlocation("__main__/src/deploy/slug.json")
        logging.info("Loading slug from runfiles: %s", path)
        slug_path = path

    with open(slug_path, 'r') as f:
        slug = json.load(f)

    apply_slug(collection, slug)

    if not FLAGS.dry_run:
        collection.models.flush()


if __name__ == '__main__':
    flags.mark_flag_as_required('collection_path')
    app.run(main)
