"""
blaze build //src/deploy:slug.json
"""

from absl import app
from absl import logging
from absl import flags

import json

flags.DEFINE_string('models', None, 'input files')
flags.DEFINE_string('output_file', None, 'output file')

# flags.DEFINE_string('cloze_uuid', None, 'Cloze CrowdAnki UUID')
# flags.DEFINE_string('cloze_html_front_path', None, 'Cloze template HTML path')
# flags.DEFINE_string('cloze_html_back_path', None, 'Cloze template HTML path')
# flags.DEFINE_string('cloze_css_path', None, 'Cloze CSS path')
#
# flags.DEFINE_string('permuted_cloze_uuid', None,
#                     'Permuted Cloze CrowdAnki UUID')
# flags.DEFINE_string('permuted_cloze_html_front_path', None,
#                     'Permuted Cloze template HTML path')
# flags.DEFINE_string('permuted_cloze_html_back_path', None,
#                     'Permuted Cloze template HTML path')
# flags.DEFINE_string('permuted_cloze_css_path', None, 'Permuted Cloze CSS path')
#
#
# flags.DEFINE_string('keyboard_shortcut_uuid', None,
#                     'Keyboard Shortcut CrowdAnki UUID')
# flags.DEFINE_string('keyboard_shortcut_html_shortcut_to_effect_front_path', None,
#                     'Keyboard Shortcut Shortcut->Effect front template HTML path')
# flags.DEFINE_string('keyboard_shortcut_html_shortcut_to_effect_back_path', None,
#                     'Keyboard Shortcut Shortcut->Effect back template HTML path')
# flags.DEFINE_string('keyboard_shortcut_html_effect_to_shortcut_front_path', None,
#                     'Keyboard Shortcut Effect->Shortcut front template HTML path')
# flags.DEFINE_string('keyboard_shortcut_html_effect_to_shortcut_back_path', None,
#                     'Keyboard Shortcut Effect->Shortcut back template HTML path')
# flags.DEFINE_string('keyboard_shortcut_css_path',
#                     None, 'Permuted Cloze CSS path')

#flags.DEFINE_string('output_slug_path', None, 'Output slug path')
FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def main(_):
    slug = {}
    for model in json.loads(FLAGS.models)['models']:
        logging.info("%s", model)
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
                'qfmt': read_file(template['answer_html']),
            }
        slug[uuid] = {
            'css': read_file(model['css']),
            'templates': templates
        }
    with open(FLAGS.output_file, 'w') as f:
        json.dump(slug, f)

#    slug = {}
#    if FLAGS.cloze_uuid in slug:
#        raise Exception("Duplicated UUID")
#    slug[FLAGS.cloze_uuid] = {
#        'css': read_file(FLAGS.cloze_css_path),
#        'templates': {
#            'Cloze': {
#                'qfmt': read_file(FLAGS.cloze_html_front_path),
#                'qfmt': read_file(FLAGS.cloze_html_back_path),
#            }
#        }
#    }
#    if FLAGS.keyboard_shortcut_uuid in slug:
#        raise Exception("Duplicated UUID")
#    slug[FLAGS.keyboard_shortcut_uuid] = {
#        'css': read_file(FLAGS.keyboard_shortcut_css_path),
#        'templates': {
#            'Effect to Shortcut': {
#                'qfmt':
#                read_file(
#                    FLAGS.keyboard_shortcut_html_effect_to_shortcut_front_path),
#                'qfmt':
#                read_file(
#                    FLAGS.keyboard_shortcut_html_effect_to_shortcut_back_path),
#            },
#            '': {
#                'qfmt':
#                read_file(
#                    FLAGS.keyboard_shortcut_html_shortcut_to_effect_front_path),
#                'qfmt':
#                read_file(
#                    FLAGS.keyboard_shortcut_html_shortcut_to_effect_back_path),
#            }
#        }
#    }
#    with open(FLAGS.output_slug_path, 'w') as f:
#        json.dump(slug, f)


if __name__ == '__main__':
    flags.mark_flag_as_required('output_file')
    flags.mark_flag_as_required('models')
 #   flags.mark_flag_as_required('cloze_uuid')
 #   flags.mark_flag_as_required('cloze_html_front_path')
 #   flags.mark_flag_as_required('cloze_html_back_path')
 #   flags.mark_flag_as_required('cloze_css_path')

 #   flags.mark_flag_as_required('permuted_cloze_uuid')
 #   flags.mark_flag_as_required('permuted_cloze_html_front_path')
 #   flags.mark_flag_as_required('permuted_cloze_html_back_path')
 #   flags.mark_flag_as_required('permuted_cloze_css_path')

 #   flags.mark_flag_as_required('output_slug_path')
    app.run(main)
