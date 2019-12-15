goog.module('agentydragon.note');

class Note {
  /**
   * @param {?string} heading
   * @param {?string} deck
   * @param {?string} tags
   * @param {?string} seed
   * @param {?string} logEnabled
   */
  constructor(heading, deck, tags, seed, logEnabled) {
    this._heading = heading;
    this._deck = deck;
    this._tags = tags;
    this._seed = seed;
    this._logEnabled = logEnabled;
  }

  get heading() { return this._heading; }
  get tags() { return this._tags; }
  get deck() { return this._deck; }
  get seed() { return this._seed; }
  get logEnabled() { return this._logEnabled; }
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
                  obtainFieldFromId("agentydragon-tags"),
                  obtainFieldFromId("agentydragon-seed"),
                  obtainFieldFromId("agentydragon-log-enabled"));
}

exports = {
  Note,
  obtainNote
};
