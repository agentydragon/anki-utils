"""
blaze build //src/deploy:slug.json
"""

from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('cloze_uuid', None, 'Cloze CrowdAnki UUID')
flags.DEFINE_string('cloze_html_front_path', None, 'Cloze template HTML path')
flags.DEFINE_string('cloze_html_back_path', None, 'Cloze template HTML path')
flags.DEFINE_string('cloze_css_path', None, 'Cloze CSS path')

flags.DEFINE_string('permuted_cloze_uuid', None,
                    'Permuted Cloze CrowdAnki UUID')
flags.DEFINE_string('permuted_cloze_html_front_path', None,
                    'Permuted Cloze template HTML path')
flags.DEFINE_string('permuted_cloze_html_back_path', None,
                    'Permuted Cloze template HTML path')
flags.DEFINE_string('permuted_cloze_css_path', None, 'Permuted Cloze CSS path')


flags.DEFINE_string('keyboard_shortcut_uuid', None,
                    'Keyboard Shortcut CrowdAnki UUID')
flags.DEFINE_string('keyboard_shortcut_html_shortcut_to_effect_front_path', None,
                    'Keyboard Shortcut Shortcut->Effect front template HTML path')
flags.DEFINE_string('keyboard_shortcut_html_shortcut_to_effect_back_path', None,
                    'Keyboard Shortcut Shortcut->Effect back template HTML path')
flags.DEFINE_string('keyboard_shortcut_html_effect_to_shortcut_front_path', None,
                    'Keyboard Shortcut Effect->Shortcut front template HTML path')
flags.DEFINE_string('keyboard_shortcut_html_effect_to_shortcut_back_path', None,
                    'Keyboard Shortcut Effect->Shortcut back template HTML path')
flags.DEFINE_string('keyboard_shortcut_css_path',
                    None, 'Permuted Cloze CSS path')

flags.DEFINE_string('output_slug_path', None, 'Output slug path')
FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def main(_):
    slug = {}
    if FLAGS.cloze_uuid in slug:
        raise Exception("Duplicated UUID")
    slug[FLAGS.cloze_uuid] = {
        'css': read_file(FLAGS.cloze_css_path),
        'templates': {
            'Cloze': {
                'qfmt': read_file(FLAGS.cloze_html_front_path),
                'qfmt': read_file(FLAGS.cloze_html_back_path),
            }
        }
    }
    if FLAGS.permuted_cloze_uuid in slug:
        raise Exception("Duplicated UUID")
    slug[FLAGS.permuted_cloze_uuid] = {
        'css': read_file(FLAGS.permuted_cloze_css_path),
        'templates': {
            'Cloze': {
                'qfmt': read_file(FLAGS.permuted_cloze_html_front_path),
                'qfmt': read_file(FLAGS.permuted_cloze_html_back_path),
            }
        }
    }
    if FLAGS.keyboard_shortcut_uuid in slug:
        raise Exception("Duplicated UUID")
    slug[FLAGS.keyboard_shortcut_uuid] = {
        'css': read_file(FLAGS.keyboard_shortcut_css_path),
        'templates': {
            'Effect to Shortcut': {
                'qfmt':
                read_file(
                    FLAGS.keyboard_shortcut_html_effect_to_shortcut_front_path),
                'qfmt':
                read_file(
                    FLAGS.keyboard_shortcut_html_effect_to_shortcut_back_path),
            },
            'Shortcut to Effect': {
                'qfmt':
                read_file(
                    FLAGS.keyboard_shortcut_html_shortcut_to_effect_front_path),
                'qfmt':
                read_file(
                    FLAGS.keyboard_shortcut_html_shortcut_to_effect_back_path),
            }
        }
    }
    with open(FLAGS.output_slug_path, 'w') as f:
        json.dump(slug, f)


if __name__ == '__main__':
    flags.mark_flag_as_required('cloze_uuid')
    flags.mark_flag_as_required('cloze_html_front_path')
    flags.mark_flag_as_required('cloze_html_back_path')
    flags.mark_flag_as_required('cloze_css_path')

    flags.mark_flag_as_required('permuted_cloze_uuid')
    flags.mark_flag_as_required('permuted_cloze_html_front_path')
    flags.mark_flag_as_required('permuted_cloze_html_back_path')
    flags.mark_flag_as_required('permuted_cloze_css_path')

    flags.mark_flag_as_required('output_slug_path')
    app.run(main)
