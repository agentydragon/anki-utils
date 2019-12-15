from absl.testing import absltest
from src.testing import card_testcase

FRONT_RUNFILES_PATH = "anki_utils/src/models/permuted_cloze/front.expanded.html"


class PermutedClozeTest(card_testcase.CardTestCase):
  def load_front_card(self, text, log=False):
    fields = {
        'cloze:Text': text,
        'Log': 'true' if log else ''
    }
    self.open_card_from_runfiles(
        runfiles_path=FRONT_RUNFILES_PATH, fields=fields)

  def make_items(self, n=10):
    return ["item {}".format(i) for i in range(1, n + 1)]

  def make_list(self, items):
    return '<ul>' + '\n'.join(('<li>' + item for item in items)) + '</ul>'

  def test_front_permutation(self):
    items = self.make_items(10)
    self.load_front_card(text=self.make_list(items))
    texts = [item.text for item in self.driver.find_elements_by_tag_name('li')]
    self.assertEqual(set(texts), set(items), "item set not preserved")
    self.assertNotEqual(texts, items, "item ordering not permuted")

  def test_log(self):
    items = self.make_items(2)
    self.load_front_card(text=self.make_list(items), log=True)
    self.assertIn('shuffling', self.get_log())

  def test_report_error_on_no_container(self):
    """Tests that if there is no container to permute, an error is reported."""
    self.load_front_card(text='Hello World!')
    self.assertIn('No permuted container', self.get_log())


if __name__ == "__main__":
  absltest.main()
