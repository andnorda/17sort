import dft from "./card-ratings.dft.json";
import { encode } from "./id";

const {
  mythic = [],
  rare = [],
  uncommon = [],
  common = [],
} = Object.groupBy(
  dft.filter((c) => (c.ever_drawn_win_rate ?? 0) > 0.3 && c.mtga_id <= 95073),
  (c) => c.rarity
);

export const generateNewLevel = () => {
  const r = [...mythic, ...rare, ...rare].map((c) => c.mtga_id - 94802);
  const u = uncommon.map((c) => c.mtga_id - 94802);
  const c = common.map((c) => c.mtga_id - 94802);
  const first = r[Math.floor(Math.random() * r.length)];
  const second = u[Math.floor(Math.random() * u.length)];
  const third = u.toSpliced(u.indexOf(second), 1)[
    Math.floor(Math.random() * u.length - 1)
  ];
  const fourth = c[Math.floor(Math.random() * c.length)];
  const fifth = c.toSpliced(c.indexOf(fourth), 1)[
    Math.floor(Math.random() * c.length - 1)
  ];
  return [first, second, third, fourth, fifth].map(encode);
};
