import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { WebProjectCard } from "@/components/cards";
import { RevealGroup, Reveal, RevealItem } from "@/components/ui/reveal";
import { webProjects } from "@/content/work";

export const metadata: Metadata = {
  title: "Web",
  description:
    "Websites and interfaces designed and built by Uneek Designs — Next.js, Supabase and a bias for speed on slow connections.",
};

const STACK = ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "Three.js"];

export default function WebPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coded, not just designed"
        title={
          <>
            Sites that load fast
            <br />
            <span className="text-muted">and refuse to look templated.</span>
          </>
        }
        copy="A handful of builds where the design and the code came from the same desk. Mobile-first, WhatsApp-friendly, and tested on the kind of connection people actually have."
        meta={[`${webProjects.length} builds`, "Next.js + Supabase", "Lighthouse 85+ target"]}
      />

      <section className="section-tight">
        <div className="shell">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {webProjects.map((project, index) => (
              <RevealItem key={project.slug}>
                <WebProjectCard project={project} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-tight border-t border-line">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow mb-4">The toolkit</p>
            <h2 className="h2 max-w-[16ch]">Built with tools I can hand over.</h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-muted">
              No proprietary page builders. Every build ships with a repo, a README and a
              content model you can edit without calling me at midnight.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span key={tech} className="chip h-9 px-3.5 text-[12px]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                { title: "Design + build", copy: "One person, one vision, no handoff loss." },
                { title: "CMS-ready", copy: "Content modelled for Supabase or a flat file." },
                { title: "Perf budget", copy: "Images lazy-loaded, 3D deferred, motion reduced." },
                { title: "Docs included", copy: "Deploy notes and a content guide on handover." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-line p-4">
                  <p className="text-[13.5px] font-medium">{item.title}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
