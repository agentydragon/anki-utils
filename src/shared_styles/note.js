goog.module('agentydragon.note');

class Note {
  /**
   * @param {?string} heading
   * @param {?string} deck
   * @param {?string} tags
   * @param {?string} seed
   * @param {?string} logEnabled
   * @param {?string} noteType
   * @param {?string} card
   */
  constructor(heading, deck, tags, seed, logEnabled, noteType, card) {
    this.heading_ = heading;
    this.deck_ = deck;
    this.tags_ = tags;
    this.seed_ = seed;
    this.logEnabled_ = logEnabled;
    this.noteType_ = noteType;
    this.card_ = card;
  }

  /** @return {?string} */
  get heading() { return this.heading_; }
  /** @return {?string} */
  get tags() { return this.tags_; }
  /** @return {?string} */
  get deck() { return this.deck_; }
  /** @return {?string} */
  get seed() { return this.seed_; }
  /** @return {?string} */
  get logEnabled() { return this.logEnabled_; }
  /** @return {?string} */
  get noteType() { return this.noteType_; }
  /** @return {?string} */
  get card() { return this.card_; }
}

/**
 * @param {string} id
 * @return {?string}
 */
function obtainFieldFromId(id) {
  const field = document.getElementById(id);
  if (!field) {
    alert("error, missing " + id);
    return null;
  }
  const content = field.innerHTML;
  // If the model does not have the field, return null.
  if (content.indexOf("unknown field ") !== -1) {
    return null;
  }
  return content;
}

/**
 * @return {!Note}
 */
function obtainNote() {
  return new Note(obtainFieldFromId("agentydragon-heading"),
                  obtainFieldFromId("agentydragon-deck"),
                  obtainFieldFromId("agentydragon-tags"),
                  obtainFieldFromId("agentydragon-seed"),
                  obtainFieldFromId("agentydragon-log-enabled"),
                  obtainFieldFromId("agentydragon-type"),
                  obtainFieldFromId("agentydragon-card-type"));
}

exports = {
  Note,
  obtainNote
};
