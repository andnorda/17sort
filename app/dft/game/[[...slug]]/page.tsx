import Game from "@/app/game";
import dft from "@/card-ratings.dft.json";
import { Card } from "@/cards";
import { namesToCards } from "@/namesToCards";

const cards = dft as Card[];

const Page = async ({ params }: { params: Promise<{ slug?: string[] }> }) => {
  const { slug } = await params;

  return <Game {...game(slug?.at(0))} />;
};

export default Page;

const game = (slug: string | undefined) => {
  switch (slug) {
    default:
      return {
        cards: namesToCards([
          "Ride's End",
          "Monument to Endurance",
          "Wreckage Wickerfolk",
          "Boom Scholar",
          "Spectral Interference",
        ]),
        next: "/dft/game/1",
      };
    case "1":
      return {
        cards: namesToCards([
          "Bulwark Ox",
          "Guidelight Pathmaker",
          "Migrating Ketradon",
          "Gloryheath Lynx",
          "Greenbelt Guardian",
        ]),
        next: "/dft/game/2",
      };
    case "2":
      return {
        cards: cards
          .filter((c) => c.rarity === "common")
          .sort((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
          .slice(0, 5)
          .sort((a, b) => a.name.localeCompare(b.name)),
        next: "/dft/game/3",
      };
    case "3":
      return {
        cards: cards
          .filter(
            (c) =>
              c.rarity === "common" && c.color === "R" && c.mtga_id <= 95073
          )
          .sort((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
          .slice(0, 5)
          .sort((a, b) => a.name.localeCompare(b.name)),
        next: "/dft/game/4",
      };
    case "4":
      return {
        cards: cards
          .filter((c) => c.rarity === "uncommon")
          .sort((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate)
          .slice(0, 5)
          .sort((a, b) => a.name.localeCompare(b.name)),
        next: "/dft/game/5",
      };
    case "5":
      return {
        cards: namesToCards([
          "Country Roads",
          "Reef Roads",
          "Foul Roads",
          "Rocky Roads",
          "Wild Roads",
        ]),
        next: "/dft/game/6",
      };
    case "6":
      return {
        cards: namesToCards([
          "Swiftwater Cliffs",
          "Jungle Hollow",
          "Tranquil Cove",
          "Wind-Scarred Crag",
          "Dismal Backwater",
        ]),
        next: "/dft/game/7",
      };
    case "7":
      return {
        cards: "WUBRG"
          .split("")
          .map(
            (color) =>
              cards
                .filter((c) => c.rarity === "common" && c.color === color)
                .sort(
                  (a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate
                )[0]
          ),
        next: "/dft/game/8",
      };
  }
};
