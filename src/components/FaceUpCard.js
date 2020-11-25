export default function FaceUpCard({ value, handleFaceUpCardClick }) {
  return (
    <div
      className={"card face-up-card"}
      onClick={() => handleFaceUpCardClick && handleFaceUpCardClick(value)}
    >
      {value}
    </div>
  );
}
