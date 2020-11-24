import Card from "./Card";

export default function Deck({ deck, handleDeckClick }) {
  return (
    <div onClick={handleDeckClick}>
      {deck.map((card, index) => (
        <Card key={index} value={card} />
      ))}
    </div>
  );
}
