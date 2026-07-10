import Image from "next/image";

const AIRPORTS = [
  { name: "Letisko Bratislava", href: "https://www.bts.aero" },
  { name: "Letisko Viedeň – Schwechat", href: "https://www.viennaairport.com" },
  { name: "Letisko Budapešť", href: "https://www.bud.hu" },
  { name: "Letisko Praha", href: "https://www.prg.aero" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-white/10 bg-ink-2/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image src="/Color-logo-with-background-Photoroom-removebg-preview.png" alt="JetTransfer" width={700} height={152} className="h-10 w-auto" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
            Prémiová letisková doprava z Bratislavy — Schwechat, Budapešť, Praha a Brno.
            Fixné ceny, profesionálni vodiči, k dispozícii 24/7.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Kontakt</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="tel:+421905300120" className="text-neutral-200 hover:text-gold">+421 905 300 120</a></li>
            <li><a href="mailto:jettransfer@jettransfer.sk" className="text-neutral-200 hover:text-gold">jettransfer@jettransfer.sk</a></li>
            <li className="text-neutral-400">Bratislava · dostupní 24/7</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Letiská online</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {AIRPORTS.map((a) => (
              <li key={a.name}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-gold">{a.name} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-neutral-500 sm:px-8">
          <p>© {new Date().getFullYear()} JetTransfer. Všetky práva vyhradené.</p>
          <a href="/ochrana-osobnych-udajov" className="hover:text-gold">Ochrana osobných údajov</a>
        </div>
      </div>
    </footer>
  );
}
