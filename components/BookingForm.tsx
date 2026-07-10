"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import DateTimePicker from "./DateTimePicker";
import { t, type Lang } from "@/lib/i18n";

const DESTINATIONS = {
  sk: ["Letisko Bratislava (BTS)", "Letisko Viedeň – Schwechat", "Viedeň centrum", "Letisko Brno", "Letisko Budapešť", "Letisko Praha", "Iná destinácia"],
  en: ["Bratislava Airport (BTS)", "Vienna Airport – Schwechat", "Vienna city centre", "Brno Airport", "Budapest Airport", "Prague Airport", "Other destination"],
};

export default function BookingForm({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const dests = DESTINATIONS[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(j.message || d.booking.fail);
      }
    } catch {
      setStatus("error");
      setError(d.booking.fail);
    }
  }

  const input = "w-full rounded-xl border border-white/15 bg-ink px-4 py-3.5 text-white placeholder:text-neutral-500 focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-gold";

  return (
    <section id="rezervacia" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.booking.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{d.booking.h2}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-neutral-300">{d.booking.lead}</p>
          <div className="mt-8 rounded-2xl border border-gold/25 bg-ink-2 p-6">
            <p className="text-sm text-neutral-400">{d.booking.callPref}</p>
            <a href="tel:+421905300120" className="mt-1 block text-2xl font-bold text-gold hover:text-gold-2">+421 905 300 120</a>
            <a href="mailto:jettransfer@jettransfer.sk" className="mt-1 block text-sm text-neutral-300 hover:text-gold-2">jettransfer@jettransfer.sk</a>
          </div>
        </div>
        </Reveal>

        <Reveal delay={150}>
        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-ink-2 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-neutral-300">{d.booking.name}</label>
              <input id="name" name="name" required className={input} placeholder="Ján Novák" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm text-neutral-300">{d.booking.phone}</label>
              <input id="phone" name="phone" type="tel" required className={input} placeholder="+421 900 000 000" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1.5 block text-sm text-neutral-300">{d.booking.email}</label>
              <input id="email" name="email" type="email" required className={input} placeholder="vas@email.sk" />
            </div>
            <div>
              <span className="mb-1.5 block text-sm text-neutral-300">{d.booking.date}</span>
              <DateTimePicker name="date" required lang={lang} inputClass={input} />
            </div>
            <div>
              <label htmlFor="persons" className="mb-1.5 block text-sm text-neutral-300">{d.booking.persons}</label>
              <select id="persons" name="persons" required className={input} defaultValue="1">
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="from" className="mb-1.5 block text-sm text-neutral-300">{d.booking.from}</label>
              <input id="from" name="from" required className={input} placeholder={d.booking.fromPh} />
            </div>
            <div>
              <label htmlFor="to" className="mb-1.5 block text-sm text-neutral-300">{d.booking.to}</label>
              <select id="to" name="to" required className={input} defaultValue={dests[1]}>
                {dests.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-sm text-neutral-300">{d.booking.note} <span className="text-neutral-500">{d.booking.noteHint}</span></label>
              <textarea id="message" name="message" rows={3} className={input} placeholder={d.booking.notePh} />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full rounded-full bg-gold px-8 py-4 font-semibold text-ink transition hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
          >
            {status === "sending" ? d.booking.sending : d.booking.submit}
          </button>

          {status === "ok" && (
            <p className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300" role="status">
              {d.booking.ok}
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
              {error}
            </p>
          )}
        </form>
        </Reveal>
      </div>
    </section>
  );
}
