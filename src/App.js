import React, { useState, useReducer } from "react";
import { shuffle } from "./utils";
import "./App.css";

function getInitialState() {
 // return initial state here
}

export default function LemonadeStandoff() {
  // this is the main game function
  // use this function to render the layout of the game and hold the main state of the app

  // you can use `useState`
  const [gameState, setGameState] = useState(getInitialState());
  // or alternatively, use `useReducer`
  const [gameState, dispatch] = useReducer(reducer, getInitialState());
  // or if you prefer, use a different state management solution

  return null;
}
