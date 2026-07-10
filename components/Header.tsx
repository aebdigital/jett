"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { t, type Lang } from "@/lib/i18n";

export default function Header({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const LINKS = [
    { href: "#sluzby", label: d.nav.sluzby },
    { href: "#cennik", label: d.nav.cennik },
    { href: "#vozidlo", label: d.nav.vozidlo },
    { href: "#recenzie", label: d.nav.recenzie },
    { href: "#galeria", label: d.nav.galeria },
    { href: "#kontakt", label: d.nav.kontakt },
  ];
  const otherLang = lang === "sk" ? { href: "/en", label: "EN" } : { href: "/", label: "SK" };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/95 shadow-lg shadow-black/30 backdrop-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 sm:px-8">
          <a href={lang === "sk" ? "/" : "/en"} className="flex items-center" aria-label="JetTransfer">
            <Image src="/Color-logo-with-background-Photoroom-removebg-preview.png" alt="JetTransfer" width={700} height={152} priority className="h-9 w-auto sm:h-10" />
          </a>

          <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Navigation">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-neutral-300 transition hover:text-gold focus-visible:rounded focus-visible:outline-2 focus-visible:outline-gold">
                {l.label}
              </a>
            ))}
          </nav>

          <a href={otherLang.href} className="hidden rounded-full border border-white/20 px-3.5 py-2 text-xs font-bold tracking-wide text-neutral-300 transition hover:border-gold hover:text-gold md:inline-block" aria-label="Switch language">
            {otherLang.label}
          </a>

          <a
            href="tel:+421905300120"
            className="hidden rounded-full border border-gold/60 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-gold md:inline-block"
          >
            +421 905 300 120
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Menu"
            aria-expanded={open}
            className="ml-auto grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition hover:border-gold md:hidden"
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <i className="h-0.5 rounded bg-current" />
              <i className="h-0.5 rounded bg-current" />
              <i className="h-0.5 w-3.5 self-end rounded bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* full-height drawer sliding in from the right */}
      <aside
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[82%] max-w-sm flex-col border-l border-white/10 bg-ink-2 px-7 pb-8 pt-5 shadow-2xl shadow-black/60 transition-transform duration-500 ease-[cubic-bezier(0.2,0.6,0.2,1)] md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Image src="/Color-logo-with-background-Photoroom-removebg-preview.png" alt="JetTransfer" width={700} height={152} className="h-8 w-auto" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition hover:border-gold"
          >
            ✕
          </button>
        </div>

        <nav className="mt-8 flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              className={`border-b border-white/5 py-4 text-lg font-medium text-neutral-200 transition-all duration-300 hover:pl-1 hover:text-gold ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={otherLang.href}
            style={{ transitionDelay: open ? `${120 + LINKS.length * 50}ms` : "0ms" }}
            className={`border-b border-white/5 py-4 text-lg font-medium text-gold transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
          >
            {lang === "sk" ? "🇬🇧 English" : "🇸🇰 Slovensky"}
          </a>
        </nav>

        <div className="mt-auto space-y-3">
          <a
            href="#rezervacia"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-ink transition hover:bg-gold-2"
          >
            {d.nav.book}
          </a>
          <a
            href="tel:+421905300120"
            className="block rounded-full border border-gold/50 px-5 py-3.5 text-center font-semibold text-gold transition hover:bg-gold hover:text-ink"
          >
            +421 905 300 120
          </a>
        </div>
      </aside>
    </>
  );
}
