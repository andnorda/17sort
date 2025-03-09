"use client";

import { Card } from "@/cards";
import Image from "next/image";
import { useState } from "react";

const Complete = ({ cards }: { cards: Card[] }) => {
  const [done, setDone] = useState(false);
  return (
    <>
      <button onClick={() => setDone(true)}>Done</button>

      {done && (
        <div style={{ display: "flex" }}>
          {cards
            .sort((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
            .map((card) => (
              <div key={card.url}>
                <Image src={card.url} width={256} height={357} alt="" />
                <p>{card.ever_drawn_win_rate}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Complete;
