import time
import unittest
from absl.testing import absltest
from absl.testing import parameterized
from testing.web import webtest
from selenium.webdriver.support.ui import WebDriverWait
from rules_python.python.runfiles import runfiles

FRONT_RUNFILES_PATH = "anki_utils/src/models/basic_and_reversed/front_to_back/front.expanded.html"


class HeadingTest(parameterized.TestCase):
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

  def load_front_card(self, fields):
    html = self.load_front_html()
    for key, value in fields.items():
        html = html.replace('{{' + key + '}}', value)
    self.open_html(html)
    self.wait_until_loaded()

  def get_heading(self):
    return self.driver.find_element_by_tag_name('h1').text

  @parameterized.parameters(
      ({'Heading': 'Greeting'}, 'Greeting'),
      ({'Tags': 'geography'}, 'Geography'),
      ({'Tags': 'programming::python'}, 'Python'),
      ({'Tags': 'todo::problems source::books', 'Deck': 'My Deck'}, 'My Deck'),
      ({'Tags': 'javascript'}, 'JavaScript'),
  )
  def test_heading(self, fields, expected_heading):
    self.load_front_card(fields)
    self.assertEqual(self.get_heading(), expected_heading)


if __name__ == "__main__":
  absltest.main()
