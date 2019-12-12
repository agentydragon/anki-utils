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
  };
};

Rai.obtainHeading = function() {
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    headerInContent.remove();
    return headerInContent.textContent;
  }
  if (Rai.NOTE_FIELDS.HEADING) {
    return Rai.NOTE_FIELDS.HEADING;
  }
  return getLastDeckComponent(Rai.NOTE_FIELDS.DECK);
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
