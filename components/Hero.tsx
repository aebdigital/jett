import Reveal from "./Reveal";
import ReviewTicker from "./ReviewTicker";
import HeroParallax from "./HeroParallax";
import { GoogleIcon, Stars } from "./GoogleBits";
import { RATING } from "./reviews-data";
import { t, type Lang } from "@/lib/i18n";

export default function Hero({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <HeroParallax />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div>
        <Reveal delay={0}>
          <a
            href="#recenzie"
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-ink-2/80 px-4 py-2 text-sm font-medium text-neutral-200 backdrop-blur transition hover:border-gold/50"
          >
            <GoogleIcon className="h-4.5 w-4.5" />
            <Stars className="h-3.5 w-3.5" />
            <span><b className="text-white">{RATING.value}</b> · {RATING.count} {d.hero.reviewsOnGoogle}</span>
          </a>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-white sm:text-6xl">
            {d.hero.h1a}<span className="text-gold">{d.hero.h1b}</span>
          </h1>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">{d.hero.lead}</p>
        </Reveal>

        <Reveal delay={420}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#rezervacia" className="rounded-full bg-gold px-8 py-4 text-base font-semibold text-ink shadow-lg shadow-gold/20 transition hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {d.hero.ctaBook}
            </a>
            <a href="#cennik" className="rounded-full border border-white/25 px-8 py-4 text-base font-medium text-white transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
              {d.hero.ctaPrices}
            </a>
          </div>
        </Reveal>

        <Reveal delay={560}>
          <div className="mt-12 inline-flex max-w-xl flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-gold/25 bg-ink-2/80 px-5 py-4 backdrop-blur">
            <span className="rounded-md bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">{d.hero.promoTag}</span>
            <p className="text-sm text-neutral-200">
              {d.hero.promoA}<b className="text-gold-2">{d.hero.promoB}</b>
              <span className="text-neutral-400">{d.hero.promoC}</span>
            </p>
          </div>
        </Reveal>
        </div>

        <Reveal delay={700} className="hidden justify-self-end lg:block">
          <ReviewTicker lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}
