"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// The 3-image vehicle slider, matching the slider on the client's original site.
const SLIDES = [
  { src: "/images/car-gallery-3.jpg", alt: "Toyota Camry Hybrid — JetTransfer" },
  { src: "/images/car-gallery-2.jpg", alt: "Toyota Camry — letiskový transfer" },
  { src: "/images/car-gallery-1.jpg", alt: "Toyota Camry — JetTransfer Bratislava" },
];

export default function FleetSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const go = (i: number) => setIdx((i + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div key={s.src} className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.src} alt={s.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={i === 0} />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

      {/* arrows */}
      <button
        onClick={() => go(idx - 1)}
        aria-label="Predchádzajúca fotka"
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition hover:border-gold hover:text-gold group-hover:opacity-100"
      >
        ‹
      </button>
      <button
        onClick={() => go(idx + 1)}
        aria-label="Ďalšia fotka"
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition hover:border-gold hover:text-gold group-hover:opacity-100"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Fotka ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
