goog.module('agentydragon.headingTest');
goog.setTestOnly('agentydragon.headingTest');

// const {getLastDeckComponent} = goog.require('agentydragon.heading');
const testSuite = goog.require('goog.testing.testSuite');

class HeadingTest {
  testGetLastDeckComponent() { assertEquals(123, 456); }
}

testSuite(new HeadingTest());
