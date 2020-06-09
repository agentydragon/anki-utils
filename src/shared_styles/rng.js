goog.module('agentydragon.rng');

const {Logger} = goog.require('agentydragon.logging');
const {Note} = goog.require('agentydragon.note');

class RNG {
  /**
   * @param {number} seed
   * @param {!Logger} logger
   */
  constructor(seed, logger) {
    this.logger = logger;

    this.m = 256;
    this.a = 11;
    this.c = 17;

    this.state = seed;
  }

  /**
   * @return {number}
   */
  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  shuffle(a) {
    this.logger.log("shuffling " + a.length + " elements");
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.nextInt() % (i + 1);
      this.logger.log("Shuffle " + i + " <-> " + j);
      const x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
}

/**
 * @param {number} hash
 * @param {number} x
 * @return {number}
 */
function addHash(hash, x) {
  hash = (hash * 17 + x) % 256;
  return hash;
}

/**
 * @param {number} hash
 * @param {?string} x
 * @return {number}
 */
function addHashString(hash, x) {
  if (!x) {
    return hash;
  }
  for (let i = 0; i < x.length; i++) {
    hash = addHash(hash, x.charCodeAt(i));
  }
  return hash;
}

/**
 * @param {!Note} note
 * @return {number}
 */
function computeRngSeed(note) {
  const today = new Date();
  let hash = 0;
  // YYYYMMDD number as part of the seed.
  hash = addHash(hash, today.getFullYear());
  hash = addHash(hash, today.getMonth());
  hash = addHash(hash, today.getDay());
  // Add more fields, including specifically dedicated extra seed.
  for (const field of [note.heading, note.deck, note.tags, note.seed,
                       note.noteType, note.card]) {
    hash = addHashString(hash, field);
  }
  // It would be nice if we could include something about the content of the
  // card into the hash automatically, so that the order of the shuffle on
  // different notes would not necessarily match on a given day.
  // However, anything that's in the cloze field might get Clozed out.
  // ... But - maybe we could get the unclozed content?
  return hash;
}

exports = {
  RNG,
  computeRngSeed
};
