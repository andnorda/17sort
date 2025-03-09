import { expect, test } from "vitest";
import dft from "./card-ratings.dft.json";

const cards = (id: number) => {
  const card = dft.find((c) => c.mtga_id - 94802 === id);

  if (!card) {
    throw new Error("invalid id");
  }

  return (["url", "ever_drawn_win_rate"] as const).reduce(
    (acc, key) => ({ ...acc, [key]: card[key] }),
    {}
  );
};

test("first card", () => {
  expect(cards(1)).toEqual({
    url: "https://cards.scryfall.io/large/front/d/7/d77c8e29-de24-4664-baf8-959608dd99ca.jpg?1738356103",
    ever_drawn_win_rate: 0.5119831223628692,
  });
});

test("last card", () => {
  expect(cards(271)).toEqual({
    url: "https://cards.scryfall.io/large/front/8/8/882969d8-7e3e-4f32-858a-00da20c67b83.jpg?1738356981",
    ever_drawn_win_rate: 0.5221048696139826,
  });
});

test("errors", () => {
  expect(() => cards(0)).toThrow();
  expect(() => cards(272)).toThrow();
});
