goog.module('agentydragon.permutedCloze.permutedCloze');

const {RNG, computeRngSeed} = goog.require('agentydragon.rng');

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

function shuffleCloze(note, clozeContainer, logger) {
  const seed = computeRngSeed(note);
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
