from absl.testing import absltest
from absl import logging
import json
from src.testing import card_testcase
from src.deploy import deploy_lib
import tempfile
from anki import template as anki_template
from anki import collection as anki_collection

import tracemalloc

tracemalloc.start()


class PermutedClozeTest(card_testcase.CardTestCase):
  def load_front_card(self, text, log=False, heading='Heading'):
    slug = {
        "//src/models/permuted_cloze:permuted_cloze":
            json.loads(self.load_from_runfiles(
                "anki_utils/src/models/permuted_cloze/permuted_cloze_slug.json"))
    }
    config = {
        "models": [{
            "model": "//src/models/permuted_cloze:permuted_cloze",
            "mapping": {"name": "Permuted Cloze (test)"}
        }]
    }

    collection_file = self.create_tempfile("collection.anki2")
    collection = anki_collection.Collection(collection_file.full_path)

    deploy_lib.apply_slug(collection.models, config, slug, add_if_missing=True)
    collection.models.setCurrent(
        collection.models.byName("Permuted Cloze (test)"))

    note = collection.newNote()
    note['Text'] = text
    note['Log'] = 'true' if log else ''
    note['Heading'] = heading
    collection.addNote(note)

    html = card_testcase.MATHJAX_STUB + note.cards()[0].a()
    logging.info("HTML: %s", html[:100])

    self.open_html(html)
    self.wait_until_loaded()
    logging.info("wait_until_loaded finished")
    logging.info("wait_until_loaded finished")
    logging.info("wait_until_loaded finished")
    logging.info("wait_until_loaded finished")

  def make_items(self, n=10):
    return ["item {}".format(i) for i in range(1, n + 1)]

  def make_list(self, items):
    return '<ul>' + '\n'.join(('<li>' + item for item in items)) + '</ul>'

  def assertIsPermutation(self, actual, expected):
    self.assertEqual(set(actual), set(expected), "item set not preserved")
    self.assertNotEqual(actual, expected, "item ordering not permuted")

  def test_front_permutation_ul_items(self):
    """Tests that <ul> items 1..20 in <li> tags get permuted."""
    items = self.make_items(20)
    self.load_front_card(text=self.make_list(items))
    actual_text = self.driver.find_element_by_id('agentydragon-content').text
    logging.info("actual text: %s", actual_text)
    logging.info("actual text: %s", actual_text)
    logging.info("actual text: %s", actual_text)
    logging.info("actual text: %s", actual_text)
    logging.info("actual text: %s", actual_text)
    texts = [item.text for item in self.driver.find_elements_by_tag_name('li')]
    logging.info("actual texts: %s", texts)
    self.assertIsPermutation(texts, items)

  #def test_front_permutation_br_divided_lines(self):
  #  """Tests that <br>-divided items 1..20 get permuted."""
  #  items = self.make_items(20)
  #  self.load_front_card(text='<br>'.join(items))
  #  actual_text = self.driver.find_element_by_id('agentydragon-content').text
  #  logging.info("actual text: %s", actual_text)
  #  self.assertIsPermutation(actual_text.strip().split('\n'), items)

  #def test_front_permutation_tbody_rows(self):
  #  """Tests that permuting rows of a table body."""
  #  items = self.make_items(20)
  #  html = ('<table><thead><tr><th>Header</tr></thead><tbody>' +
  #          ''.join(map(lambda item: '<tr><td>' + item + '</td></tr>', items)) +
  #          '</tbody></table>')
  #  self.load_front_card(text=html)
  #  actual_text = self.driver.find_element_by_id('agentydragon-content').text
  #  actual_lines = actual_text.strip().split('\n')
  #  # "Header" should remain the first line. The rest should be permuted.
  #  self.assertEqual(actual_lines[0], "Header")
  #  self.assertIsPermutation(actual_lines[1:], items)

  #def test_log(self):
  #  """Tests that Log set to 'true' enables logging."""
  #  items = self.make_items(2)
  #  self.load_front_card(text=self.make_list(items), log=True)
  #  self.assertIn('shuffling', self.get_log())

  #def test_report_error_on_no_container(self):
  #  """Tests that if there is no container to permute, an error is reported."""
  #  self.load_front_card(text='Hello World!')
  #  self.assertIn('No permuted container', self.get_log())

  # TODO(prvak): Test that front and back permutation for the same card is
  # the same.


if __name__ == "__main__":
  absltest.main()
