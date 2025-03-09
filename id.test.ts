import { expect, test } from "vitest";
import { decode, encode } from "./id";

test.each([
  [0, "aa"],
  [1, "aw"],
  [23, "wa"],
  [24, "ww"],
  [128, "x2"],
  [271, "5f"],
  [528, "zz"],
])("encode decode %s %s", (id, code) => {
  expect(encode(id)).toBe(code);
  expect(decode(code)).toBe(id);
});

test("encode errors", () => {
  expect(() => encode(529)).toThrow();
  expect(() => encode(-1)).toThrow();
});

test("decode errors", () => {
  expect(() => decode("a")).toThrow();
  expect(() => decode("abc")).toThrow();
  expect(() => decode("!@")).toThrow();
});
