import Image from "next/image";
import { t, type Lang } from "@/lib/i18n";

const AIRPORTS = [
  { name: "Letisko Bratislava", nameEn: "Bratislava Airport", href: "https://www.bts.aero" },
  { name: "Letisko Viedeň – Schwechat", nameEn: "Vienna Airport – Schwechat", href: "https://www.viennaairport.com" },
  { name: "Letisko Budapešť", nameEn: "Budapest Airport", href: "https://www.bud.hu" },
  { name: "Letisko Praha", nameEn: "Prague Airport", href: "https://www.prg.aero" },
];

export default function Footer({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  return (
    <footer id="kontakt" className="border-t border-white/10 bg-ink-2/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image src="/Color-logo-with-background-Photoroom-removebg-preview.png" alt="JetTransfer" width={700} height={152} className="h-10 w-auto" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">{d.footer.about}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">{d.footer.contact}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="tel:+421905300120" className="text-neutral-200 hover:text-gold">+421 905 300 120</a></li>
            <li><a href="mailto:jettransfer@jettransfer.sk" className="text-neutral-200 hover:text-gold">jettransfer@jettransfer.sk</a></li>
            <li className="text-neutral-400">{d.footer.available}</li>
            <li><a href={lang === "sk" ? "/blog" : "/en/blog"} className="text-neutral-200 hover:text-gold">{d.footer.blog}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">{d.footer.airports}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {AIRPORTS.map((a) => (
              <li key={a.href}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-gold">
                  {lang === "sk" ? a.name : a.nameEn} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-neutral-500 sm:px-8">
          <p>© {new Date().getFullYear()} JetTransfer. {d.footer.rights}</p>
          <a href="/ochrana-osobnych-udajov" className="hover:text-gold">{d.footer.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
