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
   * @param {?string} textUnclozed Text field with clozes replaced by their
   *     exposed content. Used for seeding the PRNG based on card content for
   *     Permuted Cloze.
   */
  constructor(heading, deck, tags, seed, logEnabled, noteType, card,
              textUnclozed) {
    this.heading_ = heading;
    this.deck_ = deck;
    this.tags_ = tags;
    this.seed_ = seed;
    this.logEnabled_ = logEnabled;
    this.noteType_ = noteType;
    this.card_ = card;
    this.textUnclozed_ = textUnclozed;
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
  /** @return {?string} */
  get textUnclozed() { return this.textUnclozed_; }
}

/**
 * @return {!Note}
 */
function obtainNote() {
  const meta = document.getElementById("agentydragon-fields");
  /**
   * @param {string} field
   * @return {?string}
   */
  const find = field => {
    const fieldContainer = meta.querySelector('[data-field="' + field + '"]');
    if (!fieldContainer) {
      // TODO(prvak): Alert; this implies a problem.
      return null;
    }
    const value = fieldContainer.innerHTML;
    // If the model does not have the field, return null.
    if (value.indexOf("unknown field ") !== -1) {
      return null;
    }
    return value;
  };
  return new Note(find("Heading"), find("Deck"), find("Tags"), find("Seed"),
                  find("Log"), find("Type"), find("Card"),
                  find("textUnclozed"));
}

exports = {
  Note,
  obtainNote
};
