import Image from "next/image";
import Reveal from "./Reveal";
import FleetSlider from "./FleetSlider";
import { t, type Lang } from "@/lib/i18n";
import { FLEET_ICONS } from "./FleetIcons";

const INTERIOR = [
  { src: "/images/interior-1.jpg", altSk: "Kožený interiér Toyota Camry — predné sedadlá", altEn: "Toyota Camry leather interior — front seats" },
  { src: "/images/interior-2.jpg", altSk: "Kožený interiér Toyota Camry — zadné sedadlá", altEn: "Toyota Camry leather interior — rear seats" },
];

export default function Fleet({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  return (
    <section id="vozidlo" className="bg-ink-2/50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <FleetSlider />
          </Reveal>

          <Reveal delay={150}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.fleet.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{d.fleet.h2}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-neutral-300">{d.fleet.lead}</p>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {d.fleet.specs.map((s, i) => {
                const Icon = FLEET_ICONS[i];
                return (
                  <li key={s} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-sm text-neutral-200">
                    <Icon className="h-6 w-6 flex-none text-gold" />
                    {s}
                  </li>
                );
              })}
            </ul>

            <a href="#rezervacia" className="mt-9 inline-block rounded-full bg-gold px-8 py-4 font-semibold text-ink transition hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {d.fleet.cta}
            </a>
          </div>
          </Reveal>
        </div>

        {/* interior photos */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {INTERIOR.map((p, i) => (
            <Reveal key={p.src} delay={i * 140}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={p.src}
                  alt={lang === "sk" ? p.altSk : p.altEn}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
