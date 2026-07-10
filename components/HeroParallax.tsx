"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

// Hero background with a subtle parallax: the photo drifts slower than the page.
export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        // only while the hero is on screen
        if (y < window.innerHeight * 1.2) {
          el.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform" style={{ bottom: "-20%" }}>
      <Image
        src="/images/car-night.jpg"
        alt="Prémiové vozidlo JetTransfer pripravené na letiskový transfer"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
