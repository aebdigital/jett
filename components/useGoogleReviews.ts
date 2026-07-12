"use client";
import { useEffect, useState } from "react";
import { REVIEWS, RATING, reviewText, reviewWhen } from "./reviews-data";
import type { Lang } from "@/lib/i18n";

export interface LiveReview { name: string; when: string; text: string; isNew?: boolean }
export interface ReviewsState { rating: string; total: number; reviews: LiveReview[]; live: boolean }

// One shared fetch per language for the whole page (badge + ticker + section).
// Falls back to the curated hardcoded reviews if the API is unavailable.
const inflight: Partial<Record<Lang, Promise<ReviewsState>>> = {};

function fallback(lang: Lang): ReviewsState {
  return {
    rating: RATING.value,
    total: RATING.count,
    live: false,
    reviews: REVIEWS.map((r) => ({ name: r.name, when: reviewWhen(r, lang), text: reviewText(r, lang), isNew: r.isNew })),
  };
}

async function load(lang: Lang): Promise<ReviewsState> {
  try {
    const res = await fetch(`/api/reviews?lang=${lang}`);
    if (!res.ok) return fallback(lang);
    const j = await res.json();
    if (!j.ok || !Array.isArray(j.reviews) || j.reviews.length === 0) return fallback(lang);
    return {
      rating: typeof j.rating === "number" ? j.rating.toLocaleString(lang === "sk" ? "sk-SK" : "en-GB", { minimumFractionDigits: 1 }) : RATING.value,
      total: j.total ?? RATING.count,
      live: true,
      reviews: j.reviews.map((r: LiveReview & { time?: number }, i: number) => ({
        name: r.name,
        when: r.when,
        text: r.text,
        isNew: i === 0 && !!r.time && Date.now() / 1000 - r.time < 60 * 60 * 24 * 30,
      })),
    };
  } catch {
    return fallback(lang);
  }
}

export function useGoogleReviews(lang: Lang): ReviewsState {
  const [state, setState] = useState<ReviewsState>(() => fallback(lang));

  useEffect(() => {
    let cancelled = false;
    if (!inflight[lang]) inflight[lang] = load(lang);
    inflight[lang]!.then((s) => { if (!cancelled) setState(s); });
    return () => { cancelled = true; };
  }, [lang]);

  return state;
}
