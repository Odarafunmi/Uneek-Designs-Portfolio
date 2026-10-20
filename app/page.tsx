import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/ui/cta-band";
import { CategoryCard, PostCard, ProjectCard, ServiceCard } from "@/components/cards";
import { CoverArt } from "@/components/art";
import { categories, featuredProjects, projectsByCategory, testimonials } from "@/content/work";
import { services } from "@/content/services";
import { sortedPosts } from "@/content/posts";
import { site } from "@/content/site";

const CLIENTS = [
  "Zuri Coffee",
  "Nkem Skincare",
  "Oríkì Records",
  "Terra Interiors",
  "Kola Bank",
  "Bloom & Co.",
  "Lagos Fit Club",
  "SunHouse Solar",
];

export default function HomePage() {
  const featured = featuredProjects(3);
  const posts = sortedPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <div className="relative border-y border-line bg-surface/60">
        <Marquee items={CLIENTS} />
      </div>

      {/* Intro / studio */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
                The studio
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2 mt-5 max-w-[15ch]">
                A studio of one, with the reach of ten.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
                <p>
                  {site.name} is me, {site.owner} — a brand and product designer working
                  with founders who are done looking like everyone else. Most of my
                  clients are small teams with big ambitions and no design department.
                </p>
                <p>
                  So I build systems, not one-off files. Identity, adverts, social and the
                  occasional website — all pulled from the same visual logic, all
                  documented well enough for someone else to run.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hand mt-6 text-2xl text-red">
                Ask me about the red. There&apos;s a reason.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                <Link href="/work" className="btn btn-primary">
                  Browse the work
                  <ArrowUpRight size={16} />
                </Link>
                <Link href="/services" className="btn btn-outline">
                  Services &amp; pricing
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="sm:col-span-2">
              <div className="card relative overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <CoverArt variant="type" label="Uneek" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                        Currently
                      </p>
                      <p className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-white">
                        Booking Nov – Dec
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                      <span className="availability-dot" />
                      Open
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {[
              { value: `${site.projectsDelivered}+`, label: "Projects shipped" },
              { value: `${site.yearsExperience} yrs`, label: "Running the studio" },
              { value: "12", label: "Brands on retainer" },
              { value: "4.9", label: "Average client rating" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={0.06 * index}>
                <div className="card flex h-full flex-col justify-between p-5">
                  <p className="display text-[2.15rem] leading-none">{stat.value}</p>
                  <p className="mt-2 text-[12.5px] text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section-tight border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Three recent ones
                <br />
                <span className="text-muted">worth a look.</span>
              </>
            }
            copy="A quick slice of the studio: a roastery, a skincare launch and a label that needed a system, not a logo."
            action={{ href: "/work", label: "All work" }}
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Categories */}
      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            eyebrow="Browse by discipline"
            title="Four drawers, one studio."
            copy="Branding, social, product adverts and the personal work that keeps the ideas sharp."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <RevealItem key={category.slug}>
                <CategoryCard
                  category={category}
                  count={projectsByCategory(category.slug).length}
                  index={index}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Services */}
      <section className="section relative overflow-hidden border-y border-line bg-surface/50">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-40 [background:radial-gradient(60%_100%_at_50%_0%,rgba(238,3,3,0.18),transparent_70%)]" />
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="Services & pricing"
            title="Transparent pricing, zero discovery-call theatre."
            copy="Pick a package, edit the WhatsApp message, send. Each one includes the files, the systems and a handover you can actually use."
            action={{ href: "/services", label: "Full pricing" }}
          />
          <RevealGroup className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-[13px] text-muted">
              Need something that isn&apos;t listed?{" "}
              <Link href="/contact" className="font-medium text-ink underline decoration-red underline-offset-4">
                Tell me about it
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            eyebrow="Kind words"
            title="What founders say after handover."
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <RevealItem key={item.name} className="h-full">
                <figure className="card flex h-full flex-col p-6">
                  <Quote size={22} className="text-red" strokeWidth={1.6} />
                  <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/90">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-[11px] font-semibold text-red">
                      {item.initials}
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium">{item.name}</span>
                      <span className="block text-[11.5px] text-muted">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Journal */}
      <section className="section-tight border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="From the studio"
            title="Notes on brands, colour and client work."
            copy="Occasional writing about what actually happens between the brief and the launch."
            action={{ href: "/blog", label: "Read the blog" }}
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <RevealItem key={post.slug}>
                <PostCard post={post} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
