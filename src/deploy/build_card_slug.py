"""
blaze build //src/deploy:slug.json
"""

from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('question_html_file', None, 'question html')
flags.DEFINE_string('answer_html_file', None, 'answer html')
flags.DEFINE_string('output_file', None, 'answer html')

FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def main(_):
    with open(FLAGS.output_file, 'w') as f:
        json.dump({'qfmt': read_file(FLAGS.question_html_file),
                   'afmt': read_file(FLAGS.answer_html_file)}, f)


if __name__ == '__main__':
    flags.mark_flags_as_required(['question_html_file', 'answer_html_file',
                                  'output_file'])
    app.run(main)
