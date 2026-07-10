"use client";
import { useEffect, useState } from "react";
import { isIntroDone } from "./introBus";

// Golden "Objednať" pill, fixed bottom-right on every viewport,
// appears after the splash intro and scrolls to the booking form.
export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isIntroDone()) {
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
  }, []);

  return (
    <a
      href="#rezervacia"
      aria-label="Objednať transfer"
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink shadow-xl shadow-gold/25 transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:right-6 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      Objednať
      <span aria-hidden className="text-base leading-none">→</span>
    </a>
  );
}
