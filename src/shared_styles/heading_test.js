goog.module('agentydragon.headingTest');
goog.setTestOnly('agentydragon.headingTest');

const testSuite = goog.require('goog.testing.testSuite');
const {expandTags, getHeadingFromTags} = goog.require('agentydragon.heading');

class HeadingTest {
  testExpandTags() {
    assertSameElements(
        expandTags([ "foo::bar::baz", "hello::world" ]),
        [ "foo", "foo::bar", "foo::bar::baz", "hello", "hello::world" ]);
  }

  testGetHeadingFromTags() {
    assertEquals(getHeadingFromTags("foo::bar::foobar"), "Foobar");
    assertEquals(getHeadingFromTags("todo::format source::books"), null);
  }
}

testSuite(new HeadingTest());
