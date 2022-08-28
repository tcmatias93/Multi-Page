/** @type {import('next').NextConfig} */
const sites = {
  site1: {
    locales: {
      ar: {
        title: "Adidas",
        links: [
          {name: "Camiseta Argentina", link: "https://www.adidas.com.ar/camiseta-titular-argentina-22-messi/HL8425.html"},
          {name: "Camiseta River", link: "https://www.adidas.com.ar/camiseta-titular-river-plate-22-23/GB7592.html"},
        ],
      },
    },
    domain: "localhost1",
  },
  site2: {
    locales: {
      ar: {
        title: "Nike",
        links: [
          { name: "Camiseta Atletico madrid", link: "https://www.dexter.com.ar/camiseta-nike-atletico-madrid-2022%2F23-std-home/NI_DM1838-101.html?utm_source=display&utm_medium=nike&utm_campaign=EMEA&utm_campaign=nikeutm-om-atletico-de-madrid&utm_term=22-23&utm_source=nike&utm_medium=web-pdp&utm_content=comprar-2"},
          { name: "camiseta Liverpool", link: "https://www.dexter.com.ar/camiseta-nike-liverpool-fc-2022%2F23-stadium-home/NI_DM1843-609.html?utm_source=display&utm_medium=nike&utm_campaign=EMEA&utm_campaign=nikeutm-om-liverpool-22-23&utm_source=nike&utm_medium=web-pdp&utm_content=comprar-1"},
        ],
      },
    },
    domain: "localhost2",
  },
};

const siteKeys = Object.keys(sites)

const pseudoLocales = ['ar']


const nextConfig = {
  publicRuntimeConfig: {
    sites,
    pseudoLocales
  },

  i18n: {
    locales: siteKeys,
    defaultLocale: siteKeys[0],
    domain: siteKeys.map(siteKey => (
      {
        domain: sites[siteKey].domain,
        defaultLocale: siteKeys
      }
    ))
  },

  redirects: () => (
    [
      {
        source: '/',
        destination: `/${pseudoLocales[0]}`,
        permanent: true,
      }
    ]
  ),

  future: {
    webpack5: true,
  }

};

module.exports = nextConfig;
