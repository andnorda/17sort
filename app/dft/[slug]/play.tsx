"use client";

import Game from "@/app/game";
import { calculateInsertions } from "@/calculateResults";
import { Card } from "@/cards";
import { useState } from "react";

const Play = ({ cards, next }: { cards: Card[]; next: string }) => {
  const [order, setOrder] = useState(cards.map((c) => c.mtga_id));
  const [done, setDone] = useState(false);

  const levelResults = calculateInsertions(
    order
      .map((id) => cards.find((c) => c.mtga_id === id)!)
      .map((c) => c.ever_drawn_win_rate * 10)
      .toReversed()
  );

  const tot = levelResults.reduce((acc, r) => acc + r.cost, 0) / 10;

  return (
    <>
      <Game
        cards={order.map((id) => cards.find((c) => c.mtga_id === id)!)}
        setOrder={setOrder}
        done={done}
        setDone={() => setDone(true)}
        next={next}
      />
      {done && (
        <>
          {tot === 0 ? (
            <p>You nailed it! 🎉</p>
          ) : (
            <p>
              You were off by{" "}
              {levelResults.reduce((acc, r) => acc + r.cost, 0) / 10} percentage
              points (
              {levelResults.reduce(
                (acc, r) => acc + Math.abs(r.from - r.to),
                0
              )}{" "}
              swaps).
            </p>
          )}
          <a href={next}>Next</a>
        </>
      )}
    </>
  );
};

export default Play;
