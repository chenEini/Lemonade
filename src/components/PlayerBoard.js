import Deck from "./Deck";
import FaceUpCard from "./FaceUpCard";

export default function PlayerBoard({
  deck,
  hand,
  handleDeckClick,
  handleFaceUpCardClick,
}) {
  return (
    <div className={"player-board"}>
      <Deck deck={deck} handleDeckClick={handleDeckClick}></Deck>
      <div className={"hand"}>
        {hand.map((card) => (
          <FaceUpCard
            value={card}
            handleFaceUpCardClick={handleFaceUpCardClick}
          />
        ))}
      </div>
    </div>
  );
}
