import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WorkImage } from "@/components/ui/work-image";
import { CtaBand } from "@/components/ui/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { categories, projects, projectsByCategory } from "@/content/work";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({
    category: project.category,
    project: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; project: string }>;
}): Promise<Metadata> {
  const { project: slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.description.slice(0, 155),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ category: string; project: string }>;
}) {
  const { category: categorySlug, project: projectSlug } = await params;
  const project = projects.find((p) => p.slug === projectSlug);
  const category = categories.find((c) => c.slug === categorySlug);
  if (!project || !category) notFound();

  const siblings = projectsByCategory(category.slug).filter((p) => p.slug !== project.slug);
  const next = siblings[0] ?? projectsByCategory(categories.find((c) => c.slug !== category.slug)!.slug)[0];

  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-10 pt-32 md:pb-14 md:pt-40">
          <div className="mesh mesh-soft">
            <div className="mesh-blob" />
            <div className="mesh-blob" />
          </div>
          <div className="shell relative z-10">
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11.5px] text-muted">
                <Link href="/work" className="hover:text-ink">
                  Work
                </Link>
                <span className="opacity-40">/</span>
                <Link href={`/work/${category.slug}`} className="hover:text-ink">
                  {category.name}
                </Link>
                <span className="opacity-40">/</span>
                <span className="text-ink">{project.title}</span>
              </nav>
            </Reveal>

            <Reveal delay={0.04}>
              <p className="eyebrow mt-8 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
                {project.client} · {project.year}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="h1 mt-5 max-w-4xl">{project.title}</h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="lede mt-5 max-w-2xl">{project.tagline}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-10 grid gap-6 border-t border-line pt-6 text-[12.5px] sm:grid-cols-3">
                <div>
                  <dt className="eyebrow mb-1.5">Client</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Deliverables</dt>
                  <dd>{project.deliverables.join(" · ")}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </header>

        <Reveal>
          <div className="shell">
            <div
              className={`relative overflow-hidden rounded-[28px] border border-line bg-surface ${
                project.category === "branding" ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[16/10]"
              }`}
            >
              <WorkImage
                src={project.cover}
                variant={project.art}
                label={project.title}
                priority
                sizes="(min-width: 1200px) 1200px, 100vw"
              />
            </div>
          </div>
        </Reveal>

        {project.gallery?.length ? (
          <section className="section-tight">
            <div className="shell">
              <div className="flex items-end justify-between gap-6">
                <p className="eyebrow">More from the project</p>
                {project.driveUrl && (
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-red-ink underline decoration-red underline-offset-4"
                  >
                    Full case on Drive
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((shot, i) => (
                  <div
                    key={shot}
                    className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-surface"
                  >
                    <WorkImage
                      src={shot}
                      variant={project.art}
                      label={`${project.title} — detail ${i + 1}`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-tight">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow mb-4">The brief</p>
                <h2 className="h2 max-w-[16ch]">{project.tagline}.</h2>
                <p className="hand mt-6 text-2xl text-red">
                  Scroll for the thinking.
                </p>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="text-[17px] leading-[1.75] text-ink/85">{project.description}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {project.deliverables.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-line p-4">
                      <p className="font-hand text-2xl text-red">0{index + 1}</p>
                      <p className="mt-1 text-[13.5px] font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn btn-primary"
                    >
                      View on Behance
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <Link href="/contact" className="btn btn-primary">
                      Ask about this project
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                  <a
                    href={site.driveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-outline"
                  >
                    Open Drive archive
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-tight border-t border-line">
          <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/work/${category.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-red"
            >
              <ArrowLeft size={15} />
              Back to {category.name}
            </Link>
            <Link href={`/work/${next.category}/${next.slug}`} className="group flex items-center gap-4">
              <span className="text-right">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-muted">
                  Next project
                </span>
                <span className="block text-[15px] font-medium tracking-[-0.01em]">
                  {next.title}
                </span>
              </span>
              <span className="arrow-badge h-10 w-10">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>
      </article>

      <CtaBand />
    </>
  );
}
