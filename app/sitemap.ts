import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/cms";

const SITE = "https://jettransfer.sk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts().catch(() => []);
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { sk: `${SITE}/`, en: `${SITE}/en` } },
    },
    {
      url: `${SITE}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { sk: `${SITE}/`, en: `${SITE}/en` } },
    },
    {
      url: `${SITE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
