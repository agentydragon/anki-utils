goog.module('agentydragon.keyboardShortcut');

const {GLOBAL_LOGGER} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');

GLOBAL_LOGGER.installToConsole();
const note = obtainNote();
ensureHeading(GLOBAL_LOGGER, note);

const shortcut = document.getElementById("shortcut-code").innerText;

// "Ctrl+K" --> [Ctrl][K]
// "Ctrl+K S" --> [Ctrl][K], [S]

var i = 0;
for (const chord of shortcut.split(" ")) {
  const elem = document.getElementById("shortcut");
  if (i != 0) {
    elem.appendChild(document.createTextNode(", "));
  }
  for (const key of chord.split("+")) {
    const keySpan = document.createElement("span");
    keySpan.className = "shortcut-key";
    keySpan.innerText = key;
    elem.appendChild(keySpan);
  }
  ++i;
}
