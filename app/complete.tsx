"use client";

import { Card } from "@/cards";
import Image from "next/image";

const Complete = ({
  cards,
  done,
  setDone,
}: {
  cards: Card[];
  done: boolean;
  setDone: () => void;
  next: string | (() => void);
}) => {
  return (
    <>
      {!done ? (
        <button onClick={setDone}>Done</button>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            {cards
              .toSorted((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
              .map((card) => (
                <div key={card.url} style={{ position: "relative" }}>
                  <Image src={card.url} width={256} height={357} alt="" />
                  <p
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: "50%",
                      transform: "translate(-50%)",
                      fontSize: "4.5rem",
                      textShadow: "0 0 4px var(--black)",
                    }}
                  >
                    {card.ever_drawn_win_rate.toFixed(1)}%
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Complete;
