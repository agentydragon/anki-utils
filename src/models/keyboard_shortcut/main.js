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
if (shortcut) {
  applyShortcuts(document.getElementById("shortcut-code").innerText, shortcut);
} else {
  // Assuming we are not on the card that has the shortcut on it.
}
