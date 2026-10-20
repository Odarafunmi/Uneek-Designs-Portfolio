import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { CoverArt } from "@/components/art";
import { CtaBand } from "@/components/ui/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { formatDate, getPost, posts, sortedPosts } from "@/content/posts";
import { renderMarkdown } from "@/lib/markdown";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-10 pt-32 md:pb-12 md:pt-40">
          <div className="mesh mesh-soft">
            <div className="mesh-blob" />
            <div className="mesh-blob" />
          </div>
          <div className="shell relative z-10">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[12.5px] font-medium text-muted transition-colors hover:text-red"
              >
                <ArrowLeft size={14} />
                All posts
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                <span>{formatDate(post.date)}</span>
                <span className="h-1 w-1 rounded-full bg-red" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} /> {post.readingTime}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.09}>
              <h1 className="h1 mt-4 max-w-3xl">{post.title}</h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lede mt-5 max-w-2xl">{post.excerpt}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </header>

        <Reveal>
          <div className="shell">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[26px] border border-line md:aspect-[2.1/1]">
              <CoverArt variant={post.art} label={post.title} />
            </div>
          </div>
        </Reveal>

        <div className="section-tight">
          <div className="shell grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red/10 text-[12px] font-semibold text-red">
                  {site.owner.charAt(0)}
                </span>
                <span>
                  <span className="block text-[13px] font-medium">{site.owner}</span>
                  <span className="block text-[11.5px] text-muted">
                    {site.role} · {site.location}
                  </span>
                </span>
              </div>
              <p className="hand mt-6 text-xl text-muted">
                Written between client calls, usually after 10pm.
              </p>
            </aside>

            <div className="prose-uneek max-w-[68ch]">{renderMarkdown(post.body)}</div>
          </div>
        </div>

        <section className="section-tight border-t border-line">
          <div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="h3">Keep reading</h2>
              <Link
                href="/blog"
                className="text-[12.5px] font-medium text-muted transition-colors hover:text-red"
              >
                All posts
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex items-center justify-between gap-5 rounded-2xl border border-line p-5 transition-colors hover:border-line-strong"
                  >
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                        {formatDate(item.date)}
                      </span>
                      <span className="mt-1.5 block text-[15px] font-medium leading-snug tracking-[-0.015em]">
                        {item.title}
                      </span>
                    </span>
                    <span className="arrow-badge shrink-0">
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CtaBand />
    </>
  );
}
