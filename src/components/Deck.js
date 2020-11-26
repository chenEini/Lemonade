import FaceDownCard from "./FaceDownCard";

export default function Deck({ deck, handleDeckClick }) {
  return (
    <div className={"deck"} onClick={handleDeckClick}>
      {deck.map((card, index) => {
        const style = {
          transform: `translate(${index}px, ${index}px)`,
          position: "absolute",
        };

        return <FaceDownCard key={index} style={style} />;
      })}
    </div>
  );
}
