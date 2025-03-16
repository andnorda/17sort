import dft from "@/card-ratings.dft.json";
import { Card, CardRating, cards } from "@/cards";
import { namesToCards } from "@/namesToCards";
import Dft from "../dft";

export interface Level {
  description: string;
  cards: Card[];
}

const cs = dft as CardRating[];

const Page = () => {
  return (
    <Dft
      levels={[
        {
          description: "Javier Dominguez PT p1p1",
          cards: namesToCards([
            "Monument to Endurance",
            "Boom Scholar",
            "Ride's End",
            "Wreckage Wickerfolk",
            "Spectral Interference",
          ]),
        },
        {
          description: "Ben Stark PT p1p1",
          cards: namesToCards([
            "Bulwark Ox",
            "Guidelight Pathmaker",
            "Migrating Ketradon",
            "Gloryheath Lynx",
            "Greenbelt Guardian",
          ]),
        },
        {
          description: "Top commons",
          cards: cs
            .filter((c) => c.rarity === "common")
            .toSorted((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
            .slice(0, 5)
            .toSorted((a, b) => a.name.localeCompare(b.name)),
        },
        {
          description: "Top red commons",
          cards: cs
            .filter(
              (c) =>
                c.rarity === "common" && c.color === "R" && c.mtga_id <= 95073
            )
            .toSorted((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
            .slice(0, 5)
            .toSorted((a, b) => a.name.localeCompare(b.name)),
        },
        {
          description: "Top uncommons",
          cards: cs
            .filter((c) => c.rarity === "uncommon")
            .toSorted((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
            .slice(0, 5)
            .toSorted((a, b) => a.name.localeCompare(b.name)),
        },

        {
          description: "Top common of each color",
          cards: "WUBRG"
            .split("")
            .map(
              (color) =>
                cs
                  .filter((c) => c.rarity === "common" && c.color === color)
                  .toSorted(
                    (a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate
                  )[0]
            ),
        },
        {
          description: "Top colors",
          cards: namesToCards([
            "Country Roads",
            "Reef Roads",
            "Foul Roads",
            "Rocky Roads",
            "Wild Roads",
          ]),
        },
        {
          description: "Duals",
          cards: namesToCards([
            "Swiftwater Cliffs",
            "Jungle Hollow",
            "Tranquil Cove",
            "Wind-Scarred Crag",
            "Dismal Backwater",
          ]),
        },
      ].map((level) => ({
        ...level,
        cards: level.cards.map((c) => cards(c.mtga_id - 94802)),
      }))}
    />
  );
};

export default Page;
