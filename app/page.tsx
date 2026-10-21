import Link from "next/link";
import { ArrowUpRight, Code2, Package, Palette, Quote } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/ui/cta-band";
import { HeroObjectLazy } from "@/components/hero-object-lazy";
import { CategoryCard, PostCard, ProjectCard, ServiceCard } from "@/components/cards";
import { WorkImage } from "@/components/ui/work-image";
import { TiltWrap } from "@/components/cards";
import { CountUp } from "@/components/ui/count-up";
import { categories, featuredProjects, projectsByCategory, testimonials } from "@/content/work";
import { services } from "@/content/services";
import { sortedPosts } from "@/content/posts";
import { site } from "@/content/site";

/**
 * The "recent work" block is parked for now. Flip to `true` to bring the
 * three-up featured grid back — nothing else in the page depends on it.
 */
const SHOW_RECENT_WORK = false;

const CLIENTS = [
  "Kiisi Collections",
  "Zyntra Fitness",
  "Fenchurch",
  "Oister",
  "Metricore AI",
  "Kayali",
  "Nivea Sun",
  "Oraimo",
  "Samsong",
  "Lador",
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
      <section className="section-tight">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
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
              <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-muted md:text-base">
                One designer, systems that scale. Identity, product visuals and sites —
                documented so any team can run them.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Palette, label: "Brand systems" },
                  { icon: Package, label: "Product visuals" },
                  { icon: Code2, label: "Web builds" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red-ink">
                      <item.icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className="text-[13px] font-medium leading-tight">{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="hand mt-6 text-xl text-red-ink md:text-2xl">
                Ask me about the red.
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

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Reveal className="col-span-2">
              <TiltWrap strength={4}>
              <Link
                href="/work"
                data-cursor="See all"
                className="card card-hover group block overflow-hidden"
                aria-label="Latest work — see all projects"
              >
                <div className="grid aspect-[16/9] grid-cols-3 grid-rows-2 gap-1 bg-surface p-1">
                  {featured.slice(0, 3).map((project, i) => (
                    <div
                      key={project.slug}
                      className={`relative overflow-hidden rounded-xl bg-bg ${
                        i === 0 ? "col-span-2 row-span-2" : ""
                      }`}
                    >
                      <WorkImage
                        src={project.cover}
                        variant={project.art}
                        label={project.title}
                        seed={i}
                        sizes="(min-width: 768px) 40vw, 60vw"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="eyebrow">Latest from the studio</p>
                    <p className="mt-1.5 text-[13px] text-muted">
                      {featured
                        .slice(0, 3)
                        .map((p) => p.title)
                        .join(" · ")}
                    </p>
                  </div>
                  <span className="arrow-badge shrink-0 border-line-strong text-ink transition-colors group-hover:border-red group-hover:text-red">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
              </TiltWrap>
            </Reveal>

            {[
              { value: site.projectsDelivered, suffix: "+", decimals: 0, label: "Projects worked on" },
              { value: site.yearsExperience, suffix: " yrs", decimals: 0, label: "Running the studio" },
              { value: site.brandsOnRetainer, suffix: "", decimals: 0, label: "Brands on retainer" },
              { value: categories.length, suffix: "", decimals: 0, label: "Disciplines covered" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={0.06 * index}>
                <TiltWrap strength={5} className="h-full">
                <div className="card flex h-full flex-col justify-between p-5">
                  <p className="display text-[2.15rem] leading-none tabular-nums">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={760}
                    />
                  </p>
                  <p className="mt-2 text-[12.5px] text-muted">{stat.label}</p>
                </div>
                </TiltWrap>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work — parked until SHOW_RECENT_WORK is flipped back on */}
      {SHOW_RECENT_WORK && (
        <section className="section-tight relative overflow-hidden border-t border-line">
        <div
          className="pointer-events-none absolute right-0 top-16 h-[180px] w-[180px] opacity-[0.14] dark:opacity-55 [mask-image:radial-gradient(circle_at_50%_50%,#000_35%,transparent_72%)] lg:block hidden"
          aria-hidden
        >
          <HeroObjectLazy className="h-full w-full" />
        </div>
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Three recent ones
                <br />
                <span className="text-muted">worth a look.</span>
              </>
            }
            copy="A gym identity, a fragrance campaign and a year of social — three ways the studio builds a system, not just a logo."
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
      )}

      {/* Categories */}
      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            eyebrow="Browse by discipline"
            title="Four drawers, one studio."
            copy="Brand identity, social media, product adverts and print — four drawers, one system underneath them."
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

      {/* Testimonials — rendered only when real quotes exist in content/work.ts */}
      {testimonials.length > 0 && (
      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            eyebrow="Kind words"
            title="What founders say after handover."
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <RevealItem key={item.name} className="h-full">
                <TiltWrap strength={4} className="h-full">
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
                </TiltWrap>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      )}

      {/* Journal */}
      <section className="section-tight relative overflow-hidden border-t border-line">
        <div
          className="pointer-events-none absolute right-2 top-24 h-[150px] w-[150px] opacity-[0.18] dark:opacity-45 [mask-image:radial-gradient(circle_at_50%_50%,#000_30%,transparent_70%)] lg:block hidden"
          aria-hidden
        >
          <HeroObjectLazy className="h-full w-full" />
        </div>
        <div className="shell relative z-10">
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
