import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPost, postTitle, postExcerpt, postContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${postTitle(post, "en")} — JetTransfer Blog`,
    description: postExcerpt(post, "en"),
    alternates: { canonical: `/en/blog/${post.slug}`, languages: { sk: `/blog/${post.slug}`, en: `/en/blog/${post.slug}` } },
    openGraph: { title: postTitle(post, "en"), description: postExcerpt(post, "en"), type: "article", images: post.cover_image ? [{ url: post.cover_image }] : undefined },
  };
}

export default async function BlogPostPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header lang="en" />
      <main className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <Link href="/en/blog" className="text-sm text-gold hover:text-gold-2">← Back to blog</Link>
        <p className="mt-6 text-xs text-gold">{post.category} · {post.reading_time} · {new Date(post.created_at).toLocaleDateString("en-GB")}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl">{postTitle(post, "en")}</h1>
        {post.cover_image && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
            <Image src={post.cover_image} alt={postTitle(post, "en")} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
          </div>
        )}
        <article
          className="mt-10 max-w-none text-neutral-200 [&_a]:text-gold [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:my-1.5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: postContent(post, "en") }}
        />
        <div className="mt-14 rounded-2xl border border-gold/25 bg-ink-2 p-6 text-center">
          <p className="text-lg font-semibold text-white">Need an airport transfer?</p>
          <a href="/en#rezervacia" className="mt-4 inline-block rounded-full bg-gold px-8 py-3.5 font-semibold text-ink transition hover:bg-gold-2">Book a transfer</a>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}
