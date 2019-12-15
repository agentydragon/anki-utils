goog.module('agentydragon.heading');

const {Note} = goog.require('agentydragon.note');
const {reportError} = goog.require('agentydragon.logging');

const SPECIAL_TITLECASE = {
  'javascript' : 'JavaScript',
  'cpp' : 'C++',
};

const META_FAMILIES =
    [ "todo", "marked", "leech", "source", "persons::_my_network" ];

function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

function tagIsStrictlyUnderTag(tag, parentTag) {
  return tag.startsWith(parentTag + '::');
}

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
 * @param {string} tags
 * @return {?string}
 */
function getHeadingFromTags(tags) {
  if (!tags) {
    return null;
  }
  // Fully expand.
  const expandedTags = expandTags(tags.split(' '));
  console.log("expanded tags:", expandedTags);
  const individualTags = expandedTags.filter(tag => !tagIsMeta(tag));
  // Remove non-leaf tags.
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => tagIsStrictlyUnderTag(candidateChild, tag));
  const tagIsLeaf = tag => !tagIsNonleaf(tag);
  const leafTags = individualTags.filter(tagIsLeaf);
  console.log("leaf tags:", leafTags);
  const candidateHeadings = leafTags.map(headingFromTag).sort();
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

function obtainHeadingHtml(note) {
  const headingFromHeadingField = getHeadingFromHeadingField(note);
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    if (headingFromHeadingField) {
      console.warn("Both Heading field and inline heading specified.");
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
  reportError("no way to get a heading");
}

function ensureHeading(note) {
  const card = document.getElementById("agentydragon-card");
  const headingHtml = obtainHeadingHtml(note);
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    reportError("unexpected: no .card found. cannot insert header");
    return;
  }
  const newHeader = document.createElement("h1");
  // TODO(prvak): Sanitize?
  newHeader.innerHTML = headingHtml;
  card.insertBefore(newHeader, card.firstChild);
}

exports = {
  ensureHeading,
  expandTags,
  getHeadingFromTags
};
// TODO(prvak): library should win over language
