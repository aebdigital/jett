"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// Custom date+time picker: identical dark/gold UI on every browser.
// Replaces native datetime-local (iOS Safari renders it inconsistently and
// lets the value overflow the field). Emits a hidden input for the form.
const T = {
  sk: {
    placeholder: "Vyberte dátum a čas",
    months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    days: ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"],
    time: "Čas vyzdvihnutia",
    confirm: "Potvrdiť",
  },
  en: {
    placeholder: "Pick date & time",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    time: "Pickup time",
    confirm: "Confirm",
  },
};

export default function DateTimePicker({ name, required, lang = "sk", inputClass = "" }: {
  name: string; required?: boolean; lang?: "sk" | "en"; inputClass?: string;
}) {
  const t = T[lang];
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("touchstart", onDown); };
  }, []);

  const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  const value = date ? `${fmt(date)} ${hour}:${minute}` : "";

  // calendar grid (weeks start Monday)
  const grid = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    return cells;
  }, [view]);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];
  const sel = "rounded-lg border border-white/15 bg-ink px-2.5 py-2 text-sm text-white focus:border-gold focus:outline-none";

  return (
    <div ref={wrapRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputClass} flex items-center justify-between gap-2 text-left ${value ? "text-white" : "text-neutral-500"}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="truncate">{value || t.placeholder}</span>
        <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-gold" aria-hidden>
          <path d="M6 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H8V2H6zm-2 6h12v8H4V8z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-[300px] rounded-2xl border border-white/15 bg-ink-2 p-4 shadow-2xl shadow-black/60">
          <div className="flex items-center justify-between">
            <button type="button" aria-label="←" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-neutral-300 hover:border-gold">‹</button>
            <span className="text-sm font-semibold text-white">{t.months[view.getMonth()]} {view.getFullYear()}</span>
            <button type="button" aria-label="→" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-neutral-300 hover:border-gold">›</button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-neutral-500">
            {t.days.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {grid.map((d, i) => {
              if (!d) return <span key={i} />;
              const past = d < today;
              const active = date && d.getTime() === date.getTime();
              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => setDate(d)}
                  className={`h-9 rounded-lg text-sm transition ${active ? "bg-gold font-bold text-ink" : past ? "text-neutral-700" : "text-neutral-200 hover:bg-white/10"}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-white/10 pt-3">
            <p className="mb-2 text-xs text-neutral-400">{t.time}</p>
            <div className="flex items-center gap-2">
              <select value={hour} onChange={(e) => setHour(e.target.value)} className={sel} aria-label="Hodina">
                {hours.map((h) => <option key={h}>{h}</option>)}
              </select>
              <span className="text-neutral-400">:</span>
              <select value={minute} onChange={(e) => setMinute(e.target.value)} className={sel} aria-label="Minúta">
                {minutes.map((m) => <option key={m}>{m}</option>)}
              </select>
              <button
                type="button"
                onClick={() => date && setOpen(false)}
                disabled={!date}
                className="ml-auto rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-2 disabled:opacity-40"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
