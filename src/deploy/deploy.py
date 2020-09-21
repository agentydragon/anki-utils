"""
blaze run //src/deploy -- --alsologtostderr --collection_path=<...>

If all looks fine, run also --dry_run=False.

Example update slug:

  {
    '1234-abcd-crowdanki-uuid': {
      'css': '#card { ... } css { ... }',
      'templates': [
        'Card name': {
          'qfmt': 'HTML for question...',
          'afmt': 'HTML for answer...',
        }
      ]
    }
  }
"""

from absl import app
from absl import logging
from absl import flags

from src.deploy import deploy_lib
from rules_python.python.runfiles import runfiles

import anki
import json
import yaml

flags.DEFINE_string('collection_path', None, 'Path to .anki2 collection')
flags.DEFINE_string('config_yaml', None, 'Config YAML')
flags.DEFINE_string('slug_path', None, 'Path to update JSON slug')
flags.DEFINE_bool('dry_run', True, 'Whether to actually do it')
flags.DEFINE_bool('add_if_missing', False,
                  'Whether to add new models if they are missing')
FLAGS = flags.FLAGS

SLUG_RUNFILES_PATH = 'anki_utils/src/models/slug.json'


def main(_):
    r = runfiles.Create()
    collection = anki.Collection(FLAGS.collection_path)

    slug_path = FLAGS.slug_path
    if slug_path is None:
        path = r.Rlocation(SLUG_RUNFILES_PATH)
        logging.info("Loading slug from runfiles: %s", path)
        slug_path = path

    with open(slug_path, 'r') as f:
        slug = json.load(f)

    with open(FLAGS.config_yaml, 'r') as f:
        config = yaml.load(f, Loader=yaml.Loader)

    deploy_lib.apply_slug(collection.models, config,
                          slug, FLAGS.add_if_missing)
    collection.models.flush()

    if FLAGS.dry_run:
        logging.info("If all looks good, run with --nodry_run to commit.")
    else:
        collection.save()
        logging.info("Changes were actually commited.")


if __name__ == '__main__':
    flags.mark_flags_as_required(['collection_path', 'config_yaml'])
    app.run(main)
