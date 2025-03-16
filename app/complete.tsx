"use client";

import { Card } from "@/cards";
import Image from "next/image";
import Link from "next/link";

const Complete = ({
  cards,
  done,
  setDone,
  next,
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
                <div key={card.url}>
                  <Image src={card.url} width={256} height={357} alt="" />
                  <p>{card.ever_drawn_win_rate}</p>
                </div>
              ))}
          </div>
          {typeof next === "string" ? (
            <Link href={next}>Next</Link>
          ) : (
            <button onClick={next}>Next</button>
          )}
        </>
      )}
    </>
  );
};

export default Complete;
