import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { ProjectCard } from "@/components/cards";
import { CoverArt } from "@/components/art";
import { RevealGroup, Reveal, RevealItem } from "@/components/ui/reveal";
import { categories, projectsByCategory } from "@/content/work";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Not found" };
  return {
    title: category.name,
    description: `${category.tagline} — ${category.blurb}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = projectsByCategory(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${String(items.length).padStart(2, "0")} projects`}
        title={category.name}
        copy={category.blurb}
        meta={[category.tagline, "Lagos, Nigeria", "Case studies below"]}
        breadcrumb={[{ href: "/work", label: "Work" }, { href: `/work/${category.slug}`, label: category.name }]}
      >
        <Reveal delay={0.2}>
          <Link
            href="/work"
            className="mt-8 inline-flex items-center gap-2 text-[12.5px] font-medium text-muted transition-colors hover:text-red"
          >
            <ArrowLeft size={14} />
            All categories
          </Link>
        </Reveal>
      </PageHeader>

      <section className="section-tight">
        <div className="shell">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((project, index) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-tight border-t border-line">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-6">Keep browsing</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((other, index) => (
              <Reveal key={other.slug} delay={index * 0.05}>
                <Link
                  href={`/work/${other.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line p-3 transition-colors hover:border-line-strong"
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <CoverArt variant={other.art} label={other.name} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium tracking-[-0.01em]">
                      {other.name}
                    </span>
                    <span className="block text-[11.5px] text-muted">{other.tagline}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
