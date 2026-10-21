"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { WorkImage } from "@/components/ui/work-image";
import { BlogCover } from "@/components/blog-cover";
import { useBooking } from "@/components/providers/booking";
import type {
  ArtVariant,
  Category,
  Post,
  Project,
  Service,
  WebProject,
} from "@/content/types";
import { formatDate } from "@/content/posts";


const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/**
 * Card that leans toward the pointer.
 *
 * The whole card is rotated by up to ~7° on each axis and lifted slightly, then
 * snaps back on leave. `.card` supplies the red halo (see globals.css), so the
 * tilt only has to handle geometry. Exported so pages can wrap plain cards too.
 */
export function TiltWrap({
  children,
  className = "",
  strength = 9,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`tilt-wrap ${className}`}
      onPointerMove={(event) => {
        const el = event.currentTarget;
        if (event.pointerType === "touch") return;
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--tilt-x", `${(-py * strength).toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${(px * strength).toFixed(2)}deg`);
        el.style.setProperty("--tilt-lift", "1.018");
        el.dataset.tilting = "true";
      }}
      onPointerLeave={(event) => {
        const el = event.currentTarget;
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
        el.style.setProperty("--tilt-lift", "1");
        el.dataset.tilting = "false";
      }}
    >
      {children}
    </div>
  );
}

export function CategoryCard({
  category,
  count,
  index = 0,
  feature = false,
}: {
  category: Category;
  count: number;
  index?: number;
  /** Larger bento tile — wider media, bigger type. */
  feature?: boolean;
}) {
  return (
    <TiltWrap>
      <Link
        href={`/work/${category.slug}`}
        data-cursor="View"
        className="card card-hover group flex h-full flex-col overflow-hidden"
      >
        <div
          className={`relative overflow-hidden bg-surface ${
            feature ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <div className="zoom-img relative h-full w-full p-2">
            <WorkImage
              src={category.cover}
              variant={category.art}
              label={category.name}
              seed={index}
              sizes={CARD_SIZES}
            />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="arrow-badge absolute right-4 top-4 bg-white/85 text-black backdrop-blur-md border-white/40">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          <div>
            <h3 className={feature ? "h2 min-w-0" : "h3 min-w-0"}>{category.name}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{category.tagline}</p>
            <p className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
              {count} {count === 1 ? "project" : "projects"}
            </p>
          </div>
          <p className="text-[12px] font-medium text-red-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View category
          </p>
        </div>
      </Link>
    </TiltWrap>
  );
}

export function ProjectCard({
  project,
  index = 0,
  aspect = "aspect-[4/3]",
}: {
  project: Project;
  index?: number;
  /** Media frame — portrait suits brand-book pages, landscape suits product art. */
  aspect?: string;
}) {
  const content = (
    <>
      <div className={`relative ${aspect} overflow-hidden bg-surface`}>
        <div className="zoom-img relative h-full w-full p-2">
          <WorkImage
            src={project.cover}
            variant={project.art}
            label={project.title}
            seed={index}
            sizes={CARD_SIZES}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {project.year}
        </span>
        <span className="arrow-badge absolute right-4 top-4 bg-white/85 text-black backdrop-blur-md border-white/40">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{project.title}</h3>
        <p className="mt-1 text-[13px] text-muted">{project.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.deliverables.slice(0, 2).map((d) => (
            <span key={d} className="chip">
              {d}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <TiltWrap className="h-full">
      {project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="card card-hover group flex h-full flex-col overflow-hidden"
        >
          {content}
        </a>
      ) : (
        <Link
          href={`/work/${project.category}/${project.slug}`}
          data-cursor="View"
          className="card card-hover group flex h-full flex-col overflow-hidden"
          aria-label={`${project.title} — view details`}
        >
          {content}
        </Link>
      )}
    </TiltWrap>
  );
}

export function WebProjectCard({ project, index = 0 }: { project: WebProject; index?: number }) {
  return (
    <TiltWrap className="h-full">
      <article className="card card-hover group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="zoom-img relative h-full w-full">
            <WorkImage
              src={project.cover}
              variant={project.art}
              label={project.title}
              seed={index}
              sizes={CARD_SIZES}
            />
          </div>
          <span className="arrow-badge absolute right-4 top-4 bg-white/85 text-black backdrop-blur-md border-white/40">
            <ExternalLink size={15} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{project.title}</h3>
            <span className="text-[11px] tabular-nums text-muted">{project.year}</span>
          </div>
          <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={project.liveUrl.startsWith("/") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-red"
            >
              Live site
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </article>
    </TiltWrap>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const { openService } = useBooking();
  const featured = service.featured;

  return (
    <div
      className={`card card-hover relative flex h-full flex-col overflow-hidden ${
        featured ? "border-transparent text-white" : ""
      }`}
      style={featured ? { background: "linear-gradient(152deg,#950000 0%,#C40000 30%,#EE0303 66%,#FF3B3B 100%)", boxShadow: "0 30px 70px -40px rgba(238,3,3,0.9)" } : undefined}
    >
      {featured && (
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_80%_0%,#fff,transparent_55%)]" />
      )}
      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${
              featured ? "bg-white/20 text-white" : "bg-surface-2 text-muted"
            }`}
          >
            {featured && <Sparkles size={11} />}
            {service.badge ?? "Service"}
          </span>
        </div>

        <h3 className={`mt-6 text-[22px] font-semibold tracking-[-0.03em] ${featured ? "text-white" : "text-ink"}`}>
          {service.name}
        </h3>
        <p className={`mt-2 text-[13.5px] leading-relaxed ${featured ? "text-white/85" : "text-muted"}`}>
          {service.summary}
        </p>

        <div className={`mt-6 flex items-baseline gap-2 ${featured ? "text-white" : "text-ink"}`}>
          <span className="display text-[2.1rem] leading-none">{service.price}</span>
          <span className={`text-[11.5px] font-medium ${featured ? "text-white/70" : "text-muted"}`}>
            {service.cadence}
          </span>
        </div>

        <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-5 text-[13.5px] ${featured ? "border-white/25" : "border-line"}`}>
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className={`mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  featured ? "bg-white/25 text-white" : "bg-red/10 text-red"
                }`}
              >
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6.5 4.8 9 10 3.2" />
                </svg>
              </span>
              <span className={featured ? "text-white/90" : "text-muted"}>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openService(service)}
          className={`btn mt-7 w-full ${
            featured ? "bg-white text-[#111] hover:bg-white/90" : "btn-outline"
          }`}
        >
          Book this service
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <TiltWrap className="h-full">
      <Link
      href={`/blog/${post.slug}`}
      data-cursor="Read"
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="zoom-img h-full w-full">
            <BlogCover slug={post.slug} index={index} />
          </div>
          <span className="arrow-badge absolute right-4 top-4 bg-white/85 text-black backdrop-blur-md border-white/40">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-red" />
            <span>{post.readingTime}</span>
          </div>
          <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </TiltWrap>
  );
}
