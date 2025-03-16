import { cards } from "@/cards";
import { decode, encode } from "@/id";
import Game from "../game";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const initialIds =
    slug.length % 2 === 0
      ? new Array(slug.length / 2)
          .fill(1)
          .map((_, i) => slug.substring(i * 2, i * 2 + 2))
          .map(decode)
      : [85, 212, 15, 198, 42];

  const cardList = initialIds.map(cards);

  return (
    <Game
      cards={cardList}
      next={`/${[...self.crypto.getRandomValues(new Uint32Array(5))]
        .map((n) => n % 271)
        .map((n) => encode(n))
        .join("")}`}
    />
  );
};

export default Page;
