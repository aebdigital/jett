"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isIntroDone } from "./introBus";
import type { Lang } from "@/lib/i18n";

// Language-swap tab glued to the bottom edge of the screen, offset from the
// right so it never collides with the floating "Objednať" pill.
export default function FloatingLang({ lang = "sk" }: { lang?: Lang }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname() || "";
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/en/";

  useEffect(() => {
    if (!isHome || isIntroDone()) {
      setShow(true);
      return;
    }
    const open = () => setShow(true);
    window.addEventListener("jt:intro-done", open, { once: true });
    const safety = setTimeout(open, 4000);
    return () => {
      window.removeEventListener("jt:intro-done", open);
      clearTimeout(safety);
    };
  }, [isHome]);

  let otherHref = "/";
  if (lang === "sk") {
    if (pathname === "/") {
      otherHref = "/en";
    } else {
      otherHref = `/en${pathname}`;
    }
  } else {
    if (pathname === "/en" || pathname === "/en/") {
      otherHref = "/";
    } else if (pathname.startsWith("/en/")) {
      otherHref = pathname.substring(3);
    } else {
      otherHref = pathname;
    }
  }

  const other = lang === "sk"
    ? { href: otherHref, flag: "🇬🇧", label: "English" }
    : { href: otherHref, flag: "🇸🇰", label: "Slovensky" };

  return (
    <a
      href={other.href}
      aria-label={`Switch language — ${other.label}`}
      className={`fixed bottom-0 right-36 z-40 inline-flex items-center gap-2 rounded-t-xl border border-b-0 border-gold/40 bg-ink-2/95 px-4 py-2.5 text-sm font-semibold text-neutral-200 shadow-lg shadow-black/40 backdrop-blur transition-all duration-500 hover:pb-3.5 hover:text-gold sm:right-44 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <span className="text-lg leading-none" aria-hidden>{other.flag}</span>
      {other.label}
    </a>
  );
}
