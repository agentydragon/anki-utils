goog.module('agentydragon.headingTest');
goog.setTestOnly('agentydragon.headingTest');

const testSuite = goog.require('goog.testing.testSuite');
const {Note} = goog.require('agentydragon.note');
const {compareTags, expandTags, getHeadingFromTags, tagIsUnderTag} =
    goog.require('agentydragon.heading');

class HeadingTest {
  testExpandTags() {
    assertSameElements(
        expandTags([ "foo::bar::baz", "hello::world" ]),
        [ "foo", "foo::bar", "foo::bar::baz", "hello", "hello::world" ]);
  }

  testGetHeadingFromTags() {
    const TEST_CASES = /** @type {!Array<!Array<string>>} */ ([
      [ "foo::bar::foobar", "Foobar" ], [ "todo::format source::books", null ],
      // Libraries should be preferred to languages.
      [ "cs::languages::cpp cs::libraries::aalib", "Aalib" ],
      [ "cs::languages::cpp cs::libraries::zzlib", "Zzlib" ],
      // Ties should be broken alphabetically.
      [ "bravo alpha charlie", "Alpha" ],
      // Suffix special cases.
      [ "cs::languages::go::stdlib::format", "Go - <code>fmt</code> formats" ]
    ]);
    for (let [tags, expectedHeading] of TEST_CASES) {
      assertEquals(
          "wrong heading for tags " + tags,
          getHeadingFromTags(new Note("", "", tags, "", "", "", "")),
          expectedHeading,
      );
    }
  }

  testGetHeadingForFlagNoSpoilers() {
    const note = new Note("", "", "geo::continent::europe", "", "", "", "Flag");
    // Test that card for flag does not spoil that it's a country in
    // Europe.
    assertEquals(getHeadingFromTags(note), "Geo");
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
