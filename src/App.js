import React, { useCallback, useEffect, useState } from "react";
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
  };
}

export default function LemonadeStandoff() {
  const [gameState, setGameState] = useState(getInitialState());

  const handleDeckClick = () => {
    if (gameState.playerChosenCard === null) {
      const deckSize = gameState.playerDeck.length;

      if (gameState.playerHand.length < 3) {
        const card = gameState.playerDeck.slice(-1);
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
      const cardIndex = gameState.playerHand.indexOf(card);

      gameState.playerHand.splice(cardIndex, 1);

      setGameState({
        ...gameState,
        playerHand: gameState.playerHand,
        playerChosenCard: card,
      });
    }
  };

  const performAiMove = useCallback(() => {
    if (gameState.aiChosenCard === null) {
      const deckSize = gameState.aiDeck.length;

      const cards = gameState.aiDeck.slice(-2);
      const aiChosenCard = Math.max(...cards);

      setGameState({
        ...gameState,
        aiDeck: gameState.aiDeck.slice(0, deckSize - 2),
        aiHand: [Math.min(...cards)],
        aiChosenCard,
      });
    }
  }, [gameState]);

  const performRound = useCallback(() => {
    if (
      gameState.aiChosenCard !== null &&
      gameState.playerChosenCard !== null
    ) {
      let aiDeck = gameState.aiDeck;
      let playerDeck = gameState.playerDeck;

      const winningCards = [
        ...gameState.aiHand,
        ...gameState.playerHand,
        gameState.aiChosenCard,
        gameState.playerChosenCard,
      ];

      if (gameState.aiChosenCard > gameState.playerChosenCard) {
        aiDeck = shuffle([...aiDeck, ...winningCards]);
      } else {
        playerDeck = shuffle([...playerDeck, ...winningCards]);
      }

      setGameState({
        ...gameState,
        aiDeck,
        playerDeck,
        aiHand: [],
        playerHand: [],
        aiChosenCard: null,
        playerChosenCard: null,
      });
    }
  }, [gameState]);

  useEffect(() => {
    performAiMove();
    performRound();
  }, [gameState, performAiMove, performRound]);

  return (
    <div className={"main-board"}>
      <AiBoard deck={gameState.aiDeck} hand={gameState.aiHand}></AiBoard>
      <StandoffArea
        standoffCards={[gameState.aiChosenCard, gameState.playerChosenCard]}
      ></StandoffArea>
      <PlayerBoard
        deck={gameState.playerDeck}
        hand={gameState.playerHand}
        handleDeckClick={handleDeckClick}
        handleFaceUpCardClick={handleFaceUpCardClick}
      ></PlayerBoard>
    </div>
  );
}
