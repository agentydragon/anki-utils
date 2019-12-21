goog.module('agentydragon.headingTest');
goog.setTestOnly('agentydragon.headingTest');

const testSuite = goog.require('goog.testing.testSuite');
const {Note} = goog.require('agentydragon.note');
const {compareTags, getHeadingFromTags} = goog.require('agentydragon.heading');

/**
 * @param {string} tags
 * @param {string} cardType
 * @return {!Note}
 */
function noteWithTagsAndCardType(tags, cardType) {
  return new Note(
      /*heading=*/ "",
      /*deck=*/ "",
      /*tags=*/ tags,
      /*seed=*/ "",
      /*logEnabled=*/ "",
      /*noteType=*/ "",
      /*card=*/ cardType);
}

/**
 * @param {string} tags
 * @return {!Note}
 */
function noteWithTags(tags) { return noteWithTagsAndCardType(tags, ""); }

class HeadingTest {
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
          getHeadingFromTags(noteWithTags(tags)),
          expectedHeading,
      );
    }
  }

  testGetHeadingForFlagNoSpoilers() {
    const note = noteWithTagsAndCardType("geo::continent::europe", "Flag");
    // Test that card for flag does not spoil that it's a country in
    // Europe.
    assertEquals(getHeadingFromTags(note), "Geo");
  }

  testCompareTags() {
    assertEquals(-1, compareTags("cs::libraries::aalib", "cs::languages::cpp"));
    assertEquals(-1, compareTags("cs::libraries::zzlib", "cs::languages::cpp"));
  }
}

testSuite(new HeadingTest());
