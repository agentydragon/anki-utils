"""
blaze build //src/deploy:slug.json
"""

from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('templates_json', None, 'templates json')
flags.DEFINE_string('output_file', None, 'answer html')
flags.DEFINE_string('fields', None, 'fields')
flags.DEFINE_string('css', None, 'css file')
flags.DEFINE_enum('type', None, ['normal', 'cloze'], 'type')

FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def main(_):
    templates = {}
    for template in json.loads(FLAGS.templates_json)['templates']:
        human_name = template['human_name']
        if human_name in templates:
            raise Exception("duplicated human_name " + human_name)
        templates[human_name] = json.loads(read_file(template['slug']))
    with open(FLAGS.output_file, 'w') as f:
        json.dump({'css': read_file(FLAGS.css),
                   'templates': templates,
                   'fields': json.loads(FLAGS.fields)['fields'],
                   'type': FLAGS.type}, f)


if __name__ == '__main__':
    flags.mark_flags_as_required(['templates_json', 'output_file', 'css',
                                  'fields', 'type'])
    app.run(main)
