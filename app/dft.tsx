"use client";

import Game from "@/app/game";
import React from "react";
import useGameState from "./useGameState";
import { Level } from "./dft/page";
import { encode } from "@/id";

const Dft = ({ levels }: { levels: Level[] }) => {
  const {
    currentLevel,
    levelResults,
    gameResults,
    submit,
    next,
    setOrder,
    reset,
  } = useGameState(levels);

  if (!levelResults && gameResults) {
    return (
      <div>
        <h1>Game Over</h1>
        <button onClick={reset}>Play again</button>
        <a
          href={`/dft/${[...self.crypto.getRandomValues(new Uint32Array(5))]
            .map((n) => n % 271)
            .map((n) => encode(n))
            .join("")}`}
        >
          Play random level
        </a>
        <div>Total score</div>
        <div>
          Swaps:{" "}
          {gameResults.reduce(
            (acc, level) =>
              acc + level.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0),
            0
          )}
        </div>
        <div>
          Error:{" "}
          {gameResults.reduce(
            (acc, level) =>
              acc + level.reduce((acc, r) => acc + r.cost, 0) / 10,
            0
          )}
        </div>
        <div>
          {gameResults.map((level, i) => (
            <div key={i}>
              <h2>Level {i + 1}</h2>
              <div>
                Swaps:{" "}
                {level.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0)}
              </div>
              <div>Error: {level.reduce((acc, r) => acc + r.cost, 0) / 10}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentLevel) return null;

  const tot = levelResults?.reduce((acc, r) => acc + r.cost, 0);

  console.log(levelResults);

  return (
    <>
      <Game
        cards={currentLevel.cards}
        setOrder={setOrder}
        done={!!levelResults}
        setDone={submit}
        next={next}
      />
      {levelResults && (
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
          <button onClick={next}>Next</button>
        </>
      )}
    </>
  );
};

export default Dft;
