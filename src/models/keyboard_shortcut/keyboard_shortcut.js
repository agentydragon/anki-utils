goog.module('agentydragon.keyboardShortcut.keyboardShortcut');

/**
 * @param {string} shortcutText
 * @param {!Element} target
 */
function applyShortcuts(shortcutText, target) {
  // "Ctrl+K" --> [Ctrl][K]
  // "Ctrl+K S" --> [Ctrl][K], [S]
  let i = 0;
  for (const chord of shortcutText.split(" ")) {
    if (i != 0) {
      target.appendChild(document.createTextNode(", "));
    }
    for (const key of chord.split("+")) {
      const keySpan = document.createElement("span");
      keySpan.className = "shortcut-key";
      keySpan.innerText = key;
      target.appendChild(keySpan);
    }
    ++i;
  }
}

exports = {applyShortcuts};
