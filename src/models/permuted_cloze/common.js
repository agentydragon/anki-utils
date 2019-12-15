goog.module('agentydragon.permutedCloze.permutedCloze');

const {RNG} = goog.require('agentydragon.rng');

function addHash(hash, x) {
  hash = (hash * 17 + x) % 256;
  return hash;
}

function detachChildren(element) {
  let children = [];
  while (element.firstChild) {
    children.push(element.removeChild(element.firstChild));
  }
  return children;
}

function permuteChildren(rng, element) {
  let children = detachChildren(element);
  rng.shuffle(children);
  element.append(...children);
}

function permuteJustDivAndLines(clozeContainer, logger, rng) {
  const content = clozeContainer;
  for (const child of content.children) {
    if (typeof child == 'string' || child instanceof CharacterData) {
      continue;
    }
    logger.log(child, typeof child, child.className, child.tagName);
    const tag = child.tagName.toLowerCase();
    if (tag == 'div' || tag == 'br') {
      continue;
    }
    if ((tag == 'span') && (child.className == 'cloze')) {
      // Cloze in text.
      continue;
    }
    logger.log("child is <" + tag + "> -> not div-and-lines");
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
      logger.log("child: string, of: " + child.data);
      currentRun.push(child);
      continue;
    }
    if (typeof child == 'string') {
      logger.log("child: string, of: " + child);
      currentRun.push(child);
      continue;
    }
    logger.log(child, typeof child, child.className, child.tagName);
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
      logger.error('unexpected child kind');
    }
  }
  flushRun();

  logger.log("wrapped children: " + wrappedChildren.length);
  if (wrappedChildren.length == 0) {
    logger.error("no wrapped children");
    return;
  }
  if (wrappedChildren.length == 1) {
    logger.error("just 1 wrapped child!");
    return;
  }
  rng.shuffle(wrappedChildren);
  content.append(...wrappedChildren);
  return true;
}

function permuteElementChildren(logger, clozeContainer, rng) {
  const containersSelector = "tbody, ul";
  // Permute all children according to the RNG.
  const permutedContainer = clozeContainer.querySelector(containersSelector);
  if (!permutedContainer) {
    logger.log("no " + containersSelector + " in Cloze content container");
    return false;
  }
  permuteChildren(rng, permutedContainer);
  return true;
}

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
}

function shuffleCloze(clozeContainer, logger) {
  const seed = computeRngSeed();
  const rng = new RNG(seed, logger);
  logger.log("RNG seed: " + seed);

  if (permuteElementChildren(logger, clozeContainer, rng)) {
    logger.log("Success with permuted container.");
    return;
  }
  if (permuteJustDivAndLines(clozeContainer, logger, rng)) {
    logger.log("Success with permuted div-and-lines.");
    return;
  }
  logger.error(
      "No permuted container (tbody, ul, or <br>-separated lines) found.");
}

exports = {shuffleCloze};
