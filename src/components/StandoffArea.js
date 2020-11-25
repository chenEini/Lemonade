import FaceUpCard from "./FaceUpCard";

export default function StandoffArea({ standoffCards }) {
  return (
    <div className={"standoff-area"}>
      {standoffCards.map((card) => card && <FaceUpCard value={card} />)}
    </div>
  );
}
