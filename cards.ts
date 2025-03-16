import dft from "./card-ratings.dft.json";

export interface Card {
  ever_drawn_win_rate: number;
  mtga_id: number;
  url: string;
}

export interface CardRating {
  seen_count: number;
  avg_seen: number;
  pick_count: number;
  avg_pick: number;
  game_count: number;
  pool_count: number;
  play_rate: number;
  win_rate: number;
  opening_hand_game_count: number;
  opening_hand_win_rate: number;
  drawn_game_count: number;
  drawn_win_rate: number;
  ever_drawn_game_count: number;
  ever_drawn_win_rate: number;
  never_drawn_game_count: number;
  never_drawn_win_rate: number;
  drawn_improvement_win_rate: number;
  name: string;
  mtga_id: number;
  color:
    | "W"
    | "U"
    | "B"
    | "R"
    | "G"
    | ""
    | "WU"
    | "WB"
    | "WR"
    | "WG"
    | "UB"
    | "UR"
    | "UG"
    | "BR"
    | "BG"
    | "RG"
    | "WUB"
    | "WUR"
    | "WUG"
    | "WBR"
    | "WBG"
    | "WRG"
    | "UBR"
    | "UBG"
    | "URG"
    | "BRG"
    | "WUBR"
    | "WUBG"
    | "WURG"
    | "WBRG"
    | "UBRG"
    | "WUBRG";
  rarity: "common" | "uncommon" | "rare" | "mythic";
  url: string;
  url_back: string;
  types: string[];
  layout: string;
}

export const cards = (id: number): Card => {
  const card = dft.find((c) => c.mtga_id - 94802 === id);

  if (!card) {
    throw new Error(`invalid id ${id}`);
  }

  return {
    url: card.url,
    ever_drawn_win_rate: card.ever_drawn_win_rate ?? -1,
    mtga_id: card.mtga_id,
  };
};
