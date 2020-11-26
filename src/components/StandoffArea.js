import FaceDownCard from "./FaceDownCard";
import FaceUpCard from "./FaceUpCard";

export default function StandoffArea({ aiCard, playerCard }) {
  return (
    <div className={"standoff-area"}>
      {aiCard && !playerCard && <FaceDownCard />}
      {aiCard && playerCard && <FaceUpCard value={aiCard} />}
      {playerCard && <FaceUpCard value={playerCard} />}
    </div>
  );
}
