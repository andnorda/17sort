import { cards } from "@/cards";
import { decode } from "@/id";
import Play from "./play";
import { generateNewLevel } from "@/generateNewLevel";

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

  return <Play cards={cardList} next={`/dft/${generateNewLevel().join("")}`} />;
};

export default Page;
