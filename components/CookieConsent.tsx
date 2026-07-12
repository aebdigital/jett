"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/lib/i18n";

interface CookieConsentProps {
  lang?: Lang;
}

export default function CookieConsent({ lang = "sk" }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // States for toggles
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    // Check if consent is already saved in localStorage
    const saved = localStorage.getItem("jt:cookie-consent");
    if (!saved) {
      // If not saved, show banner after a small delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setAnalytics(parsed.analytics ?? true);
        setMarketing(parsed.marketing ?? true);
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  // Listen to open settings event from the footer link
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettings(true);
      setShowBanner(false);
    };
    window.addEventListener("jt:open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("jt:open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("jt:cookie-consent", JSON.stringify(consent));
    setAnalytics(true);
    setMarketing(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectOptional = () => {
    const consent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("jt:cookie-consent", JSON.stringify(consent));
    setAnalytics(false);
    setMarketing(false);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    const consent = { necessary: true, analytics, marketing };
    localStorage.setItem("jt:cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  // Translations dictionary
  const txt = {
    sk: {
      banner: "Tento web používa súbory cookies na zlepšenie používateľského zážitku, personalizáciu reklám a analýzu návštevnosti.",
      acceptAll: "Prijať všetky",
      rejectOptional: "Odmietnuť nepovinné",
      settings: "Nastavenia",
      header: "Nastavenia súborov cookies",
      desc: "Zvoľte, ktoré typy cookies si želáte povoliť. Základné cookies sú nevyhnutné pre prevádzku webovej lokality.",
      save: "Uložiť preferencie",
      necessary: "Nevyhnutné cookies",
      necessaryDesc: "Tieto cookies sú potrebné pre základné fungovanie webu a bezpečnosť, preto ich nie je možné zakázať.",
      analytics: "Analytické cookies",
      analyticsDesc: "Pomáhajú nám porozumieť, ako návštevníci používajú web, za účelom zlepšovania našich služieb.",
      marketing: "Marketingové cookies",
      marketingDesc: "Používajú sa na sledovanie preferencií návštevníkov a na zobrazovanie relevantnej a prispôsobenej reklamy."
    },
    en: {
      banner: "This website uses cookies to enhance your browsing experience, personalize ads, and analyze traffic.",
      acceptAll: "Accept all",
      rejectOptional: "Reject optional",
      settings: "Cookie settings",
      header: "Cookie Settings",
      desc: "Choose which types of cookies you want to allow. Essential cookies are necessary for the website to function.",
      save: "Save preferences",
      necessary: "Essential Cookies",
      necessaryDesc: "These cookies are required for basic site functionality and security, and cannot be disabled.",
      analytics: "Analytics Cookies",
      analyticsDesc: "They help us understand how visitors interact with the site, allowing us to improve our services.",
      marketing: "Marketing Cookies",
      marketingDesc: "Used to track visitor preferences across websites and deliver relevant, personalized advertisements."
    }
  }[lang];

  return (
    <>
      {/* Consent Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-5 left-5 right-5 z-[90] mx-auto max-w-4xl rounded-2xl border border-white/10 bg-ink-2/95 p-6 shadow-2xl shadow-black/80 backdrop-blur-md md:bottom-6 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-relaxed text-neutral-300 md:max-w-xl">
                {txt.banner}
              </p>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="rounded-full border border-white/20 bg-white/5 px-4.5 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white"
                >
                  {txt.settings}
                </button>
                <button
                  onClick={handleRejectOptional}
                  className="rounded-full border border-white/20 bg-white/5 px-4.5 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white"
                >
                  {txt.rejectOptional}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-full bg-gold px-5 py-2 text-xs font-bold text-ink transition hover:bg-gold-2 hover:scale-105 active:scale-95"
                >
                  {txt.acceptAll}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-xl rounded-3xl border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/80 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white">{txt.header}</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-neutral-400 hover:text-white transition"
                  aria-label="Close settings"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
                {txt.desc}
              </p>

              {/* Toggles Container */}
              <div className="mt-6 space-y-5">
                {/* 1. Necessary (always active) */}
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{txt.necessary}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{txt.necessaryDesc}</p>
                  </div>
                  <div className="relative shrink-0 flex items-center cursor-not-allowed">
                    <div className="h-6 w-11 rounded-full bg-gold/30"></div>
                    <div className="absolute right-0.5 h-5 w-5 rounded-full bg-gold shadow-md"></div>
                  </div>
                </div>

                {/* 2. Analytics */}
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{txt.analytics}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{txt.analyticsDesc}</p>
                  </div>
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className="relative shrink-0 flex items-center focus:outline-none"
                    aria-label="Toggle analytics cookies"
                  >
                    <div className={`h-6 w-11 rounded-full transition-colors duration-300 ${analytics ? "bg-gold" : "bg-neutral-800"}`}></div>
                    <div className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${analytics ? "translate-x-[22px]" : "translate-x-0.5"}`}></div>
                  </button>
                </div>

                {/* 3. Marketing */}
                <div className="flex items-start justify-between gap-4 pb-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{txt.marketing}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{txt.marketingDesc}</p>
                  </div>
                  <button
                    onClick={() => setMarketing(!marketing)}
                    className="relative shrink-0 flex items-center focus:outline-none"
                    aria-label="Toggle marketing cookies"
                  >
                    <div className={`h-6 w-11 rounded-full transition-colors duration-300 ${marketing ? "bg-gold" : "bg-neutral-800"}`}></div>
                    <div className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${marketing ? "translate-x-[22px]" : "translate-x-0.5"}`}></div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-white/5 pt-5">
                <button
                  onClick={handleRejectOptional}
                  className="rounded-full border border-white/10 bg-white/5 py-2.5 px-5 text-sm font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white"
                >
                  {txt.rejectOptional}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="rounded-full bg-white/15 hover:bg-white/20 py-2.5 px-5 text-sm font-semibold text-white transition active:scale-95"
                >
                  {txt.save}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-full bg-gold hover:bg-gold-2 py-2.5 px-6 text-sm font-bold text-ink transition hover:scale-105 active:scale-95"
                >
                  {txt.acceptAll}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
