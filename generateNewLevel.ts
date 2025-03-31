import dft from "./card-ratings.dft.json";
import { Card, cards } from "./cards";
import { encode } from "./id";

const cs = dft
  .filter((c) => (c.ever_drawn_win_rate ?? 0) > 0.3 && c.mtga_id <= 95073)
  .map((c) => cards(c.mtga_id - 94802));

export const generateNewLevel = () => {
  let res: Card[] = [];
  while (res.length < 5) {
    const c = cs[Math.floor(Math.random() * cs.length)];
    if (res.every((r) => r.ever_drawn_win_rate !== c.ever_drawn_win_rate)) {
      res = [...res, c];
    }
  }
  return res.map((c) => c.mtga_id - 94802).map(encode);
};
