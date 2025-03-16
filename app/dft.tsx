"use client";

import Game from "@/app/game";
import React from "react";
import useGameState from "./useGameState";
import { Level } from "./page";

const Dft = ({ levels }: { levels: Level[] }) => {
  const [
    { currentLevel, levelResults, gameResults },
    { submit, next, setOrder },
  ] = useGameState(levels);

  if (gameResults) {
    console.log("here", gameResults);
    return (
      <div>
        <h1>Game Over</h1>
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
            (acc, level) => acc + level.reduce((acc, r) => acc + r.cost, 0),
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
              <div>Error: {level.reduce((acc, r) => acc + r.cost, 0)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentLevel) return null;

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

export default Dft;
