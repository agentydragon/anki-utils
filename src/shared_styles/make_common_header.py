from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_list('fields', None, 'field names the model has')
flags.DEFINE_string('output_file', None, 'output file')

FLAGS = flags.FLAGS
KNOWN_FIELDS = {'Heading', 'Seed', 'Log'}
ALWAYS_PRESENT_FIELDS = {'Deck', 'Tags', 'Type', 'Card'}


def main(_):
    with open(FLAGS.output_file, 'w') as f:
        f.write('<div id="agentydragon-fields">\n')
        # TODO: create bazel build constants for those field names
        # TODO: check that FLAGS.fields is in KNOWN_FIELDS
        for field in ALWAYS_PRESENT_FIELDS.union(FLAGS.fields):
            if field == 'TextUnclozed':
                f.write('  <span data-field="' +
                        field + '">{{text:Text}}</span>')
            else:
                f.write('  <span data-field="' + field +
                        '">{{' + field + '}}</span>\n')

        f.write('</div>\n')
        f.write('<div id="agentydragon-log"></div>\n')


if __name__ == '__main__':
    flags.mark_flags_as_required(['fields', 'output_file'])
    app.run(main)
