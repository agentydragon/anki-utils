(function() {
const header = document.querySelector("h1");
if (header.textContent.length == 0) {
  const deck = document.querySelector("#agentydragon-deck").textContent;
  const deckHierarchy = deck.split("::");
  const innerDeck = deckHierarchy[deckHierarchy.length - 1];
  // "05 German" --> "German"
  // "*05 German" --> "German"
  const sanitizedDeck = innerDeck.replace(/^[^a-zA-Z]?\d* ?(.*)$/, "$1");
  header.textContent = sanitizedDeck;
}
})();
