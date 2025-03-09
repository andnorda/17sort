import Image from "next/image";
import { cards } from "@/cards";
import { decode } from "@/id";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const ids =
    slug.length % 2 === 0 && slug.length > 0
      ? new Array(slug.length / 2)
          .fill(1)
          .map((_, i) => slug.substring(i * 2, i * 2 + 2))
          .map(decode)
      : [85, 212, 15, 198, 42];
  return (
    <>
      {ids.map(cards).map((card) => (
        <Image src={card.url} key={card.url} width="256" height="357" alt="" />
      ))}
    </>
  );
};

export default Page;
