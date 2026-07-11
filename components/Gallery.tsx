import Image from "next/image";
import Reveal from "./Reveal";
import { t, type Lang } from "@/lib/i18n";

// The exact six photos the client picked for the Galéria section on his site,
// in the same order.
const PHOTOS = [
  { src: "/images/car-street.jpg", alt: "Vozidlo JetTransfer v uliciach Bratislavy" },
  { src: "/images/car-cutout-1.png", alt: "Toyota Camry — JetTransfer" },
  { src: "/images/car-showroom.jpg", alt: "Toyota Camry pripravená na letiskový transfer" },
  { src: "/images/car-detail-1.jpg", alt: "Detail vozidla JetTransfer" },
  { src: "/images/car-park.jpg", alt: "Toyota Camry na parkovisku" },
  { src: "/images/car-front.jpg", alt: "Toyota Camry — predný pohľad" },
];

const SEO_TEXT = {
  sk: {
    heading: "JETTransfer – Spoľahlivá doprava na Schwechat a iné letiská",
    p1: "Naša profesionálna prepravná služba sa špecializuje na letiskové transfery a taxi z Bratislavy na Schwechat. Zabezpečujeme komfortnú, bezpečnú a cenovo prístupnú prepravu na letisko Schwechat, letisko v Bratislave, Budapešti a Prahe.",
    p2: "Vďaka dlhoročnej praxi a individuálnemu prístupu ponúkame nonstop prepravu 24/7, aby ste sa dostali na letisko včas a bez stresu. Naše vozidlá sú pohodlné, pravidelne kontrolované a naši vodiči skúsení a ústretoví.",
    p3: "Objednajte si letiskový transfer jednoducho online alebo telefonicky a cestujte pohodlne a bez starostí!",
  },
  en: {
    heading: "JETTransfer – Reliable transport to Schwechat and other airports",
    p1: "Our professional transport service specialises in airport transfers and taxi rides from Bratislava to Schwechat. We provide comfortable, safe and affordable transport to Schwechat Airport, Bratislava Airport, Budapest and Prague.",
    p2: "Thanks to years of experience and an individual approach, we offer non-stop 24/7 transport so you reach the airport on time and without stress. Our vehicles are comfortable and regularly inspected, and our drivers are experienced and accommodating.",
    p3: "Book your airport transfer easily online or by phone and travel comfortably and worry-free!",
  },
};

export default function Gallery({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const s = SEO_TEXT[lang];
  return (
    <section id="galeria" className="bg-ink-2/50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.gallery.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{d.gallery.h2}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 120}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-3">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* SEO text carried over from the client's original site */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{s.heading}</h3>
            <p className="mt-5 leading-relaxed text-neutral-300">{s.p1}</p>
            <p className="mt-4 leading-relaxed text-neutral-300">{s.p2}</p>
            <p className="mt-4 font-medium text-gold-2">{s.p3}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
