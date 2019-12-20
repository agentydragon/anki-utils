goog.module('agentydragon.keyboardShortcut.main');

const {Logger} = goog.require('agentydragon.logging');
const {applyShortcuts} =
    goog.require('agentydragon.keyboardShortcut.keyboardShortcut');
const {ensureHeading} = goog.require('agentydragon.heading');
const {obtainNote} = goog.require('agentydragon.note');

const note = obtainNote();
const logger = new Logger(note);
logger.installToConsole();
ensureHeading(logger, note);

const shortcut = document.getElementById("shortcut");
const shortcutCode = document.getElementById("shortcut-code");
if (shortcut && shortcutCode) {
  applyShortcuts(shortcutCode.innerText, shortcut);
} else if (shortcut && !shortcutCode) {
  logger.error("got a id=shortcut but no id=shortcut-code");
} else {
  // Assuming we are not on the card that has the shortcut on it.
}
