import Card from "./Card";

export default function Hand({ hand }) {
  return (
    <div>
      {hand.map((card, index) => (
        <Card key={index} value={card} />
      ))}
    </div>
  );
}
