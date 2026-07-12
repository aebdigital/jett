"use client";
import Reveal from "./Reveal";
import { GoogleIcon, Stars } from "./GoogleBits";
import { useGoogleReviews } from "./useGoogleReviews";
import { t, type Lang } from "@/lib/i18n";

export default function Reviews({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const { rating, total, reviews } = useGoogleReviews(lang);

  return (
    <section id="recenzie" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.reviews.eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-5xl">
            {d.reviews.h2}
          </h2>
          <a
            href={`https://search.google.com/local/reviews?placeid=ChIJ8YNAawCJbEcRmJBhgGibh34`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-2 px-5 py-3.5 transition hover:border-gold/50"
          >
            <GoogleIcon className="h-7 w-7" />
            <div>
              <div className="flex items-center gap-2">
                <b className="text-lg text-white">{rating}</b>
                <Stars className="h-4 w-4" />
              </div>
              <p className="text-xs text-neutral-400">{total} {d.reviews.onGoogle}</p>
            </div>
          </a>
        </div>
      </Reveal>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {reviews.map((r, i) => (
          <Reveal key={r.name + r.when} delay={(i % 3) * 100} className="break-inside-avoid">
            <figure className="rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:border-gold/40">
              <div className="flex items-center justify-between gap-3">
                <Stars className="h-3.5 w-3.5" />
                {r.isNew && <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold-2">{d.reviews.isNew}</span>}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-200">„{r.text}“</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gold/20 text-sm font-bold text-gold">
                  {r.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <GoogleIcon className="h-3 w-3" /> Google · 5/5 · {r.when}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
