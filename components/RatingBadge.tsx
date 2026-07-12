"use client";
import { GoogleIcon, Stars } from "./GoogleBits";
import { useGoogleReviews } from "./useGoogleReviews";
import { t, type Lang } from "@/lib/i18n";

// Hero eyebrow: live Google rating + review count.
export default function RatingBadge({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const { rating, total } = useGoogleReviews(lang);
  return (
    <a
      href="#recenzie"
      className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-ink-2/80 px-4 py-2 text-sm font-medium text-neutral-200 backdrop-blur transition hover:border-gold/50"
    >
      <GoogleIcon className="h-4.5 w-4.5" />
      <Stars className="h-3.5 w-3.5" />
      <span><b className="text-white">{rating}</b> · {total} {d.hero.reviewsOnGoogle}</span>
    </a>
  );
}
