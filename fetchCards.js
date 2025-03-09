import { writeFileSync } from "fs";

const cards = [];

let has_more = true;
let next_page =
  "https://api.scryfall.com/cards/search?q=e%3Adft+cn≥1+cn≤291&unique=prints";

while (has_more) {
  const res = await fetch(next_page).then((res) => res.json());
  has_more = res.has_more;
  next_page = res.next_page;
  cards.push(...res.data);
}

writeFileSync("cards.dft.json", JSON.stringify(cards));
