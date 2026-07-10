import type { Lang } from "./i18n";

const SITE = "https://jettransfer.sk";

export function taxiJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "JetTransfer — Bratislava Schwechat taxi",
    url: lang === "sk" ? SITE : `${SITE}/en`,
    inLanguage: lang,
    image: `${SITE}/images/car-front.jpg`,
    telephone: "+421905300120",
    email: "jettransfer@jettransfer.sk",
    address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
    areaServed: ["Bratislava", "Wien Schwechat", "Budapest", "Praha", "Brno"],
    availableLanguage: ["sk", "en"],
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export const SITE_URL = SITE;
