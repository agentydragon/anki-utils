from absl import app
from absl import logging
from absl import flags

import os
import json
import sys

sys.path.append('/usr/share/anki')
import anki

flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('update_slug_path', None, 'Path to update JSON slug')
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


def main(_):
    collection = anki.Collection(FLAGS.collection_path)

    with open(FLAGS.update_slug_path, 'r') as f:
        update_slug = json.load(f)

    for uuid, model_update in update_slug.iteritems():
        logging.info("Updating model with UUID %s", uuid)
        model = find_model_by_uuid(uuid)

        if 'css' in model_update:
            model['css'] = model_update['css']

        for template_name, template_content in model_update:
            template_found = None
            for template in model['tmpls']:
                if template['name'] == template_name:
                    if template_found:
                        raise Exception(
                            "Multiple templates with name " + template_name)
                    template_found = template
            if not template_found:
                raise KeyError("Template with name " +
                               template_name + " not found")

            if 'qfmt' in template_content:
                template_found['qfmt'] = template_content['qfmt']
            if 'afmt' in template_content:
                template_found['afmt'] = template_content['afmt']

        collection.models.update(model)

    collection.models.flush()


if __name__ == '__main__':
    flags.mark_flag_as_required('collection_path')
    app.run(main)
