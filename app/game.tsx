import { Card } from "@/cards";
import DraggableCardList from "./draggable-card-list";
import Complete from "./complete";

const Game = ({
  cards,
  done,
  setDone,
  setOrder,
  next,
}: {
  cards: Card[];
  done: boolean;
  setDone: () => void;
  setOrder: (order: number[]) => void;
  next: string | (() => void);
}) => {
  return (
    <>
      <DraggableCardList done={done} cards={cards} setOrder={setOrder} />
      <Complete done={done} setDone={setDone} cards={cards} next={next} />
    </>
  );
};

export default Game;
