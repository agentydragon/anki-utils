from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('crowdanki_uuid', None, 'Model CrowdAnki UUID')
flags.DEFINE_string('output_slug_path', None, 'Output slug path')
FLAGS = flags.FLAGS


def main(_):
    with open(FLAGS.output_slug_path, 'w') as f:
        f.write("it works " + FLAGS.crowdanki_uuid)


if __name__ == '__main__':
    flags.mark_flag_as_required('crowdanki_uuid')
    flags.mark_flag_as_required('output_slug_path')
    app.run(main)
