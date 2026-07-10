"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Lang } from "@/lib/i18n";

interface PopupRow {
  enabled: boolean;
  title_sk: string; title_en: string;
  content_sk: string; content_en: string;
  updated_at?: string;
}

// Owner-editable announcement/disclaimer (aeb_cms → jettransfer_popup).
// Shows once per content version, after the intro splash.
export default function Popup({ lang = "sk" }: { lang?: Lang }) {
  const [row, setRow] = useState<PopupRow | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.from("jettransfer_popup").select("*").limit(1).maybeSingle();
        if (cancelled || !data || !data.enabled) return;
        const key = "jt-popup-seen";
        const version = data.updated_at || "v1";
        if (localStorage.getItem(key) === version) return;
        setRow(data as PopupRow);
        // wait for the splash intro before showing
        setTimeout(() => setOpen(true), 3000);
        localStorage.setItem(key, version);
      } catch { /* no popup on failure */ }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!row || !open) return null;
  const title = lang === "sk" ? row.title_sk : row.title_en || row.title_sk;
  const content = lang === "sk" ? row.content_sk : row.content_en || row.content_sk;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-md rounded-3xl border border-gold/30 bg-ink-2 p-7 shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-gold-2">{title}</h2>
          <button onClick={() => setOpen(false)} aria-label="✕" className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-white/15 text-white transition hover:border-gold">✕</button>
        </div>
        <div className="prose-invert mt-4 text-sm leading-relaxed text-neutral-200 [&_a]:text-gold [&_a]:underline" dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-full bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-gold-2">
          OK
        </button>
      </div>
    </div>
  );
}
