import { writeFileSync } from "fs";
fetch(
  "https://www.17lands.com/card_ratings/data?expansion=dft&format=premierdraft"
)
  .then((res) => res.json())
  .then((data) => writeFileSync("card-ratings.dft.json", JSON.stringify(data)));
