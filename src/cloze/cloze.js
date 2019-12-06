(function() {

function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  const innerDeck = deckHierarchy[deckHierarchy.length - 1];
  // "05 German" --> "German"
  // "*05 German" --> "German"
  return innerDeck.replace(/^[^a-zA-Z]?\d* ?(.*)$/, "$1");
}

const heading = document.querySelector("#agentydragon-heading").textContent;
const deck = document.querySelector("#agentydragon-deck").textContent;
if (!document.querySelector("h1")) {
  const newHeader = document.createNode("h1");
  newHeader.textContent = getLastDeckComponent(deck);
  // There is another <h1> somewhere. Remove the empty placeholder.
  const note = document.querySelector(".node");
  note.insertBefore(newHeader, note.firstChild);
}
})();
