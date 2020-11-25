import React, { useState } from "react";
import { generateCards, shuffle } from "./utils";
import PlayerBoard from "./components/PlayerBoard";
import AiBoard from "./components/AiBoard";
import StandoffArea from "./components/StandoffArea";
import "./App.css";

function getInitialState() {
  const cards = generateCards();
  const shuffledCards = shuffle(cards);

  const deckSize = cards.length / 2;

  const aiDeck = shuffledCards.slice(deckSize);
  const playerDeck = shuffledCards.slice(0, deckSize);

  return {
    aiDeck,
    playerDeck,
    aiHand: [],
    playerHand: [],
    aiChosenCard: null,
    playerChosenCard: null,
    standoffCards: [],
  };
}

export default function LemonadeStandoff() {
  // use this function to render the layout of the game and hold the main state of the app

  const [gameState, setGameState] = useState(getInitialState());

  const handleDeckClick = () => {
    if (gameState.playerChosenCard === null) {
      const deckSize = gameState.playerDeck.length;

      if (gameState.playerHand.length < 3) {
        const card = gameState.playerDeck[deckSize - 1];
        setGameState({
          ...gameState,
          playerDeck: gameState.playerDeck.slice(0, deckSize - 1),
          playerHand: [...gameState.playerHand, card],
        });
      }
    }
  };

  const handleFaceUpCardClick = (card) => {
    if (gameState.playerChosenCard === null) {
      const standoffCards = [...gameState.standoffCards, card];
      const cardIndex = gameState.playerHand.indexOf(card);

      gameState.playerHand.splice(cardIndex, 1);

      setGameState({
        ...gameState,
        standoffCards,
        playerHand: gameState.playerHand,
        playerChosenCard: card,
      });
    }
  };

  return (
    <div className={"main-board"}>
      <AiBoard deck={gameState.aiDeck} hand={gameState.aiHand}></AiBoard>
      <StandoffArea standoffCards={gameState.standoffCards}></StandoffArea>
      <PlayerBoard
        deck={gameState.playerDeck}
        hand={gameState.playerHand}
        handleDeckClick={handleDeckClick}
        handleFaceUpCardClick={handleFaceUpCardClick}
      ></PlayerBoard>
    </div>
  );
}
