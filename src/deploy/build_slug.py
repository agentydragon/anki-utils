"""
blaze build //src/deploy:slug.json
"""

from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('models', None, 'input files')
flags.DEFINE_string('output_file', None, 'output file')

FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def main(_):
    slug = {}
    for model in json.loads(FLAGS.models)['models']:
        logging.vlog(1, "Model: %s", model)
        uuid = model['crowdanki_uuid']
        if uuid in slug:
            raise Exception("duplicated UUID: " + uuid)
        templates = {}
        for template in model['templates']:
            human_name = template['human_name']
            if human_name in templates:
                raise Exception("duplicated human_name " +
                                human_name + " in UUID " + uuid)
            templates[human_name] = {
                'qfmt': read_file(template['question_html']),
                'afmt': read_file(template['answer_html']),
            }
        slug[uuid] = {
            'css': read_file(model['css']),
            'templates': templates
        }
    with open(FLAGS.output_file, 'w') as f:
        json.dump(slug, f)


if __name__ == '__main__':
    flags.mark_flags_as_required(['output_file', 'models'])
    app.run(main)
