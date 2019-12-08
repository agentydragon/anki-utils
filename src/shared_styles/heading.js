function getLastDeckComponent(deck) {
  // TODO(agentydragon): This will need to work on tags.
  const deckHierarchy = deck.split("::");
  const innerDeck = deckHierarchy[deckHierarchy.length - 1];
  // "05 German" --> "German"
  // "*05 German" --> "German"
  return innerDeck.replace(/^[^a-zA-Z]?\d* ?(.*)$/, "$1");
}

function headingIsUsable(heading) {
  // Allow using automatic heading inference without a Heading field
  // in the model.
  return heading.length > 0 && heading.indexOf("unknown field Heading") === -1;
}

const heading = document.getElementById("agentydragon-heading").textContent;
const deck = document.getElementById("agentydragon-deck").textContent;
const card = document.getElementById("agentydragon-card");
const headerInContent = document.querySelector("#agentydragon-content h1");
if (headerInContent) {
  headerInContent.remove();
  card.insertBefore(headerInContent, card.firstChild);
} else if (!document.querySelector("h1")) {
  const newHeader = document.createElement("h1");
  if (headingIsUsable(heading)) {
    newHeader.textContent = heading;
  } else {
    newHeader.textContent = getLastDeckComponent(deck);
  }
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    Rai.reportError("unexpected: no .card found. cannot insert header");
  } else {
    card.insertBefore(newHeader, card.firstChild);
  }
}
