goog.module('agentydragon.tagsTest');
goog.setTestOnly('agentydragon.tagsTest');

const testSuite = goog.require('goog.testing.testSuite');
const {expandTags, tagIsUnderTag} = goog.require('agentydragon.tags');

class TagsTest {
  testExpandTags() {
    assertSameElements(
        expandTags([ "foo::bar::baz", "hello::world" ]),
        [ "foo", "foo::bar", "foo::bar::baz", "hello", "hello::world" ]);
  }

  testTagIsUnderTag() {
    assertTrue(tagIsUnderTag("cs::libraries::aalib", "cs::libraries"));
  }
}

testSuite(new TagsTest());
