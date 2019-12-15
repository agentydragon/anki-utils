goog.module('agentydragon.keyboardShortcut.main');

const {Logger} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');
const {applyShortcuts} =
    goog.require('agentydragon.keyboardShortcut.keyboardShortcut');

const logger = new Logger();
logger.installToConsole();
const note = obtainNote();
ensureHeading(logger, note);

const shortcut = document.getElementById("shortcut");
if (!shortcut) {
  logger.error("no #shortcut");
} else {
  applyShortcuts(document.getElementById("shortcut-code").innerText, shortcut);
}
