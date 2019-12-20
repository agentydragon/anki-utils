goog.module('agentydragon.heading');

const {Logger} = goog.require('agentydragon.logging');
const {Note} = goog.require('agentydragon.note');

const SPECIAL_TITLECASE = {
  'cpp' : 'C++',
  'javascript' : 'JavaScript',
  'latex' : 'LaTeX',
  'probability-statistics' : 'Probability & Statistics',
  'zetasql' : 'ZetaSQL',
  'ffmpeg' : '<code>ffmpeg</code>',
  'go::stdlib' : 'Go standard library',
  'go::stdlib::format' : 'Go - <code>fmt</code> formats',
  'c::stdlib' : 'C standard library',
  'cpp::absl' : 'C++ absl',
  'python::stdlib' : 'Python standard library',
  'python::stdlib::unittest' :
      'Python standard library - <code>unittest</code>',
  'cpp::stl' : 'C++ STL',
};

/** @const {!Array<string>} */
const META_FAMILIES =
    [ "todo", "marked", "leech", "source", "persons::_my_network" ];

const LIBRARY = "cs::libraries";
const PROGRAMMING_LANGUAGE = "cs::languages";

/**
 * @param {string} deck
 * @return {string}
 */
function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

const HIERARCHY_SEPARATOR = '::';

/**
 * @param {string} tag
 * @param {string} parentTag
 * @return {boolean}
 */
function tagIsStrictlyUnderTag(tag, parentTag) {
  return tag.startsWith(parentTag + HIERARCHY_SEPARATOR);
}

/**
 * @param {string} tag
 * @param {string} parentTag
 * @return {boolean}
 */
function tagIsUnderTag(tag, parentTag) {
  return tag == parentTag || tagIsStrictlyUnderTag(tag, parentTag);
}

/**
 * @param {string} tag
 * @return {string}
 */
function titlecaseTag(tag) {
  if (SPECIAL_TITLECASE[tag]) {
    return SPECIAL_TITLECASE[tag];
  }
  return tag.split('-')
      .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' ');
}

/**
 * @param {string} tag
 * @return {string}
 */
function headingFromTag(tag) {
  const parts = tag.split(HIERARCHY_SEPARATOR);
  // If any suffix of the tag is in SPECIAL_TITLECASE, return it.
  for (let firstPartIndex = parts.length - 1; firstPartIndex >= 0;
       --firstPartIndex) {
    const suffix = parts.slice(firstPartIndex).join(HIERARCHY_SEPARATOR);
    if (SPECIAL_TITLECASE[suffix]) {
      return SPECIAL_TITLECASE[suffix];
    }
  }
  return titlecaseTag(parts[parts.length - 1]);
}

/**
 * @param {string} tag
 * @return {boolean}
 */
function tagIsMeta(tag) {
  return META_FAMILIES.some(family => tagIsUnderTag(tag, family));
}

/**
 * @param {!Note} note
 * @return {?string}
 */
function getHeadingFromHeadingField(note) {
  const headingField = note.heading;
  if (!headingField || headingField.length == 0) {
    return null;
  }
  return headingField;
}

/**
 * @param {string} tag
 * @return {!Array<string>}
 */
function expandTag(tag) {
  const parts = tag.split(HIERARCHY_SEPARATOR);
  let result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts.slice(0, i + 1).join(HIERARCHY_SEPARATOR));
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
 * @param {!Note} note
 * @return {?string} Heading. Can contain unrestricted HTML.
 */
function getHeadingFromTags(note) {
  const tags = note.tags;
  if (!tags) {
    return null;
  }
  // Fully expand.
  const expandedTags = expandTags(tags.split(' '));
  /** @type {!Array<string>} */
  let individualTags = expandedTags.filter(tag => !tagIsMeta(tag));
  // Remove continent names.
  if (note.card == 'Flag') {
    // TODO(prvak): This should also be anchored by the note type, but the
    // note type's UUID is not visible right now, and slug does not sync
    // the note type name...
    individualTags =
        individualTags.filter(tag => !tagIsUnderTag(tag, "geo::continent"));
  }
  // Remove non-leaf tags.
  /** @type {!function(string): boolean} */
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => tagIsStrictlyUnderTag(candidateChild, tag));
  /** @type {!function(string): boolean} */
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
  const headingFromTags = getHeadingFromTags(note);
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
