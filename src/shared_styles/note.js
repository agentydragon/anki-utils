goog.module('agentydragon.note');

class Note {
  /**
   * @param {?string} heading
   * @param {?string} deck
   * @param {?string} tags
   */
  constructor(heading, deck, tags) {
    this._heading = heading;
    this._deck = deck;
    this._tags = tags;
  }

  get heading() { return this._heading; }
  get tags() { return this._tags; }
  get deck() { return this._deck; }
}

/**
 * @param {string} id
 * @return {?string}
 */
function obtainFieldFromId(id) {
  const content = document.getElementById(id).innerHTML;
  // If the model does not have the field, return null.
  if (content.indexOf("unknown field ") !== -1) {
    return null;
  }
  return content;
}

function obtainNote() {
  return new Note(obtainFieldFromId("agentydragon-heading"),
                  obtainFieldFromId("agentydragon-deck"),
                  obtainFieldFromId("agentydragon-tags"));
}

exports = {
  Note,
  obtainNote
};
