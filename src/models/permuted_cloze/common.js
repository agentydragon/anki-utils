RaiPermutedCloze = {};

RaiPermutedCloze.clozeContainer =
    document.getElementById("agentydragon-permuted-cloze-content");

function RNG(seed) {
  // LCG using GCC's constants
  this.m = 256;
  this.a = 11;
  this.c = 17;

  this.state = seed;
};

RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
};

RNG.prototype.shuffle = function(a) {
  console.log("shuffling " + a.length + " elements");
  for (let i = a.length - 1; i > 0; i--) {
    const j = this.nextInt() % (i + 1);
    console.log("Shuffle " + i + " <-> " + j);
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

function addHash(hash, x) {
  hash = (hash * 17 + x) % 256;
  return hash;
};

function detachChildren(element) {
  var children = [];
  while (element.firstChild) {
    children.push(element.removeChild(element.firstChild));
  }
  return children;
};

function permuteChildren(rng, element) {
  var children = detachChildren(element);
  rng.shuffle(children);
  element.append(...children);
};

function permuteJustDivAndLines(rng) {
  const content = RaiPermutedCloze.clozeContainer;
  for (const child of content.children) {
    if (typeof child == 'string' || child instanceof CharacterData) {
      continue;
    }
    console.log(child, typeof child, child.className, child.tagName);
    const tag = child.tagName.toLowerCase();
    if (tag == 'div' || tag == 'br') {
      continue;
    }
    if ((tag == 'span') && (child.className == 'cloze')) {
      // Cloze in text.
      continue;
    }
    console.log("child is <" + tag + "> -> not div-and-lines");
    return false;
  }
  // OK. Now make the children.
  var children = detachChildren(content);
  var currentRun = [];
  var wrappedChildren = [];
  const flushRun = function() {
    if (currentRun.length == 0) {
      return;
    }
    const nc = document.createElement("div");
    nc.append(...currentRun);
    wrappedChildren.push(nc);
    currentRun = [];
  };
  for (const child of children) {
    if (child instanceof CharacterData) {
      console.log("child: string, of: " + child.data);
      currentRun.push(child);
      continue;
    }
    if (typeof child == 'string') {
      console.log("child: string, of: " + child);
      currentRun.push(child);
      continue;
    }
    console.log(child, typeof child, child.className, child.tagName);
    const tag = child.tagName.toLowerCase();
    if (tag == 'br') {
      flushRun();
      continue;
    }
    if (tag == 'div') {
      flushRun();
      wrappedChildren.push(child);
      continue;
    } else if (tag == 'span') {
      currentRun.push(child);
    } else {
      Rai.reportError('unexpected child kind');
    }
  }
  flushRun();

  console.log("wrapped children: " + wrappedChildren.length);
  if (wrappedChildren.length == 0) {
    Rai.reportError("no wrapped children");
    return;
  }
  if (wrappedChildren.length == 1) {
    Rai.reportError("just 1 wrapped child!");
    return;
  }
  rng.shuffle(wrappedChildren);
  content.append(...wrappedChildren);
  return true;
};

function permuteElementChildren(rng) {
  const containersSelector = "tbody, ul";
  // Permute all children according to the RNG.
  const permutedContainer =
      RaiPermutedCloze.clozeContainer.querySelector(containersSelector);
  if (!permutedContainer) {
    console.log("no " + containersSelector + " in Cloze content container");
    return false;
  }
  permuteChildren(rng, permutedContainer);
  return true;
};

function computeRngSeed() {
  const today = new Date();
  var hash = 0;
  // YYYYMMDD number as part of the seed.
  hash = addHash(hash, today.getFullYear());
  hash = addHash(hash, today.getMonth());
  hash = addHash(hash, today.getDay());
  // Add extra seed if given.
  const extraSeed = "{{Seed}}";
  for (var i = 0; i < extraSeed.length; i++) {
    hash = addHash(hash, extraSeed.charCodeAt(i));
  }
  // It would be nice if we could include something about the content of the
  // card into the hash automatically, so that the order of the shuffle on
  // different notes would not necessarily match on a given day.
  // However, anything that's in the cloze field might get Clozed out.
  // ... But - maybe we could ge the unclozed content?
  return hash;
};

function shuffleCloze() {
  const seed = computeRngSeed();
  const rng = new RNG(seed);
  console.log("RNG seed: " + seed);

  if (permuteElementChildren(rng)) {
    console.log("Success with permuted container.");
    return;
  }
  if (permuteJustDivAndLines(rng)) {
    console.log("Success with permuted div-and-lines.");
    return;
  }
  Rai.reportError(
      "No permuted container (tbody, ul, or <br>-separated lines) found.");
};

shuffleCloze();
RaiPermutedCloze.clozeContainer.className = "js-finished";
