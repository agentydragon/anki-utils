goog.module('agentydragon.heading');

const {reportError} = goog.require('agentydragon.logging');

let Rai = {};

function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

Rai.tagIsStrictlyUnderTag = function(
    tag, parentTag) { return tag.startsWith(parentTag + '::'); };

Rai.tagIsUnderTag = function(tag, parentTag) {
  return tag == parentTag || Rai.tagIsStrictlyUnderTag(tag, parentTag);
};

const SPECIAL_TITLECASE = {
  'javascript' : 'JavaScript',
  'cpp' : 'C++',
};

Rai.titlecaseTag = function(tag) {
  if (SPECIAL_TITLECASE[tag]) {
    return SPECIAL_TITLECASE[tag];
  }
  return tag.split('-')
      .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' ');
};

Rai.headingFromTag = function(tag) {
  const parts = tag.split('::');
  return Rai.titlecaseTag(parts[parts.length - 1]);
};

Rai.tagIsMeta = function(tag) {
  const metaFamilies =
      [ "todo", "marked", "leech", "source", "persons::_my_network" ];
  return metaFamilies.some(family => Rai.tagIsUnderTag(tag, family));
};

Rai.headingFromHeadingField = function(note) {
  const headingField = note.heading;
  if (!headingField || headingField.length == 0) {
    return null;
  }
  return headingField;
};

Rai.expandTag = function(tag) {
  const parts = tag.split('::');
  let result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts.slice(0, i + 1).join('::'));
  }
  return result;
};

Rai.expandTags = function(
    tags) { return [...new Set(tags.flatMap(tag => Rai.expandTag(tag))) ]; };

Rai.headingFromTags = function(note) {
  const tags = note.tags;
  if (!tags) {
    return null;
  }
  // Fully expand.
  const expandedTags = Rai.expandTags(tags.split(' '));
  console.log("expanded tags:", expandedTags);
  const individualTags = expandedTags.filter(tag => !Rai.tagIsMeta(tag));
  // Remove non-leaf tags.
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => Rai.tagIsStrictlyUnderTag(candidateChild, tag));
  const tagIsLeaf = tag => !tagIsNonleaf(tag);
  const leafTags = individualTags.filter(tagIsLeaf);
  console.log("leaf tags:", leafTags);
  const candidateHeadings = leafTags.map(Rai.headingFromTag).sort();
  if (candidateHeadings.length == 0) {
    return null;
  }
  return candidateHeadings[0];
};

Rai.headingFromLastDeckComponent = function(note) {
  const deck = note.deck;
  if (!deck || deck.length == 0) {
    return null;
  }
  return getLastDeckComponent(deck);
};

function obtainHeadingHtml(note) {
  const headingFromHeadingField = Rai.headingFromHeadingField(note);
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
  const headingFromTags = Rai.headingFromTags(note);
  if (headingFromTags) {
    return headingFromTags;
  }
  // Last resort: show the deck name
  const headingFromDeck = Rai.headingFromLastDeckComponent(note);
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
  getLastDeckComponent,
  ensureHeading
};
// TODO(prvak): library should win over language
