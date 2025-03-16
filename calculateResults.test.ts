import { expect, test } from "vitest";
import { calculateInsertions } from "./calculateResults";

test("perfect score", () => {
  expect(calculateInsertions([1, 2])).toEqual([]);
});

test("two cards", () => {
  expect(calculateInsertions([3, 1])).toEqual([{ from: 1, to: 0, cost: 2 }]);
});

test("three cards", () => {
  expect(calculateInsertions([8, 1, 2])).toEqual([{ from: 0, to: 2, cost: 7 }]);
});

test("three cards - two insertions", () => {
  expect(calculateInsertions([7, 3, 0])).toEqual([
    { cost: 4, from: 1, to: 0 },
    { cost: 7, from: 2, to: 0 },
  ]);
});

test("four cards", () => {
  expect(calculateInsertions([7, 1, 2, 8])).toEqual([
    { from: 0, to: 2, cost: 6 },
  ]);
});

test("four cards - backwards", () => {
  expect(calculateInsertions([1, 2, 4, 3])).toEqual([
    { from: 3, to: 2, cost: 1 },
  ]);
});

test("four cards - forwards", () => {
  expect(calculateInsertions([4, 1, 2, 3])).toEqual([
    { from: 0, to: 3, cost: 3 },
  ]);
});

test("four cards - reversed", () => {
  expect(calculateInsertions([8, 7, 5, 2])).toEqual([
    { from: 1, to: 0, cost: 1 },
    { from: 2, to: 0, cost: 3 },
    { from: 3, to: 0, cost: 6 },
  ]);
});

test("empty array", () => {
  expect(calculateInsertions([])).toEqual([]);
});

test("single element array", () => {
  expect(calculateInsertions([5])).toEqual([]);
});

test("already sorted ascending", () => {
  expect(calculateInsertions([1, 2, 3, 4, 5])).toEqual([]);
});

test("already sorted descending", () => {
  expect(calculateInsertions([5, 4, 3, 2, 1])).toEqual([
    { from: 1, to: 0, cost: 1 },
    { from: 2, to: 0, cost: 2 },
    { from: 3, to: 0, cost: 3 },
    { from: 4, to: 0, cost: 4 },
  ]);
});

test("longer array - mixed insertions", () => {
  const calc = calculateInsertions([5, 1, 4, 2, 8, 0, 3]);
  expect(calc.reduce((acc, r) => acc + r.cost, 0)).toBe(19);
  expect(calc.reduce((acc, r) => acc + Math.abs(r.from - r.to), 0)).toBe(12);
  expect(calc).toEqual([
    { from: 0, to: 3, cost: 4 },
    { from: 2, to: 1, cost: 2 },
    { from: 5, to: 0, cost: 8 },
    { from: 6, to: 3, cost: 5 },
  ]);
});

test("longer array - mostly sorted", () => {
  expect(calculateInsertions([1, 2, 3, 7, 4, 5, 6])).toEqual([
    { from: 3, to: 6, cost: 3 },
  ]);
});

test("longer array - reversed", () => {
  expect(calculateInsertions([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])).toEqual([
    { from: 1, to: 0, cost: 1 },
    { from: 2, to: 0, cost: 2 },
    { from: 3, to: 0, cost: 3 },
    { from: 4, to: 0, cost: 4 },
    { from: 5, to: 0, cost: 5 },
    { from: 6, to: 0, cost: 6 },
    { from: 7, to: 0, cost: 7 },
    { from: 8, to: 0, cost: 8 },
    { from: 9, to: 0, cost: 9 },
  ]);
});

test("near sorted - one swap at the end", () => {
  expect(calculateInsertions([1, 2, 3, 5, 4])).toEqual([
    { from: 4, to: 3, cost: 1 },
  ]);
});

test("near sorted - one swap at the beginning", () => {
  expect(calculateInsertions([2, 1, 3, 4, 5])).toEqual([
    { from: 1, to: 0, cost: 1 },
  ]);
});

test("top commons", () => {
  expect(calculateInsertions([2, 4, 0, 1, 3])).toEqual([
    { from: 1, to: 4, cost: 4 },
    { from: 0, to: 2, cost: 2 },
  ]);
});

test("top commons reversed", () => {
  expect(calculateInsertions([3, 1, 0, 4, 2])).toEqual([
    { cost: 2, from: 1, to: 0 },
    { cost: 3, from: 2, to: 0 },
    { cost: 2, from: 4, to: 2 },
  ]);
});
