goog.module('agentydragon.rng');

const {Logger} = goog.require('agentydragon.logging');

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

exports = {RNG};
