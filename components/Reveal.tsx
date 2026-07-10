"use client";
import { useEffect, useRef, useState } from "react";
import { isIntroDone } from "./introBus";

// Fade-in-up on scroll. Elements stay hidden until BOTH the splash intro has
// finished AND the element is scrolled into view. Runs once per element;
// disabled for prefers-reduced-motion via CSS.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [inView, setInView] = useState(false);

  // gate: wait for the intro splash (with a safety timeout if it never mounts)
  useEffect(() => {
    if (isIntroDone()) {
      setGateOpen(true);
      return;
    }
    const open = () => setGateOpen(true);
    window.addEventListener("jt:intro-done", open, { once: true });
    const safety = setTimeout(open, 4000);
    return () => {
      window.removeEventListener("jt:intro-done", open);
      clearTimeout(safety);
    };
  }, []);

  // in-view: IntersectionObserver, fires once
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -64px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = gateOpen && inView;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
