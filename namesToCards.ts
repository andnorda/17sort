import dft from "./card-ratings.dft.json";
import { Card, CardRating } from "./cards";

const cs = dft as CardRating[];

export const namesToCards = (cardNames: string[]): Card[] => {
  return cardNames.map((name) => {
    const card = cs.find((c) => c.name === name);
    if (!card) throw new Error(`Card not found: ${name}`);
    return card;
  });
};
