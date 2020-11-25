import Deck from "./Deck";
import FaceDownCard from "./FaceDownCard";

export default function AiBoard({ deck, hand }) {
  return (
    <div className={"player-board"}>
      <Deck deck={deck}></Deck>
      <div className={"hand"}>
        {hand.map((card) => (
          <FaceDownCard value={card} />
        ))}
      </div>
    </div>
  );
}
