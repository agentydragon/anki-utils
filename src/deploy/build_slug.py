"""
blaze build //src/deploy:slug.binarypb
"""

from absl import app
from absl import logging
from absl import flags

import json

from src.deploy import slug_pb2

flags.DEFINE_string('models', None, 'input files')
flags.DEFINE_string('output_binary_proto', None, 'output file')
flags.DEFINE_string('output_textproto', None, 'output file')

FLAGS = flags.FLAGS


def read_file(path):
    with open(path) as f:
        return f.read()


def card_from_json(json_card) -> slug_pb2.Card:
    return slug_pb2.Card(
        question_html_template=read_file(json_card['question_html']),
        answer_html_template=read_file(json_card['answer_html']),
        human_name=json_card['human_name'],
    )


def model_from_json(json_model) -> slug_pb2.Model:
    uuid = json_model['crowdanki_uuid']
    cards = []
    for template in json_model['templates']:
        human_name = template['human_name']
        cards.append(card_from_json(template))
    if len(set(map(lambda card: card.human_name, cards))) != len(cards):
        raise Exception("duplicated human_names in UUID " + uuid)
    return slug_pb2.Model(
        crowdanki_uuid=uuid,
        css=read_file(json_model['css']),
        card=cards
    )


def main(_):
    models = []
    for model in json.loads(FLAGS.models)['models']:
        models.append(model_from_json(model))
    if len(set(map(lambda model: model.crowdanki_uuid, models))) != len(models):
        raise Exception("duplicated UUIDs")
    slug = slug_pb2.Slug(model=models)
    if FLAGS.output_binary_proto:
        with open(FLAGS.output_binary_proto, 'wb') as f:
            f.write(slug.SerializeToString())
    if FLAGS.output_textproto:
        with open(FLAGS.output_textproto, 'w') as f:
            f.write(str(slug))


if __name__ == '__main__':
    flags.mark_flag_as_required('models')
    app.run(main)
