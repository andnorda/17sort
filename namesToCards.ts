import dft from "./card-ratings.dft.json";
import { CardRating } from "./cards";

const cards = dft as CardRating[];

export const namesToCards = (cardNames: string[]): CardRating[] => {
  return cardNames.map((name) => {
    const card = cards.find((c) => c.name === name);
    if (!card) throw new Error(`Card not found: ${name}`);
    return card;
  });
};
