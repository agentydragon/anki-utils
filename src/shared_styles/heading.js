Rai.getLastDeckComponent =
    function(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

    Rai.obtainFieldFromId = function(id) {
  const content = document.getElementById(id).innerHTML;
  // If the model does not have the field, return null.
  if (content.indexOf("unknown field ") !== -1) {
    return null;
  }
  return content;
};

Rai.obtainNoteFields = function() {
  Rai.NOTE_FIELDS = {
    HEADING : Rai.obtainFieldFromId("agentydragon-heading"),
    DECK : Rai.obtainFieldFromId("agentydragon-deck"),
    TAGS : Rai.obtainFieldFromId("agentydragon-tags"),
  };
};

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

Rai.headingFromHeadingField = function() {
  const headingField = Rai.NOTE_FIELDS.HEADING;
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

Rai.headingFromTags = function() {
  const tags = Rai.NOTE_FIELDS.TAGS;
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

Rai.headingFromLastDeckComponent = function() {
  if (!Rai.NOTE_FIELDS.DECK || Rai.NOTE_FIELDS.DECK.length == 0) {
    return null;
  }
  return Rai.getLastDeckComponent(Rai.NOTE_FIELDS.DECK);
};

Rai.obtainHeadingHtml = function() {
  const headingFromHeadingField = Rai.headingFromHeadingField();
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    if (headingFromHeadingField) {
      Rai.doLog("warning", "Both Heading field and inline heading specified.");
    }
    headerInContent.remove();
    return headerInContent.innerHTML;
  }
  // Use the heading specified in the note, if given.
  if (headingFromHeadingField) {
    return headingFromHeadingField;
  }
  const headingFromTags = Rai.headingFromTags();
  if (headingFromTags) {
    return headingFromTags;
  }
  // Last resort: show the deck name
  const headingFromDeck = Rai.headingFromLastDeckComponent();
  if (headingFromDeck) {
    return headingFromDeck;
  }
  Rai.reportError("no way to get a heading");
};

Rai.ensureHeading = function() {
  const card = document.getElementById("agentydragon-card");
  const headingHtml = Rai.obtainHeadingHtml();
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    Rai.reportError("unexpected: no .card found. cannot insert header");
    return;
  }
  const newHeader = document.createElement("h1");
  // TODO(prvak): Sanitize?
  newHeader.innerHTML = headingHtml;
  card.insertBefore(newHeader, card.firstChild);
};

Rai.obtainNoteFields();
Rai.ensureHeading();
