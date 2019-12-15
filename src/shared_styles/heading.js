goog.module('agentydragon.heading');

const {Logger} = goog.require('agentydragon.logging');
const {Note} = goog.require('agentydragon.note');

const SPECIAL_TITLECASE = {
  'cpp' : 'C++',
  'javascript' : 'JavaScript',
  'latex' : 'LaTeX',
  'probability-statistics' : 'Probability & Statistics',
  'zetasql' : 'ZetaSQL',
};

const META_FAMILIES =
    [ "todo", "marked", "leech", "source", "persons::_my_network" ];

const LIBRARY = "cs::libraries";
const PROGRAMMING_LANGUAGE = "cs::languages";

function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

function tagIsStrictlyUnderTag(tag, parentTag) {
  return tag.startsWith(parentTag + '::');
}

/**
 * @param {string} tag
 * @param {string} parentTag
 * @return {boolean}
 */
function tagIsUnderTag(tag, parentTag) {
  return tag == parentTag || tagIsStrictlyUnderTag(tag, parentTag);
}

function titlecaseTag(tag) {
  if (SPECIAL_TITLECASE[tag]) {
    return SPECIAL_TITLECASE[tag];
  }
  return tag.split('-')
      .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' ');
}

function headingFromTag(tag) {
  const parts = tag.split('::');
  return titlecaseTag(parts[parts.length - 1]);
}

function tagIsMeta(tag) {
  return META_FAMILIES.some(family => tagIsUnderTag(tag, family));
}

function getHeadingFromHeadingField(note) {
  const headingField = note.heading;
  if (!headingField || headingField.length == 0) {
    return null;
  }
  return headingField;
}

function expandTag(tag) {
  const parts = tag.split('::');
  let result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts.slice(0, i + 1).join('::'));
  }
  return result;
}

/**
 * @param {!Array<string>} tags
 * @return {!Array<string>}
 */
function expandTags(tags) { return [...new Set(tags.flatMap(expandTag)) ]; }

/**
 * @param {string} lhs
 * @param {string} rhs
 * @return {number}
 */
function compareTags(lhs, rhs) {
  // Sort libraries before languages.
  const lhsLibrary = tagIsUnderTag(lhs, LIBRARY);
  const rhsLanguage = tagIsUnderTag(rhs, PROGRAMMING_LANGUAGE);
  const lhsLanguage = tagIsUnderTag(lhs, PROGRAMMING_LANGUAGE);
  const rhsLibrary = tagIsUnderTag(rhs, LIBRARY);
  if (lhsLibrary && rhsLanguage) {
    return -1;
  }
  if (lhsLanguage && rhsLibrary) {
    return 1;
  }
  return lhs.localeCompare(rhs);
}

/**
 * @param {string} tags
 * @return {?string}
 */
function getHeadingFromTags(tags) {
  if (!tags) {
    return null;
  }
  // Fully expand.
  const expandedTags = expandTags(tags.split(' '));
  const individualTags = expandedTags.filter(tag => !tagIsMeta(tag));
  // Remove non-leaf tags.
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => tagIsStrictlyUnderTag(candidateChild, tag));
  const tagIsLeaf = tag => !tagIsNonleaf(tag);
  const leafTags = individualTags.filter(tagIsLeaf);
  const sorted = leafTags.sort(compareTags);
  const candidateHeadings = sorted.map(headingFromTag);
  if (candidateHeadings.length == 0) {
    return null;
  }
  return candidateHeadings[0];
}

/**
 * @param {!Note} note
 * @return {?string}
 */
function headingFromLastDeckComponent(note) {
  const deck = note.deck;
  if (!deck || deck.length == 0) {
    return null;
  }
  return getLastDeckComponent(deck);
}

/**
 * @param {!Logger} logger
 * @param {!Note} note
 * @return {?string}
 */
function obtainHeadingHtml(logger, note) {
  const headingFromHeadingField = getHeadingFromHeadingField(note);
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    if (headingFromHeadingField) {
      logger.warn("Both Heading field and inline heading specified.");
    }
    headerInContent.remove();
    return headerInContent.innerHTML;
  }
  // Use the heading specified in the note, if given.
  if (headingFromHeadingField) {
    return headingFromHeadingField;
  }
  const headingFromTags = getHeadingFromTags(note.tags);
  if (headingFromTags) {
    return headingFromTags;
  }
  // Last resort: show the deck name
  const headingFromDeck = headingFromLastDeckComponent(note);
  if (headingFromDeck) {
    return headingFromDeck;
  }
  logger.error("no way to get a heading");
  return null;
}

/**
 * @param {!Logger} logger
 * @param {!Note} note
 */
function ensureHeading(logger, note) {
  const card = document.getElementById("agentydragon-card");
  const headingHtml = obtainHeadingHtml(logger, note);
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    logger.error("unexpected: no .card found. cannot insert header");
    return;
  }

  // Move h2 out of content, if it's present.
  const subheaders = document.querySelectorAll("#agentydragon-content h2");
  if (subheaders.length == 1) {
    const h2 = subheaders[0];
    h2.remove();
    card.insertBefore(h2, card.firstChild);
  }

  const newHeader = document.createElement("h1");
  // TODO(prvak): Sanitize?
  newHeader.innerHTML = headingHtml;
  card.insertBefore(newHeader, card.firstChild);
}

exports = {
  tagIsUnderTag,
  compareTags,
  ensureHeading,
  expandTags,
  getHeadingFromTags
};
// TODO(prvak): library should win over language
