RaiPermutedCloze = {};

RaiPermutedCloze.logContainer =
    document.getElementById("agentydragon-permuted-cloze-log");

RaiPermutedCloze.clozeContainer =
    document.getElementById("agentydragon-permuted-cloze-content");

function doLog(message, level) {
  const messageElement = document.createElement("div");
  messageElement.className = level;
  messageElement.innerText = message;
  RaiPermutedCloze.logContainer.appendChild(messageElement);
};

function reportError(message) { doLog(message, "error"); };

window.addEventListener('error', handleError);

function log(message) {
  if ("{{Log}}" == "true") {
    doLog(message, "info");
  }
};

function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed;
};

RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
};

RNG.prototype.shuffle = function(a) {
  log("shuffling " + a.length + " elements");
  for (var i = a.length - 1; i > 0; i--) {
    const j = this.nextInt() % (i + 1);
    log("Shuffle " + i + " <-> " + j);
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

function addHash(hash, x) {
  hash = ((hash << 5) - hash) + x;
  hash |= 0; // Convert to 32bit integer
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
  for (const row of children) {
    element.appendChild(row);
  }
};

function permuteJustDivAndLines(rng) {
  const content = RaiPermutedCloze.clozeContainer;
  for (const child of content.children) {
    if (typeof child == 'string' || child instanceof CharacterData) {
      continue;
    }
    log(child);
    log(typeof child);
    log(child.className);
    log(child.tagName);
    const tag = child.tagName.toLowerCase();
    if (tag == 'div' || tag == 'br') {
      continue;
    }
    if ((tag == 'span') && (child.className == 'cloze')) {
      // Cloze in text.
      continue;
    }
    log("child is <" + tag + "> -> not div-and-lines");
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
    for (const x of currentRun) {
      nc.appendChild(x);
    }
    wrappedChildren.push(nc);
    currentRun = [];
  };
  for (const child of children) {
    if (child instanceof CharacterData) {
      log("child: string, of: " + child.data);
      currentRun.push(child);
      continue;
    }
    if (typeof child == 'string') {
      log("child: string, of: " + child);
      currentRun.push(child);
      continue;
    }
    log(child);
    log(typeof child);
    log(child.className);
    log(child.tagName);
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
      reportError('unexpected child kind');
    }
  }
  flushRun();

  log("wrapped children: " + wrappedChildren.length);
  if (wrappedChildren.length == 0) {
    reportError("no wrapped children");
    return;
  }
  if (wrappedChildren.length == 1) {
    reportError("just 1 wrapped child!");
    return;
  }
  rng.shuffle(wrappedChildren);
  for (const child of wrappedChildren) {
    content.appendChild(child);
  }

  return true;
};

function permuteElementChildren(rng) {
  const containersSelector = "tbody, ul";
  // Permute all children according to the RNG.
  const permutedContainer =
      RaiPermutedCloze.clozeContainer.querySelector(containersSelector);
  if (!permutedContainer) {
    log("no " + containersSelector + " in Cloze content container");
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
  log("RNG seed: " + seed);

  if (permuteElementChildren(rng)) {
    log("Success with permuted container.");
    return;
  }
  if (permuteJustDivAndLines(rng)) {
    log("Success with permuted div-and-lines.");
    return;
  }
  reportError(
      "No permuted container (tbody or ul, or <br>-separated plaintext) found in Cloze content.");
};

function handleError(event) {
  reportError("Error " + event.lineno + ":" + event.colno + ": " +
              event.message);
};

shuffleCloze();
RaiPermutedCloze.clozeContainer.className = "js-finished";
