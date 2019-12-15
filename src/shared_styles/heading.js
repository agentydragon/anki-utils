function getLastDeckComponent(deck) {
  // TODO(agentydragon): This will need to work on tags.
  const deckHierarchy = deck.split("::");
  const innerDeck = deckHierarchy[deckHierarchy.length - 1];
  // "05 German" --> "German"
  // "*05 German" --> "German"
  return innerDeck.replace(/^[^a-zA-Z]?\d* ?(.*)$/, "$1");
}

Rai.obtainFieldFromId = function(id) {
  const content = document.getElementById(id).textContent;
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
  const metaFamilies = [ "todo", "marked", "leech", "source" ];
  return metaFamilies.some(family => Rai.tagIsUnderTag(tag, family));
};

Rai.headingFromHeadingField = function() {
  const headingField = Rai.NOTE_FIELDS.HEADING;
  if (!headingField || headingField.length == 0) {
    return null;
  }
  return headingField;
};

Rai.headingFromTags = function() {
  const tags = Rai.NOTE_FIELDS.TAGS;
  if (!tags) {
    return null;
  }
  const individualTags = tags.split(' ').filter(tag => !Rai.tagIsMeta(tag));
  // Remove non-leaf tags.
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => Rai.tagIsStrictlyUnderTag(candidateChild, tag));
  const tagIsLeaf = tag => !tagIsNonleaf(tag);
  const leafTags = individualTags.filter(tagIsLeaf);
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
  return getLastDeckComponent(Rai.NOTE_FIELDS.DECK);
};

Rai.obtainHeading = function() {
  const headingFromHeadingField = Rai.headingFromHeadingField();
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    if (headingFromHeadingField) {
      Rai.doLog("warning", "Both Heading field and inline heading specified.");
    }
    headerInContent.remove();
    return headerInContent.textContent;
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
  const headingText = Rai.obtainHeading();
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    Rai.reportError("unexpected: no .card found. cannot insert header");
    return;
  }
  const newHeader = document.createElement("h1");
  newHeader.textContent = headingText;
  card.insertBefore(newHeader, card.firstChild);
};

Rai.obtainNoteFields();
Rai.ensureHeading();
