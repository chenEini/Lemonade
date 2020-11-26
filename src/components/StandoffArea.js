import FaceDownCard from "./FaceDownCard";
import FaceUpCard from "./FaceUpCard";

export default function StandoffArea({ aiCard, playerCard }) {
  const style = {
    "animation-name": "card-animation",
    "animation-duration": "300ms",
  };

  return (
    <div className={"standoff-area"}>
      {aiCard && !playerCard && <FaceDownCard style={style} />}
      {aiCard && playerCard && <FaceUpCard value={aiCard} style={style} />}
      {playerCard && <FaceUpCard value={playerCard} style={style} />}
    </div>
  );
}
