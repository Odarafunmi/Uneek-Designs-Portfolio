import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { ProjectCard, TiltWrap } from "@/components/cards";
import { RevealGroup, Reveal, RevealItem } from "@/components/ui/reveal";
import { categories, projects, projectsByCategory } from "@/content/work";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Brand identities, social systems, product campaigns and self-initiated work from Uneek Designs.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="The work"
        title={
          <>
            Brands, campaigns and{" "}
            <span className="grad-text">things made on purpose.</span>
          </>
        }
        copy="Identities, campaign systems, product adverts and print — every project starts with the same question: what should this make people do?"
        meta={[`${projects.length} projects`, `${categories.length} categories`, "2024 — 2026"]}
      />

      {categories.map((category) => {
        const items = projectsByCategory(category.slug);
        return (
          <section key={category.slug} id={category.slug} className="section-tight border-t border-line">
            <div className="shell">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <Reveal>
                    <p className="eyebrow flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
                      {String(items.length).padStart(2, "0")} projects
                    </p>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="h2 mt-4">{category.name}</h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">
                      {category.blurb}
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.12}>
                  <a
                    href={`/work/${category.slug}`}
                    className="text-[12.5px] font-medium text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-red hover:decoration-red"
                  >
                    Open {category.name.toLowerCase()} category
                  </a>
                </Reveal>
              </div>

              <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.slice(0, 4).map((project, index) => (
                  <RevealItem key={project.slug}>
                    <ProjectCard
                      project={project}
                      index={index}
                      aspect={category.slug === "branding" ? "aspect-[4/5]" : "aspect-[4/3]"}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <div className="shell">
        <Reveal>
          <TiltWrap strength={3}>
          <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow mb-2">More on the drive</p>
              <p className="max-w-md text-[14.5px] leading-relaxed text-muted">
                The full archive — including unpublished client work and process decks —
                lives in a shared Drive folder.
              </p>
            </div>
            <a
              href={site.driveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline shrink-0"
            >
              View full portfolio
            </a>
          </div>
          </TiltWrap>
        </Reveal>
      </div>

      <CtaBand />
    </>
  );
}
