import FaceUpCard from "./FaceUpCard";

export default function StandoffArea({ standoffCards }) {
  return (
    <div className={"standoff-area"}>
      {standoffCards.map((card) => (
        <FaceUpCard value={card} />
      ))}
    </div>
  );
}
