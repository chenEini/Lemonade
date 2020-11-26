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
    if (
      gameState.playerChosenCard === null &&
      gameState.playerHand.length < 3
    ) {
      const deckSize = gameState.playerDeck.length;
      const card = gameState.playerDeck.slice(-1);

      setGameState({
        ...gameState,
        playerDeck: gameState.playerDeck.slice(0, deckSize - 1),
        playerHand: [...gameState.playerHand, card],
      });
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
    if (gameState.aiChosenCard === null && gameState.aiHand.length === 0) {
      const deckSize = gameState.aiDeck.length;

      const cards = gameState.aiDeck.slice(-2);
      const aiHand = cards.length > 1 ? [Math.min(...cards)] : [];
      const aiChosenCard = cards.length > 0 ? Math.max(...cards) : null;

      setTimeout(() => {
        setGameState((currentGameState) => ({
          ...currentGameState,
          aiDeck: gameState.aiDeck.slice(0, deckSize - 2),
          aiHand: cards,
        }));
      }, 500);

      setTimeout(() => {
        setGameState((currentGameState) => ({
          ...currentGameState,
          aiHand,
          aiChosenCard,
        }));
      }, 1000);
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
        aiDeck = shuffle([...winningCards, ...aiDeck]);
      } else {
        playerDeck = shuffle([...winningCards, ...playerDeck]);
      }

      setTimeout(() => {
        setGameState((currentGameState) => ({
          ...currentGameState,
          aiDeck,
          playerDeck,
          aiHand: [],
          playerHand: [],
          aiChosenCard: null,
          playerChosenCard: null,
        }));
      }, 1000);
    }
  }, [gameState]);

  const finalizedGame = useCallback(() => {
    if (
      gameState.aiChosenCard === null &&
      gameState.aiHand.length === 0 &&
      gameState.aiDeck.length === 0
    ) {
      if (window.confirm("Losing is part of the game... Try again!")) {
        window.location.reload();
      }
    } else if (
      gameState.playerChosenCard === null &&
      gameState.playerHand.length === 0 &&
      gameState.playerDeck.length === 0
    ) {
      if (window.confirm("Congrats! You won!")) {
        window.location.reload();
      }
    }
  }, [gameState]);

  useEffect(() => {
    finalizedGame();
    performAiMove();
    performRound();
  }, [gameState, finalizedGame, performAiMove, performRound]);

  return (
    <div className={"main-board"}>
      <AiBoard deck={gameState.aiDeck} hand={gameState.aiHand}></AiBoard>
      <StandoffArea
        aiCard={gameState.aiChosenCard}
        playerCard={gameState.playerChosenCard}
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
