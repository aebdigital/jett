import Image from "next/image";
import Reveal from "./Reveal";

const REASONS = [
  { icon: "/icons/quality.png", title: "Kvalitné vozidlá", text: "Udržiavaná Toyota Camry Hybrid s koženým interiérom a klimatizáciou." },
  { icon: "/icons/always.png", title: "Dostupnosť 24/7", text: "Skorý ranný odlet aj polnočný prílet — sme na ceste vtedy, keď potrebujete vy." },
  { icon: "/icons/speed.png", title: "Rýchly transport", text: "Priama cesta bez zastávok a čakania. Sledujeme váš let a prispôsobíme sa meškaniu." },
  { icon: "/icons/safety.png", title: "Vysoká bezpečnosť", text: "Plne poistené vozidlo a pokojný jazdný štýl. Vaša cesta, náš záväzok." },
  { icon: "/icons/price.png", title: "Najlepšie ceny", text: "Fixné ceny bez taxametra a skrytých poplatkov — cenu poznáte vopred." },
  { icon: "/icons/drivers.png", title: "Profesionálni vodiči", text: "Skúsení, diskrétni a vždy načas. Po ceste sa o vás postaráme." },
];

export default function WhyUs() {
  return (
    <section id="sluzby" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Prečo JetTransfer</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-5xl">
          Každá cesta má byť tá najpohodlnejšia
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={(i % 3) * 120}>
            <div className="group h-full rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:border-gold/50">
              <span className="inline-grid h-14 w-14 place-items-center rounded-xl bg-gold/10 ring-1 ring-gold/25 transition group-hover:bg-gold/15">
                <Image src={r.icon} alt="" width={44} height={44} className="h-9 w-auto object-contain" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-gold-2">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{r.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
