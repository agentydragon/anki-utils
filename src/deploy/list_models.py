"""
bazel run //src/deploy:list_models -- \
    --collection_path=<...>.anki2 --alsologtostderr
"""

from absl import app
from absl import logging
from absl import flags

import operator
import os
import json
import sys

sys.path.append('/usr/share/anki')
import anki

flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
FLAGS = flags.FLAGS


def main(_):
    collection = anki.Collection(FLAGS.collection_path)
    found = None
    for model in collection.models.all():
        logging.info("%s (%s):", model['name'], model['crowdanki_uuid'])
        logging.info("%s", [tmpl['name'] for tmpl in model['tmpls']])


if __name__ == '__main__':
    flags.mark_flag_as_required('collection_path')
    app.run(main)
