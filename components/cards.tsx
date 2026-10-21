"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { CoverArt } from "@/components/art";
import { WorkImage } from "@/components/ui/work-image";
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

const tilt = {
  rest: { rotateX: 0, rotateY: 0, y: 0 },
};

/** Card that leans a couple of degrees toward the pointer. */
function TiltWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="rest"
      animate="rest"
      whileHover="hover"
      onPointerMove={(event) => {
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        target.style.setProperty("--tilt-x", `${(-py * 3).toFixed(2)}deg`);
        target.style.setProperty("--tilt-y", `${(px * 3).toFixed(2)}deg`);
      }}
      onPointerLeave={(event) => {
        const target = event.currentTarget as HTMLElement;
        target.style.setProperty("--tilt-x", "0deg");
        target.style.setProperty("--tilt-y", "0deg");
      }}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </motion.div>
  );
}

export function CategoryCard({
  category,
  count,
  index = 0,
}: {
  category: Category;
  count: number;
  index?: number;
}) {
  return (
    <TiltWrap>
      <Link
        href={`/work/${category.slug}`}
        className="card card-hover group flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[5/4] overflow-hidden">
          <div className="zoom-img relative h-full w-full">
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
            <h3 className="h3 min-w-0">{category.name}</h3>
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
}: {
  project: Project;
  index?: number;
}) {
  const content = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="zoom-img relative h-full w-full">
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
      <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="zoom-img h-full w-full">
            <CoverArt variant={post.art} label={post.title} />
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
