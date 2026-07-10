"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { markIntroDone } from "./introBus";

// Splash intro: full black screen, logo fades in centered, then the whole
// overlay fades away. Skipped instantly for prefers-reduced-motion users.
export default function Intro() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      markIntroDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setPhase("fade");
      markIntroDone(); // reveals start exactly as the black screen lifts
    }, 1600);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-700 ease-out ${phase === "fade" ? "opacity-0" : "opacity-100"}`}
    >
      <div className="intro-logo px-10">
        <Image
          src="/Color-logo-with-background-Photoroom-removebg-preview.png"
          alt="JetTransfer"
          width={700}
          height={152}
          priority
          className="h-auto w-[min(420px,70vw)]"
        />
      </div>
    </div>
  );
}
