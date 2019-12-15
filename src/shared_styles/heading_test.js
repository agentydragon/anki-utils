goog.module('agentydragon.headingTest');
goog.setTestOnly('agentydragon.headingTest');

const testSuite = goog.require('goog.testing.testSuite');
const {compareTags, expandTags, getHeadingFromTags, tagIsUnderTag} =
    goog.require('agentydragon.heading');

class HeadingTest {
  testExpandTags() {
    assertSameElements(
        expandTags([ "foo::bar::baz", "hello::world" ]),
        [ "foo", "foo::bar", "foo::bar::baz", "hello", "hello::world" ]);
  }

  testGetHeadingFromTags() {
    assertEquals(getHeadingFromTags("foo::bar::foobar"), "Foobar");
    assertEquals(getHeadingFromTags("todo::format source::books"), null);
    // Libraries should be preferred to languages.
    assertEquals("Aalib",
                 getHeadingFromTags("cs::languages::cpp cs::libraries::aalib"));
    assertEquals("Zzlib",
                 getHeadingFromTags("cs::languages::cpp cs::libraries::zzlib"));
    // Ties should be broken alphabetically.
    assertEquals("Alpha", getHeadingFromTags("bravo alpha charlie"));
  }

  testTagIsUnderTag() {
    assertTrue(tagIsUnderTag("cs::libraries::aalib", "cs::libraries"));
  }

  testCompareTags() {
    assertEquals(-1, compareTags("cs::libraries::aalib", "cs::languages::cpp"));
    assertEquals(-1, compareTags("cs::libraries::zzlib", "cs::languages::cpp"));
  }
}

testSuite(new HeadingTest());
