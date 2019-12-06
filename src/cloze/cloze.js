function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  const innerDeck = deckHierarchy[deckHierarchy.length - 1];
  // "05 German" --> "German"
  // "*05 German" --> "German"
  return innerDeck.replace(/^[^a-zA-Z]?\d* ?(.*)$/, "$1");
}

const heading = document.getElementById("agentydragon-heading").textContent;
const deck = document.getElementById("agentydragon-deck").textContent;
if (!document.querySelector("h1")) {
  const newHeader = document.createElement("h1");
  newHeader.textContent = getLastDeckComponent(deck);
  // There is another <h1> somewhere. Remove the empty placeholder.
  const card = document.getElementById("agentydragon-card");
  if (!card) {
    Rai.reportError("unexpected: no .card found. cannot insert header");
  } else {
    card.insertBefore(newHeader, card.firstChild);
  }
}
