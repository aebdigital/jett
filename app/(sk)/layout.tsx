import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import { taxiJsonLd, SITE_URL } from "@/lib/jsonld";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bratislava Schwechat taxi | Letisková doprava Bratislava 24/7 — JetTransfer",
  description:
    "Bratislava Schwechat taxi a spoľahlivá letisková doprava z Bratislavy 24/7. Letisko Bratislava od 25 €, Viedeň–Schwechat od 51 €, Budapešť aj Praha. Toyota Camry Hybrid, fixné ceny.",
  keywords: ["Bratislava Schwechat taxi", "letisková doprava Bratislava", "taxi letisko Schwechat", "transfer Bratislava Viedeň", "taxi letisko Bratislava"],
  alternates: { canonical: "/", languages: { sk: "/", en: "/en", "x-default": "/" } },
  openGraph: {
    title: "Bratislava Schwechat taxi — JetTransfer",
    description:
      "Spoľahlivá letisková doprava z Bratislavy 24/7. Schwechat, Budapešť, Praha, Brno. Fixné ceny, prémiové vozidlá.",
    url: SITE_URL,
    siteName: "JetTransfer",
    locale: "sk_SK",
    type: "website",
    images: [{ url: "/images/car-front.jpg", width: 1200, height: 630, alt: "JetTransfer — Toyota Camry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bratislava Schwechat taxi — JetTransfer",
    description: "Letisková doprava 24/7 · Schwechat · Budapešť · Praha · fixné ceny.",
    images: ["/images/car-front.jpg"],
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiJsonLd("sk")) }} />
        <SmoothScroll />
        <CookieConsent lang="sk" />
        {children}
      </body>
    </html>
  );
}
