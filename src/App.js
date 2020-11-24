import React, { useState } from "react";
import { generateCards, shuffle } from "./utils";
import PlayerBoard from "./components/PlayerBoard";
import StandoffArea from "./components/StandoffArea";
import "./App.css";

function getInitialState() {
  const cards = generateCards();
  const shuffledCards = shuffle(cards);

  const deckSize = cards.length / 2;

  const playerCards = shuffledCards.slice(0, deckSize);
  const aiCards = shuffledCards.slice(deckSize);

  return { playerCards: playerCards, aiCards: aiCards };
}

export default function LemonadeStandoff() {
  // this is the main game function
  // use this function to render the layout of the game and hold the main state of the app

  const [gameState, setGameState] = useState(getInitialState());

  return (
    <>
      <PlayerBoard cards={gameState.aiCards}></PlayerBoard>
      <StandoffArea></StandoffArea>
      <PlayerBoard cards={gameState.playerCards}></PlayerBoard>
    </>
  );
}
