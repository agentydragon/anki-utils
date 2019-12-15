goog.module('agentydragon.keyboardShortcut.keyboardShortcutTest');
goog.setTestOnly('agentydragon.keyboardShortcut.keyboardShortcutTest');

const testSuite = goog.require('goog.testing.testSuite');
const {applyShortcuts} =
    goog.require('agentydragon.keyboardShortcut.keyboardShortcut');

class KeyboardShortcutTest {
  testApplyShortcuts() {
    const target = document.createElement("div");
    applyShortcuts("Ctrl+Shift+C A", target);
    assertEquals('<span class="shortcut-key">Ctrl</span>' +
                     '<span class="shortcut-key">Shift</span>' +
                     '<span class="shortcut-key">C</span>, ' +
                     '<span class="shortcut-key">A</span>',
                 target.innerHTML);
  }
}

testSuite(new KeyboardShortcutTest());
