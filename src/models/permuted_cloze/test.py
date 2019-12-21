from absl.testing import absltest
from src.testing import card_testcase

FRONT_RUNFILES_PATH = "anki_utils/src/models/permuted_cloze/front.expanded.html"


class PermutedClozeTest(card_testcase.CardTestCase):
  def load_front_card(self, text, log=False, heading='Heading'):
    fields = {
        'cloze:Text': text,
        'Log': 'true' if log else '',
        'Heading': heading
    }
    self.open_card_from_runfiles(
        runfiles_path=FRONT_RUNFILES_PATH, fields=fields)

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
    texts = [item.text for item in self.driver.find_elements_by_tag_name('li')]
    self.assertIsPermutation(texts, items)

  def test_front_permutation_br_divided_lines(self):
    """Tests that <br>-divided items 1..20 get permuted."""
    items = self.make_items(20)
    self.load_front_card(text='<br>'.join(items))
    actual_text = self.driver.find_element_by_id('agentydragon-content').text
    self.assertIsPermutation(actual_text.strip().split('\n'), items)

  def test_front_permutation_tbody_rows(self):
    """Tests that permuting rows of a table body."""
    items = self.make_items(20)
    html = ('<table><thead><tr><th>Header</tr></thead><tbody>' +
            ''.join(map(lambda item: '<tr><td>' + item + '</td></tr>', items)) +
            '</tbody></table>')
    self.load_front_card(text=html)
    actual_text = self.driver.find_element_by_id('agentydragon-content').text
    actual_lines = actual_text.strip().split('\n')
    # "Header" should remain the first line. The rest should be permuted.
    self.assertEqual(actual_lines[0], "Header")
    self.assertIsPermutation(actual_lines[1:], items)

  def test_log(self):
    """Tests that Log set to 'true' enables logging."""
    items = self.make_items(2)
    self.load_front_card(text=self.make_list(items), log=True)
    self.assertIn('shuffling', self.get_log())

  def test_report_error_on_no_container(self):
    """Tests that if there is no container to permute, an error is reported."""
    self.load_front_card(text='Hello World!')
    self.assertIn('No permuted container', self.get_log())


if __name__ == "__main__":
  absltest.main()
