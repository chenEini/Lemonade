export default function FaceUpCard({ value, style, handleFaceUpCardClick }) {
  return (
    <div
      className={"card face-up-card"}
      style={style}
      onClick={() => handleFaceUpCardClick && handleFaceUpCardClick(value)}
    >
      <p>{value}</p>
    </div>
  );
}
