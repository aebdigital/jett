import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — JetTransfer | Letisková doprava Bratislava",
  description: "Tipy a sprievodcovia pre letiskové transfery z Bratislavy — Schwechat, Budapešť, Praha.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Header lang="sk" />
      <main className="mx-auto min-h-screen max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">JetTransfer</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Blog</h1>

        {posts.length === 0 ? (
          <p className="mt-10 text-neutral-400">Zatiaľ žiadne články.</p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-2 transition hover:-translate-y-1 hover:border-gold/50">
                <div className="relative h-44 overflow-hidden bg-ink-3">
                  {p.cover_image ? (
                    <Image src={p.cover_image} alt={p.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full place-items-center text-3xl text-gold/40">✈</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gold">{p.category} · {p.reading_time}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-gold-2">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-neutral-400">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer lang="sk" />
    </>
  );
}
