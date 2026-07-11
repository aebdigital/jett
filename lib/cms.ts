import { supabase } from "./supabase";
import type { Lang } from "./i18n";

// CMS-editable content (aeb_cms) with hardcoded fallbacks so the site
// always renders even if Supabase is unreachable or tables are empty.

export interface PriceRoute {
  id?: string;
  label_sk: string;
  label_en: string;
  price: string;
  note_sk?: string | null;
  note_en?: string | null;
  image: string;
  featured?: boolean;
  sort?: number;
}

export const DEFAULT_ROUTES: PriceRoute[] = [
  { label_sk: "Letisko Bratislava (BTS)", label_en: "Bratislava Airport (BTS)", price: "25 €", note_sk: "cca 20 min z centra", note_en: "approx. 20 min from the centre", image: "/images/airport-bratislava.webp", sort: 1 },
  { label_sk: "Letisko Viedeň – Schwechat", label_en: "Vienna Airport – Schwechat", price: "57 €", note_sk: "AKCIA 51 € pri objednávke 2 týždne vopred", note_en: "DEAL €51 when booked 2 weeks ahead", image: "/images/airport-schwechat.webp", featured: true, sort: 2 },
  { label_sk: "Viedeň centrum", label_en: "Vienna city centre", price: "85 €", note_sk: "priamo na vašu adresu", note_en: "straight to your address", image: "/images/vienna-centrum.jpg", sort: 3 },
  { label_sk: "Letisko Brno", label_en: "Brno Airport", price: "135 €", image: "/images/airport-brno.jpg", sort: 4 },
  { label_sk: "Letisko Budapešť", label_en: "Budapest Airport", price: "215 €", image: "/images/airport-budapest.webp", sort: 5 },
  { label_sk: "Letisko Praha", label_en: "Prague Airport", price: "325 €", image: "/images/airport-praha.webp", sort: 6 },
];

export async function getRoutes(): Promise<PriceRoute[]> {
  try {
    const { data, error } = await supabase
      .from("jettransfer_pricing")
      .select("*")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_ROUTES;
    return data as PriceRoute[];
  } catch {
    return DEFAULT_ROUTES;
  }
}

export interface Popup {
  enabled: boolean;
  title_sk: string;
  title_en: string;
  content_sk: string;
  content_en: string;
}

export async function getPopup(): Promise<Popup | null> {
  try {
    const { data, error } = await supabase
      .from("jettransfer_popup")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error || !data || !data.enabled) return null;
    return data as Popup;
  } catch {
    return null;
  }
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  reading_time: string;
  cover_image: string | null;
  content_html: string;
  title_en?: string | null;
  excerpt_en?: string | null;
  content_html_en?: string | null;
  is_published: boolean;
  created_at: string;
}

// EN falls back to Slovak when a translation is missing.
export const postTitle = (p: BlogPost, lang: Lang) => (lang === "en" && p.title_en ? p.title_en : p.title);
export const postExcerpt = (p: BlogPost, lang: Lang) => (lang === "en" && p.excerpt_en ? p.excerpt_en : p.excerpt);
export const postContent = (p: BlogPost, lang: Lang) => (lang === "en" && p.content_html_en ? p.content_html_en : p.content_html);

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("jettransfer_blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as BlogPost[];
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("jettransfer_blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) return null;
    return (data as BlogPost) || null;
  } catch {
    return null;
  }
}

export const routeLabel = (r: PriceRoute, lang: Lang) => (lang === "sk" ? r.label_sk : r.label_en || r.label_sk);
export const routeNote = (r: PriceRoute, lang: Lang) => (lang === "sk" ? r.note_sk : r.note_en ?? r.note_sk);
