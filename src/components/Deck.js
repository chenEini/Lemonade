import FaceDownCard from "./FaceDownCard";

export default function Deck({ deck, handleDeckClick }) {
  return (
    <div className={"deck"} onClick={handleDeckClick}>
      {deck.map((card, index) => (
        <FaceDownCard key={index} index={index} value={card} />
      ))}
    </div>
  );
}
