import Image from "next/image";
import Reveal from "./Reveal";

const ROUTES = [
  { to: "Letisko Bratislava (BTS)", price: "25 €", img: "/images/airport-bratislava.webp", note: "cca 20 min z centra" },
  { to: "Letisko Viedeň – Schwechat", price: "57 €", img: "/images/airport-schwechat.webp", note: "AKCIA 51 € pri objednávke 2 týždne vopred", featured: true },
  { to: "Viedeň centrum", price: "85 €", img: "/images/vienna-centrum.jpg", note: "priamo na vašu adresu" },
  { to: "Letisko Brno", price: "135 €", img: "/images/airport-brno.jpg", note: "" },
  { to: "Letisko Budapešť", price: "215 €", img: "/images/airport-budapest.webp", note: "" },
  { to: "Letisko Praha", price: "325 €", img: "/images/airport-praha.webp", note: "" },
];

const SURCHARGES = [
  ["Devín a Devínska Nová Ves", "+10 €"],
  ["Rača", "+7 €"],
  ["Dolné Hony · Vrakuňa · Biskupice", "+5 €"],
  ["Trnávka · Ružinov", "+5 €"],
  ["Dúbravka", "+5 €"],
  ["Každá ďalšia adresa v objednávke", "+3 €"],
];

export default function Pricing() {
  return (
    <section id="cennik" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Cenník</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-5xl">
          Fixné ceny. Žiadne prekvapenia.
        </h2>
        <p className="mt-4 max-w-xl text-neutral-400">
          Cena, ktorú vidíte, je cena, ktorú platíte — vrátane diaľnice a paliva.
          Odchod z Bratislavy centra, max. 4 pasažieri.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((r, i) => (
          <Reveal key={r.to} delay={(i % 3) * 120} className="h-full">
          <div
            className={`group relative h-full overflow-hidden rounded-2xl border transition hover:-translate-y-1 ${r.featured ? "border-gold/60 bg-ink-2 shadow-lg shadow-gold/10" : "border-white/10 bg-ink-2"}`}
          >
            <div className="relative h-44 overflow-hidden">
              {/* image + gradient scale together so the shade always stays glued to the photo */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <Image src={r.img} alt={r.to} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
              </div>
              {r.featured && (
                <span className="absolute left-4 top-4 rounded-md bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">Najžiadanejšie</span>
              )}
            </div>
            <div className="flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="text-lg font-semibold text-white">{r.to}</h3>
                {r.note && <p className={`mt-1 text-xs ${r.featured ? "text-gold-2" : "text-neutral-400"}`}>{r.note}</p>}
              </div>
              <span className="text-2xl font-bold text-gold">{r.price}</span>
            </div>
          </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal className="h-full">
        <div className="h-full rounded-2xl border border-white/10 bg-ink-2 p-6">
          <h3 className="text-base font-semibold text-white">Príplatky mimo centra Bratislavy</h3>
          <ul className="mt-4 space-y-2.5">
            {SURCHARGES.map(([zone, fee]) => (
              <li key={zone} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2.5 text-sm">
                <span className="text-neutral-300">{zone}</span>
                <span className="font-semibold text-gold-2">{fee}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-500">Iné lokality po dohode. Veľkú batožinu prosím uveďte v objednávke.</p>
        </div>
        </Reveal>

        <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink-3 p-6">
            <h3 className="text-base font-semibold text-gold-2">Zľava pri platbe v hotovosti alebo prevodom</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              Pri platbe v hotovosti alebo prevodom na účet získate zľavu <b className="text-white">1 – 5 €</b> podľa cieľa cesty.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-2 p-6">
            <h3 className="text-base font-semibold text-white">Parkovanie na Schwechate</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Vyzdvihnutie pri prílete</span><span className="font-semibold text-gold-2">6 €</span></li>
              <li className="flex justify-between"><span>Pristavenie pri odlete</span><span className="font-semibold text-gold-2">3 €</span></li>
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
