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
      .map((c) => c.ever_drawn_win_rate)
      .toReversed()
  );

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
          <div>Insertions: {levelResults.length}</div>
          <div>
            Swaps:{" "}
            {levelResults.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0)}
          </div>
          <div>Error: {levelResults.reduce((acc, r) => acc + r.cost, 0)}</div>
        </>
      )}
    </>
  );
};

export default Play;
