import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";

export async function getStaticPaths({ locales }) {
  return {
    paths: [{ params: { pseudoLocale: "ar" }, locale: "site1" }],
    fallback: true,
  };
}

export async function getStaticProps({
  params: { pseudoLocale = "ar" },
  locale = "site1",
}) {
  return {
    props: {
      pseudoLocale,
    },
    revalidate: 60,
  };
}

export default function Home({ pseudoLocale }) {
  const { locales, locale } = useRouter();
  const {
    publicRuntimeConfig: { sites, pseudoLocales },
  } = getConfig();

  const nextLocale = pseudoLocales.find(
    (otherLocale) => otherLocale !== pseudoLocale
  );
  const nextSiteNr = locale === "site2" ? 1 : 2;
  console.log(nextSiteNr);

  const siteAndLocale = sites[locale] && sites[locale].locales[pseudoLocale];

  console.log(siteAndLocale);

  return (
    <>
      <Head>
        <title>Multi dominio Prueba</title>
      </Head>

      <main>
        <h1>
          {siteAndLocale
            ? siteAndLocale.title
            : `el sitio ${locale} no funciona`}{" "}
        </h1>
        <ul>
            {siteAndLocale.link.map((link) => (
              <li key={link}>
                <Link href={link}>
                  <a>{link}</a>
                </Link>
              </li>
            ))}
          </ul>

        <div>
          <a href={`http://localhost${nextSiteNr}:3000/site${nextSiteNr}/${pseudoLocale}`}>
            <p>estas en el citio {locale}</p>
            <p>vas ir al sitio {nextSiteNr} </p>
          </a>
        </div>
      </main>
    </>
  );
}