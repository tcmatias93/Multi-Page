import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
import styles from "../../styles/Home.module.css";

export default function Home({ pseudoLocale }) {
  const { locale } = useRouter();
  const {
    publicRuntimeConfig: { sites },
  } = getConfig();

  console.log(locale);
  const nextSiteNr = locale === "site2" ? 1 : 2;
  console.log(nextSiteNr);

  const siteAndLocale = sites[locale] && sites[locale].locales[pseudoLocale]


  return (
    <>
      <div className={[styles.main, locale].join(" ")}>
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
            {siteAndLocale.links.map((link) => (
              <li key={link.link}>
                <Link href={link.link}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul> 
          <div>
            <a
              href={`http://localhost${nextSiteNr}:3000/site${nextSiteNr}/${pseudoLocale}`}
            >
              <p>estas en el citio {locale}</p>
              <p>vas ir al sitio {nextSiteNr} </p>
            </a>
          </div>
        </main>
      </div>
    </>
  );
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

export async function getStaticPaths({ locales }) {
  return {
    paths: [{ params: { pseudoLocale: "ar" }, locale: "site1" }],
    fallback: true,
  };
}
