import { useState } from "react";
import Deck from "./Deck";
import Hand from "./Hand";

export default function PlayerBoard({ cards }) {
  const [hand, setHand] = useState([]);
  const [deck, setDeck] = useState(cards);

  const handleDeckClick = () => {
    const deckSize = deck.length;

    if (hand.length < 3) {
      const card = deck[deckSize - 1];
      setDeck(deck.slice(0, deckSize - 1));
      setHand([...hand, card]);
    }
  };

  const handleHandCardClick = (card) => {
    const cardIndex = hand.indexOf(card);
    const newHand = hand.splice(cardIndex, 1);
    setHand(newHand);
    // TODO: send to standoff area
  };

  return (
    <div>
      <Deck deck={deck} handleDeckClick={handleDeckClick}></Deck>
      <Hand hand={hand} handleHandCardClick={handleHandCardClick}></Hand>
    </div>
  );
}
