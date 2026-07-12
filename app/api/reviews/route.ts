import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Live Google reviews via Places Details API. The key stays server-side;
// results are cached in-memory for 1 hour per language to protect the quota.
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJ8YNAawCJbEcRmJBhgGibh34";
const TTL_MS = 60 * 60 * 1000;

interface CacheEntry { at: number; data: unknown }
const g = globalThis as unknown as { __jtReviews?: Record<string, CacheEntry> };
const cache = g.__jtReviews || (g.__jtReviews = {});

export async function GET(req: Request) {
  const lang = new URL(req.url).searchParams.get("lang") === "en" ? "en" : "sk";

  const hit = cache[lang];
  if (hit && Date.now() - hit.at < TTL_MS) {
    return NextResponse.json(hit.data);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 503 });
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&language=${lang}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.status !== "OK" || !json.result) {
      return NextResponse.json({ ok: false, error: json.status }, { status: 502 });
    }

    const r = json.result;
    const data = {
      ok: true,
      rating: r.rating ?? null,
      total: r.user_ratings_total ?? null,
      reviews: (r.reviews || [])
        .filter((x: { rating?: number }) => (x.rating ?? 0) >= 4)
        .map((x: { author_name?: string; rating?: number; relative_time_description?: string; text?: string; time?: number }) => ({
          name: x.author_name || "",
          rating: x.rating ?? 5,
          when: x.relative_time_description || "",
          text: (x.text || "").trim(),
          time: x.time ?? 0,
        }))
        .filter((x: { text: string }) => x.text.length > 0),
    };
    cache[lang] = { at: Date.now(), data };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ ok: false, error: "fetch failed" }, { status: 502 });
  }
}
