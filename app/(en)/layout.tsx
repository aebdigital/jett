import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import { taxiJsonLd, SITE_URL } from "@/lib/jsonld";
import SmoothScroll from "@/components/SmoothScroll";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bratislava Airport Taxi | Vienna Schwechat Transfers 24/7 — JetTransfer",
  description:
    "Reliable airport transfers from Bratislava 24/7. Bratislava Airport from €25, Vienna–Schwechat from €51, Budapest and Prague. Toyota Camry Hybrid, fixed prices, professional drivers.",
  keywords: ["Bratislava airport taxi", "Vienna Schwechat transfer", "Bratislava to Vienna airport", "airport transfer Bratislava", "taxi Bratislava Schwechat"],
  alternates: { canonical: "/en", languages: { sk: "/", en: "/en", "x-default": "/" } },
  openGraph: {
    title: "Bratislava Airport Taxi — JetTransfer",
    description:
      "Reliable airport transfers from Bratislava 24/7. Schwechat, Budapest, Prague, Brno. Fixed prices, premium vehicles.",
    url: `${SITE_URL}/en`,
    siteName: "JetTransfer",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/car-front.jpg", width: 1200, height: 630, alt: "JetTransfer — Toyota Camry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bratislava Airport Taxi — JetTransfer",
    description: "Airport transfers 24/7 · Schwechat · Budapest · Prague · fixed prices.",
    images: ["/images/car-front.jpg"],
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiJsonLd("en")) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
