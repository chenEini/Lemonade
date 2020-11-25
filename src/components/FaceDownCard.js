export default function FaceDownCard({ index, value }) {
  const cardTransform = { transform: `translate(${index}px, ${index}px)` };

  return (
    <div className={"card face-down-card"} style={cardTransform}>
      {value}
    </div>
  );
}
