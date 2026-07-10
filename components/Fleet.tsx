import Image from "next/image";
import Reveal from "./Reveal";

const SPECS = [
  { label: "4 pasažieri", icon: "👤" },
  { label: "Hybrid", icon: "⚡" },
  { label: "Automat", icon: "⚙" },
  { label: "Kožený interiér", icon: "✦" },
  { label: "Klimatizácia", icon: "❄" },
  { label: "Plne poistené", icon: "✓" },
];

export default function Fleet() {
  return (
    <section id="vozidlo" className="bg-ink-2/50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <Image src="/images/car-front.jpg" alt="Toyota Camry Hybrid — JetTransfer" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl shadow-black/50 sm:block">
              <Image src="/images/car-interior.webp" alt="Kožený interiér vozidla" width={448} height={300} className="object-cover" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Vozidlo</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">Toyota Camry Hybrid</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-neutral-300">
            Cestujte v tichu a pohodlí. Priestranná limuzína s koženým interiérom,
            plnou klimatizáciou a hybridným pohonom — pokojná jazda na letisko,
            pri ktorej si ešte stihnete oddýchnuť.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SPECS.map((s) => (
              <li key={s.label} className="rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-sm text-neutral-200">
                <span className="mr-2 text-gold">{s.icon}</span>
                {s.label}
              </li>
            ))}
          </ul>

          <a href="#rezervacia" className="mt-9 inline-block rounded-full bg-gold px-8 py-4 font-semibold text-ink transition hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
            Objednať transfer
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
