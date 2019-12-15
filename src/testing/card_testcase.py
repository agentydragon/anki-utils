from absl.testing import absltest
from testing.web import webtest
from selenium.webdriver.support.ui import WebDriverWait
from rules_python.python.runfiles import runfiles

import sys
sys.path.append('/usr/share/anki')
from anki import template as anki_template

from src.testing import card_testcase


class CardTestCase(absltest.TestCase):
  def setUp(self):
    self.driver = webtest.new_webdriver_session()
    self.runfiles = runfiles.Create()

  def tearDown(self):
    try:
      self.driver.quit()
    finally:
      self.driver = None

  def wait_until_loaded(self):
    def check_done(driver):
      state = driver.execute_script('return document.readyState')
      return state == 'complete'

    WebDriverWait(self.driver, 10).until(check_done)

  def load_from_runfiles(self, runfiles_path):
    with open(self.runfiles.Rlocation(runfiles_path)) as f:
        return f.read()

  def open_card_from_runfiles(self, runfiles_path, fields):
    template = self.load_from_runfiles(runfiles_path)
    html = anki_template.render(template=template, context=fields)
    self.open_html(html)
    self.wait_until_loaded()

  def open_html(self, html):
    tempfile = self.create_tempfile('card.html', content=html)
    self.driver.get("file://{}".format(tempfile.full_path))

  def get_log(self):
    return self.driver.find_element_by_id('agentydragon-log').text

  def get_heading(self):
    return self.driver.find_element_by_tag_name('h1').text
