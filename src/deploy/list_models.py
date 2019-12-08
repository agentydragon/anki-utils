"""
bazel run //src/deploy:list_models -- \
    --collection_path=<...>.anki2 --alsologtostderr
"""

from absl import app
from absl import logging
from absl import flags
from rules_python.python.runfiles import runfiles

import operator
import os
import json
import sys

sys.path.append('/usr/share/anki')
import anki

flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('slug_path', None, 'Path to update JSON slug')
FLAGS = flags.FLAGS


def log_model(model):
    crowdanki_uuid = model['crowdanki_uuid']
    logging.info("- %s (%s):", model['name'], crowdanki_uuid)
    for tmpl in model['tmpls']:
        logging.info("    %s", tmpl['name'])


def main(_):
    slug_path = FLAGS.slug_path
    if slug_path is None:
        path = runfiles.Create().Rlocation("__main__/src/deploy/slug.json")
        logging.info("Loading slug from runfiles: %s", path)
        slug_path = path

    with open(slug_path, 'r') as f:
        slug = json.load(f)
    managed_uuids = slug.keys()
    logging.info("Managed UUIDs:")
    for key in managed_uuids:
        logging.info("- %s", key)

    collection = anki.Collection(FLAGS.collection_path)
    found = None
    seen_uuids = set()
    managed_models = []
    untracked_models = []
    for model in collection.models.all():
        crowdanki_uuid = model['crowdanki_uuid']
        is_managed = (crowdanki_uuid in managed_uuids)
        if is_managed:
            managed_models.append(model)
        else:
            untracked_models.append(model)
        seen_uuids.add(crowdanki_uuid)

    logging.info("")
    logging.info("Managed models:")
    for model in managed_models:
        log_model(model)

    logging.info("")
    logging.info("Untracked models:")
    for model in untracked_models:
        log_model(model)

    missing_managed = set(managed_uuids) - seen_uuids
    if len(missing_managed) > 0:
        logging.error('UUIDs managed but not in collection: %s',
                      missing_managed)


if __name__ == '__main__':
    flags.mark_flag_as_required('collection_path')
    app.run(main)
