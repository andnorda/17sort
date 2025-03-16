import { useEffect, useReducer } from "react";
import { Level } from "./dft/page";
import { calculateInsertions, Insertion } from "@/calculateResults";

const useGameState = (
  levels: Level[]
): {
  currentLevel?: Level;
  levelResults?: Insertion[];
  gameResults?: Insertion[][];
  submit: () => void;
  next: () => void;
  setOrder: (order: number[]) => void;
  reset: () => void;
} => {
  const [state, dispatch] = useReducer(
    (
      state: {
        log: number[][];
        currentLevel?: Level;
        levelResults?: Insertion[];
      },
      action:
        | { type: "init"; log: number[][] }
        | { type: "setOrder"; order: number[] }
        | { type: "submit" }
        | { type: "next" }
    ) => {
      switch (action.type) {
        case "init":
          const currentLevel = levels[action.log.length];
          return {
            log: action.log,
            currentLevel,
          };
        case "setOrder":
          const level = levels[state.log.length];
          return {
            ...state,
            currentLevel: {
              ...level,
              cards: action.order.map(
                (id) => level.cards.find((card) => card.mtga_id === id)!
              ),
            },
          };
        case "submit":
          return {
            ...state,
            log: [
              ...state.log,
              state.currentLevel?.cards.map((c) => c.mtga_id) ?? [],
            ],
            levelResults: calculateInsertions(
              state.currentLevel?.cards
                .map((c) => c.ever_drawn_win_rate * 10)
                .toReversed() ?? []
            ),
          };
        case "next":
          const nextLevel = levels[state.log.length];
          return {
            ...state,
            currentLevel: nextLevel,
            levelResults: undefined,
          };
      }
    },
    {
      log: [],
      currentLevel: undefined,
    }
  );

  useEffect(() => {
    const value = window.localStorage.getItem("game-state");
    dispatch({ type: "init", log: JSON.parse(value ?? "[]") });
  }, []);

  useEffect(() => {
    if (
      state.log.length &&
      JSON.parse(window.localStorage.getItem("game-state") ?? "[]").length !==
        state.log.length
    ) {
      window.localStorage.setItem("game-state", JSON.stringify(state.log));
    }
  });

  return {
    currentLevel: state.currentLevel,
    levelResults: state.levelResults,
    gameResults:
      state.log.length === levels.length
        ? state.log.map((log, i) =>
            calculateInsertions(
              log
                .map(
                  (id) => levels[i].cards.find((card) => card.mtga_id === id)!
                )
                .map((card) => card.ever_drawn_win_rate * 10)
                .toReversed()
            )
          )
        : undefined,

    submit: () => {
      dispatch({ type: "submit" });
    },
    next: () => dispatch({ type: "next" }),
    setOrder: (order) => dispatch({ type: "setOrder", order }),
    reset: () => {
      dispatch({ type: "init", log: [] });
      window.localStorage.removeItem("game-state");
    },
  };
};

export default useGameState;
