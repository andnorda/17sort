import { expect, test } from "vitest";
import { calculateInsertions, Insertion } from "./calculateResults";

test.each([
  [[1, 2], []],
  [[3, 1], [{ from: 1, to: 0, cost: 2 }]],
  [[8, 1, 2], [{ from: 0, to: 2, cost: 7 }]],
  [
    [7, 3, 1],
    [
      { cost: 4, from: 1, to: 0 },
      { cost: 6, from: 2, to: 0 },
    ],
  ],
  [[7, 1, 2, 8], [{ from: 0, to: 2, cost: 6 }]],
  [[1, 2, 4, 3], [{ from: 3, to: 2, cost: 1 }]],
  [[4, 1, 2, 3], [{ from: 0, to: 3, cost: 3 }]],
  [
    [8, 7, 5, 2],
    [
      { cost: 1, from: 1, to: 0 },
      { cost: 3, from: 2, to: 0 },
      { cost: 6, from: 3, to: 0 },
    ],
  ],
  [
    [5, 4, 3, 2, 1],
    [
      { from: 1, to: 0, cost: 1 },
      { from: 2, to: 0, cost: 2 },
      { from: 3, to: 0, cost: 3 },
      { from: 4, to: 0, cost: 4 },
    ],
  ],
  [
    [5, 1, 4, 2, 8, 0, 3],
    [
      { cost: 2, from: 3, to: 2 },
      { cost: 4, from: 0, to: 3 },
      { cost: 8, from: 5, to: 0 },
      { cost: 5, from: 6, to: 3 },
    ],
  ],
  [
    [2, 4, 0, 1, 3],
    [
      { from: 1, to: 4, cost: 4 },
      { from: 0, to: 2, cost: 2 },
    ],
  ],
  [
    [3, 1, 0, 4, 2],
    [
      { cost: 2, from: 1, to: 0 },
      { cost: 3, from: 2, to: 0 },
      { cost: 2, from: 4, to: 2 },
    ],
  ],
  [
    [4, 5, 0, 1, 3, 2],
    [
      { from: 5, to: 4, cost: 1 },
      { from: 1, to: 5, cost: 5 },
      { from: 0, to: 4, cost: 4 },
    ],
  ],
  [
    [3, 2, 4, 5, 0, 1],
    [
      { cost: 1, from: 1, to: 0 },
      { cost: 5, from: 4, to: 0 },
      { cost: 4, from: 5, to: 1 },
    ],
  ],
])("%s", (numbers, expected: Insertion[]) => {
  const insertions = calculateInsertions(numbers);
  expect({
    insertions,
    totalCost: insertions.reduce((acc, r) => acc + r.cost, 0),
    totalMoves: insertions.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0),
  }).toEqual({
    insertions: expected,
    totalCost: expected.reduce((acc, r) => acc + r.cost, 0),
    totalMoves: expected.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0),
  });
});
