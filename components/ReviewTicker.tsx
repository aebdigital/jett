"use client";
import { useEffect, useState } from "react";
import { REVIEWS, reviewText, reviewWhen } from "./reviews-data";
import { GoogleIcon, Stars } from "./GoogleBits";
import { t, type Lang } from "@/lib/i18n";

// Single review card in the hero that crossfades through all reviews.
export default function ReviewTicker({ lang = "sk" }: { lang?: Lang }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % REVIEWS.length);
        setVisible(true);
      }, 400);
    }, 4800);
    return () => clearInterval(t);
  }, []);

  const r = REVIEWS[idx];

  return (
    <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-ink-2/85 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GoogleIcon className="h-5 w-5" />
          <span className="text-sm font-semibold text-white">{t(lang).hero.googleReviews}</span>
        </div>
        <Stars className="h-3.5 w-3.5" />
      </div>

      <div className={`mt-4 min-h-[120px] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-sm leading-relaxed text-neutral-200">„{reviewText(r, lang)}“</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gold/20 text-sm font-bold text-gold">
            {r.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{r.name}</p>
            <p className="text-xs text-neutral-400">5/5 · {reviewWhen(r, lang)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {REVIEWS.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-gold" : "w-1.5 bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}
