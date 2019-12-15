import time
import unittest
from absl.testing import absltest
from testing.web import webtest
from selenium.webdriver.support.ui import WebDriverWait
from rules_python.python.runfiles import runfiles

FRONT_RUNFILES_PATH = "anki_utils/src/models/permuted_cloze/front.expanded.html"


class PermutedClozeTest(unittest.TestCase):
  def setUp(self):
    self.driver = webtest.new_webdriver_session()
    self.runfiles = runfiles.Create()

  def tearDown(self):
    try:
      self.driver.quit()
    finally:
      self.driver = None

  def load_front_html(self):
    with open(self.runfiles.Rlocation(FRONT_RUNFILES_PATH)) as f:
        return f.read()

  def wait_until_loaded(self):
    def check_done(driver):
      state = driver.execute_script('return document.readyState')
      return state == 'complete'

    WebDriverWait(self.driver, 10).until(check_done)

  def open_html(self, html):
    html = '<div id="card">' + html + '</div>'
    filename = '/tmp/x.html'
    with open(filename, 'w') as f:
      f.write(html)
    self.driver.get("file://{}".format(filename))

  def get_log(self):
    return self.driver.find_element_by_id('agentydragon-log').text

  def load_front_card(self, text, log=False):
    html = self.load_front_html().replace('{{cloze:Text}}', text)
    if log:
      html = html.replace('{{Log}}', 'true')
    self.open_html(html)
    self.wait_until_loaded()

  def make_items(self, n=10):
    return ["item {}".format(i) for i in range(1, n + 1)]

  def make_list(self, items):
    return '<ul>' + '\n'.join(('<li>' + item for item in items)) + '</ul>'

  def test_front_permutation(self):
    # TODO(prvak): set {{Heading}}, {{Deck}}, {{Tags}}
    items = self.make_items(10)
    self.load_front_card(text=self.make_list(items))
    texts = [item.text for item in self.driver.find_elements_by_tag_name('li')]
    self.assertEqual(set(texts), set(items), "item set not preserved")
    self.assertNotEqual(texts, items, "item ordering not permuted")

  def test_log(self):
    items = self.make_items(2)
    self.load_front_card(text=self.make_list(items), log=True)
    self.assertIn('shuffling', self.get_log())


if __name__ == "__main__":
  unittest.main()
