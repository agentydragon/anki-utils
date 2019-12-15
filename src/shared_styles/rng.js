goog.module('agentydragon.rng');

class RNG {
  constructor(seed) {
    this.m = 256;
    this.a = 11;
    this.c = 17;

    this.state = seed;
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  shuffle(a) {
    console.log("shuffling " + a.length + " elements");
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.nextInt() % (i + 1);
      console.log("Shuffle " + i + " <-> " + j);
      const x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
}

exports = {RNG};
