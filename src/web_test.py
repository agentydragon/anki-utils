import time
import unittest
from testing.web import webtest


class BrowserTest(unittest.TestCase):
  def setUp(self):
    self.driver = webtest.new_webdriver_session()

  def tearDown(self):
    try:
      self.driver.quit()
    finally:
      self.driver = None

  def testGoogleSearch(self):
    # Optional argument, if not specified will search path.
    self.driver.get('http://www.google.com/')
    time.sleep(5)  # Let the user actually see something!
    search_box = self.driver.find_element_by_name('q')
    search_box.send_keys('ChromeDriver')
    search_box.submit()
    time.sleep(5)  # Let the user actually see something!
    self.assertEqual(self.driver.title, "ChromeDriver - Google-Suche")

    # text_area = driver.find_element_by_id('textarea')
    # text_area.send_keys("This text is send using Python code.")
    # for a in driver.find_elements_by_xpath('.//a'):
    #  print(a.get_attribute('href'))


if __name__ == "__main__":
  unittest.main()
