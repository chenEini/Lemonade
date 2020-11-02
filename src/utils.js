export function shuffle(array) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

const NUMBER_OF_CARDS_IN_GAME = 20;

const THEME_COLOR = "#ff0083";

const CARD_WIDTH = 98;
const CARD_HEIGHT = 135;
