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
      <p>
        Sort cards based on{" "}
        <a
          href="https://www.17lands.com/metrics_definitions"
          target="_blank"
          rel="noopener noreferrer"
        >
          17lands.com Games in Hand Win Rate
        </a>
        .
      </p>
      <DraggableCardList done={done} cards={cards} setOrder={setOrder} />
      <Complete done={done} setDone={setDone} cards={cards} next={next} />
    </>
  );
};

export default Game;
