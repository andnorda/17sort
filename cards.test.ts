import { expect, test } from "vitest";
import dft from "./cards.dft.json";

const cards = (id: number) => {
  const card = dft.find((c) => Number(c.collector_number) === id);

  if (!card || card.type_line.startsWith("Basic Land")) {
    throw new Error("invalid id");
  }

  return {
    name: card.name,
    image: card.image_uris.large,
    arena_id: card.arena_id,
  };
};

test("first card", () => {
  expect(cards(1)).toEqual({
    name: "Air Response Unit",
    image:
      "https://cards.scryfall.io/large/front/d/7/d77c8e29-de24-4664-baf8-959608dd99ca.jpg?1738356103",
    arena_id: 94803,
  });
});

test("last card", () => {
  expect(cards(271)).toEqual({
    name: "Wind-Scarred Crag",
    image:
      "https://cards.scryfall.io/large/front/8/8/882969d8-7e3e-4f32-858a-00da20c67b83.jpg?1738356981",
    arena_id: 95073,
  });
});

test("errors", () => {
  expect(() => cards(0)).toThrow();
  expect(() => cards(272)).toThrow();
});
