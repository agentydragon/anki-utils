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
        target = model['target']
        if target in slug:
            raise Exception("duplicated target: " + target)
        model_slug = json.loads(read_file(model['slug']))
        slug[target] = model_slug
        #templates = {}
        #for template in model['templates']:
        #    human_name = template['human_name']
        #    if human_name in templates:
        #        raise Exception("duplicated human_name " +
        #                        human_name + " in target " + target)
        #    templates[human_name] = {
        #        'qfmt': read_file(template['question_html']),
        #        'afmt': read_file(template['answer_html']),
        #    }
        #slug[target] = {
        #    'css': read_file(model['css']),
        #    'templates': templates
        #}
    with open(FLAGS.output_file, 'w') as f:
        json.dump(slug, f)


if __name__ == '__main__':
    flags.mark_flags_as_required(['output_file', 'models'])
    app.run(main)
