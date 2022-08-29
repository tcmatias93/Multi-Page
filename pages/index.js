import { useRouter } from "next/router";
import getConfig from "next/config";
import Link from "next/link";

export default function Home({ pseudoLocale }) {
  const { locales } = useRouter();

  console.log(locales);

  return (
    <>
      <Link href={`http://localhost1:3001/site1/ar`}>
        <a>Adidas</a>
      </Link>
    </>
  );
}
