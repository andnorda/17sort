import dft from "./card-ratings.dft.json";

export interface Card {
  url: string;
  ever_drawn_win_rate: number;
}

export const cards = (id: number): Card => {
  const card = dft.find((c) => c.mtga_id - 94802 === id);

  if (!card) {
    throw new Error(`invalid id ${id}`);
  }

  return {
    url: card.url,
    ever_drawn_win_rate: card.ever_drawn_win_rate ?? -1,
  };
};
