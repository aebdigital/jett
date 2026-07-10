import Image from "next/image";
import Reveal from "./Reveal";
import { t, type Lang } from "@/lib/i18n";
import { getRoutes, routeLabel, routeNote } from "@/lib/cms";

const SURCHARGES_SK: [string, string][] = [
  ["Devín a Devínska Nová Ves", "+10 €"],
  ["Rača", "+7 €"],
  ["Dolné Hony · Vrakuňa · Biskupice", "+5 €"],
  ["Trnávka · Ružinov", "+5 €"],
  ["Dúbravka", "+5 €"],
  ["Každá ďalšia adresa v objednávke", "+3 €"],
];
const SURCHARGES_EN: [string, string][] = [
  ["Devín & Devínska Nová Ves", "+€10"],
  ["Rača", "+€7"],
  ["Dolné Hony · Vrakuňa · Biskupice", "+€5"],
  ["Trnávka · Ružinov", "+€5"],
  ["Dúbravka", "+€5"],
  ["Each additional address per booking", "+€3"],
];

export default async function Pricing({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const routes = await getRoutes();
  const surcharges = lang === "sk" ? SURCHARGES_SK : SURCHARGES_EN;

  return (
    <section id="cennik" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.pricing.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-5xl">{d.pricing.h2}</h2>
        <p className="mt-4 max-w-xl text-neutral-400">{d.pricing.lead}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((r, i) => (
          <Reveal key={routeLabel(r, lang)} delay={(i % 3) * 120} className="h-full">
          <div
            className={`group relative h-full overflow-hidden rounded-2xl border transition hover:-translate-y-1 ${r.featured ? "border-gold/60 bg-ink-2 shadow-lg shadow-gold/10" : "border-white/10 bg-ink-2"}`}
          >
            <div className="relative h-44 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <Image src={r.image} alt={routeLabel(r, lang)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
              </div>
              {r.featured && (
                <span className="absolute left-4 top-4 rounded-md bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">{d.pricing.featured}</span>
              )}
            </div>
            <div className="flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="text-lg font-semibold text-white">{routeLabel(r, lang)}</h3>
                {routeNote(r, lang) && <p className={`mt-1 text-xs ${r.featured ? "text-gold-2" : "text-neutral-400"}`}>{routeNote(r, lang)}</p>}
              </div>
              <span className="whitespace-nowrap text-2xl font-bold text-gold">{r.price}</span>
            </div>
          </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal className="h-full">
        <div className="h-full rounded-2xl border border-white/10 bg-ink-2 p-6">
          <h3 className="text-base font-semibold text-white">{d.pricing.surchargesTitle}</h3>
          <ul className="mt-4 space-y-2.5">
            {surcharges.map(([zone, fee]) => (
              <li key={zone} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2.5 text-sm">
                <span className="text-neutral-300">{zone}</span>
                <span className="font-semibold text-gold-2">{fee}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-500">{d.pricing.surchargesNote}</p>
        </div>
        </Reveal>

        <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink-3 p-6">
            <h3 className="text-base font-semibold text-gold-2">{d.pricing.discountTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{d.pricing.discountText}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-2 p-6">
            <h3 className="text-base font-semibold text-white">{d.pricing.parkingTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>{d.pricing.parkingArrival}</span><span className="font-semibold text-gold-2">6 €</span></li>
              <li className="flex justify-between"><span>{d.pricing.parkingDeparture}</span><span className="font-semibold text-gold-2">3 €</span></li>
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
