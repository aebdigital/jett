"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

interface Photo {
  src: string;
  alt: string;
}

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Handle keyboard events (ESC to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 120}>
            <div
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ink-3 transition hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Elegant hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="rounded-full bg-gold/90 p-3.5 text-ink shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute right-5 top-5 z-[110] rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-gold hover:text-ink hover:border-gold hover:scale-105 active:scale-95"
              aria-label="Close lightbox"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
              }}
              className="absolute left-4 z-[110] rounded-full border border-white/10 bg-white/5 p-3.5 text-white transition-all hover:bg-gold hover:text-ink hover:border-gold hover:scale-105 active:scale-95 md:left-8"
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Active image container */}
            <div
              className="relative aspect-[4/3] w-[90vw] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 80, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[activeIndex].src}
                    alt={photos[activeIndex].alt}
                    fill
                    className="object-contain p-4 sm:p-8"
                    priority
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm border border-white/5">
                    {activeIndex + 1} / {photos.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
              }}
              className="absolute right-4 z-[110] rounded-full border border-white/10 bg-white/5 p-3.5 text-white transition-all hover:bg-gold hover:text-ink hover:border-gold hover:scale-105 active:scale-95 md:right-8"
              aria-label="Next image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
