import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const SITE = "https://jettransfer.sk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "JetTransfer — Letiskové transfery Bratislava · Schwechat · Budapešť · Praha",
  description:
    "Prémiová letisková doprava z Bratislavy 24/7. Letisko Bratislava od 25 €, Viedeň–Schwechat od 51 €. Toyota Camry Hybrid, profesionálni vodiči, fixné ceny.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "JetTransfer — Letiskové transfery Bratislava",
    description:
      "Spoľahlivá letisková doprava 24/7. Schwechat, Budapešť, Praha, Brno. Fixné ceny, prémiové vozidlá.",
    url: SITE,
    siteName: "JetTransfer",
    locale: "sk_SK",
    type: "website",
    images: [{ url: "/images/car-front.jpg", width: 1200, height: 630, alt: "JetTransfer — Toyota Camry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JetTransfer — Letiskové transfery Bratislava",
    description: "Letisková doprava 24/7 · Schwechat · Budapešť · Praha · fixné ceny.",
    images: ["/images/car-front.jpg"],
  },
  icons: { icon: "/images/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "JetTransfer",
  url: SITE,
  image: `${SITE}/images/car-front.jpg`,
  telephone: "+421905300120",
  email: "jettransfer@jettransfer.sk",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
