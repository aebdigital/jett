import Image from "next/image";
import Reveal from "./Reveal";
import { t, type Lang } from "@/lib/i18n";

const PHOTOS = [
  { src: "/images/car-side.jpg", alt: "Toyota Camry — bočný pohľad" },
  { src: "/images/car-street.jpg", alt: "Vozidlo JetTransfer v uliciach Bratislavy" },
  { src: "/images/car-park.jpg", alt: "Toyota Camry pripravená na transfer" },
  { src: "/images/car-gallery-1.jpg", alt: "Vozidlo JetTransfer" },
  { src: "/images/car-detail-1.jpg", alt: "Detail vozidla JetTransfer" },
  { src: "/images/car-gallery-2.jpg", alt: "Toyota Camry — letiskový transfer" },
  { src: "/images/car-interior.webp", alt: "Kožený interiér Toyota Camry" },
  { src: "/images/car-gallery-3.jpg", alt: "JetTransfer na ceste" },
  { src: "/images/car-detail-2.jpg", alt: "Pripravené na vyzdvihnutie klienta" },
];

export default function Gallery({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
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
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
