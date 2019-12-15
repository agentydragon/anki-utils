from absl.testing import absltest
from absl.testing import parameterized
from src.testing import card_testcase

FRONT_RUNFILES_PATH = "anki_utils/src/models/basic_and_reversed/front_to_back/front.expanded.html"


class HeadingTest(card_testcase.CardTestCase, parameterized.TestCase):
  @parameterized.parameters(
      ({'Heading': 'Greeting'}, 'Greeting'),
      ({'Heading': 'Hello <b>World</b>!'}, 'Hello <b>World</b>!'),
      ({'Tags': 'geography'}, 'Geography'),
      ({'Tags': 'programming::python'}, 'Python'),
      ({'Tags': 'todo::problems source::books', 'Deck': 'My Deck'}, 'My Deck'),
      ({'Tags': 'javascript'}, 'JavaScript'),
      ({'Tags': 'persons::_my_network'}, 'Persons'),
      ({'Front': '<h1>Foo bar</h1>', 'Tags': 'persons'}, 'Foo bar'),
  )
  def test_heading(self, fields, expected_heading):
    self.open_card_from_runfiles(runfiles_path=FRONT_RUNFILES_PATH,
                                 fields=fields)
    self.assertEqual(self.get_heading_html(), expected_heading)


if __name__ == "__main__":
  absltest.main()
