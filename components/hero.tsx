"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site, waLink } from "@/content/site";
import { CountUp } from "@/components/ui/count-up";

const ROTATING = ["Brand Identity", "Product Adverts", "Social Media Design", "Web Projects"];
const SLIDE_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % 2) + 2) % 2);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, reduced, go]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setRotation((r) => r + 1), 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  const swipe = reduced
    ? {}
    : {
        drag: "x" as const,
        dragConstraints: { left: 0, right: 0 },
        dragElastic: 0.12,
        onDragEnd: (_: unknown, info: { offset: { x: number } }) => {
          if (info.offset.x < -60) go(1);
          if (info.offset.x > 60) go(-1);
        },
      };

  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex flex-col overflow-hidden pb-1 pt-24 md:min-h-[100svh] md:pt-28"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mesh mesh-soft">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>

      <div className="relative z-10 grid flex-1" style={{ touchAction: "pan-y" }}>
        {[0, 1].map((slide) => {
          const active = index === slide;
          return (
            <motion.div
              key={slide}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-hidden={!active}
              inert={!active}
              {...swipe}
              className="col-start-1 row-start-1 flex cursor-grab flex-col active:cursor-grabbing"
              style={{
                zIndex: active ? 2 : 1,
                pointerEvents: active ? "auto" : "none",
              }}
            >
              {slide === 0 ? (
                <SlideOne rotation={rotation} reduced={!!reduced} />
              ) : (
                <SlideTwo reduced={!!reduced} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls ride on the faded base of the poster */}
      <div className="shell pointer-events-none relative z-30 flex items-center justify-between gap-6 pb-3 pt-1 md:pb-5 md:pt-2">
        <div className="pointer-events-auto flex items-center gap-2.5">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={index === i}
              className="group relative h-1.5 overflow-hidden rounded-full bg-line-strong transition-all"
              style={{ width: index === i ? 44 : 18 }}
            >
              <span
                className="absolute inset-0 origin-left rounded-full bg-red transition-transform duration-500"
                style={{ transform: index === i ? "scaleX(1)" : "scaleX(0)" }}
              />
            </button>
          ))}
          <span className="ml-2 text-[11px] font-medium tabular-nums text-muted">
            0{index + 1} / 02
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg/60 text-ink backdrop-blur transition-colors hover:border-red hover:text-red"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg/60 text-ink backdrop-blur transition-colors hover:border-red hover:text-red"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Slide 1 — the poster. No photograph: type only, DESIGNER anchored at the base.
--------------------------------------------------------------------------- */
function SlideOne({ rotation, reduced }: { rotation: number; reduced: boolean }) {
  const current = ROTATING[rotation % ROTATING.length];

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="shell relative z-20 grid content-start gap-7 pt-4 md:flex-1 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-12 md:pt-12">
        {/* Left: the pitch */}
        <div>
          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="eyebrow mb-5"
          >
            Portfolio
          </motion.p>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur"
          >
            <span className="availability-dot" />
            Available for work
          </motion.p>

          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
            className="mt-6 max-w-[13ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            Creative Designer based in {site.location.split(",")[0]}
          </motion.h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="hand mt-6 text-2xl text-red-ink md:text-[28px]"
          >
            Big ideas, tidy systems
          </motion.p>
        </div>

        {/* Right: the micro-copy that balances the poster */}
        <div className="md:justify-self-end md:pt-14 md:text-left">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="max-w-[290px]"
          >
            <span className="flex items-center gap-2.5">
              <span className="eyebrow shrink-0">I design</span>
              <span className="relative block h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={reduced ? undefined : { y: "115%", opacity: 0 }}
                    animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                    exit={reduced ? undefined : { y: "-115%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="block whitespace-nowrap font-display text-[13px] font-medium tracking-[-0.02em] text-red-ink md:text-[14px]"
                  >
                    {current}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>

            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
              I&apos;m {site.owner}, a brand and product designer helping small teams look
              like the business they&apos;re becoming — identity, adverts, social and the
              odd website.
            </p>

            <a
              href={waLink(`Hello ${site.owner}, I'd like to talk about a project.`)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary btn-sm mt-5"
            >
              Say hello
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* The poster word, clipped by the base of the hero */}
      <div className="relative z-10 mt-8 select-none md:mt-auto">
        <motion.p
          initial={reduced ? undefined : { y: 60, opacity: 0 }}
          animate={reduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
          className="poster-word translate-y-0 md:translate-y-[6%]"
        >
          Designer
        </motion.p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Slide 2 — the founder. Portrait in an arch, ghost word, floating tags + stats.
--------------------------------------------------------------------------- */
function SlideTwo({ reduced }: { reduced: boolean }) {
  const stagger = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 16 },
    animate: reduced ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="shell relative flex flex-1 flex-col">
        {/* Ghost word behind the portrait */}
        <div className="pointer-events-none absolute inset-x-0 top-[13%] z-0 overflow-hidden">
          <p className="ghost-word">{site.owner}</p>
        </div>

        {/* Portrait, tags and stat cards */}
        <div className="relative z-10 mx-auto mt-2 flex w-full max-w-[720px] flex-1 flex-col justify-center md:mt-2">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="relative mx-auto w-[260px] sm:w-[310px] md:w-[380px]"
          >
            <div
              className="portrait-shell fade-bottom relative w-full"
              style={{ height: "clamp(280px, min(36vw, 40vh), 440px)" }}
            >
              <Portrait />
            </div>

            {/* floating discipline tags */}
            <motion.span
              {...stagger(0.3)}
              className="tag-pill absolute -left-10 top-[26%] -rotate-[9deg] sm:-left-24 md:-left-32"
            >
              Brand identity
            </motion.span>
            <motion.span
              {...stagger(0.38)}
              className="tag-pill absolute -right-6 top-[16%] rotate-[7deg] sm:-right-20 md:-right-24"
            >
              Product design
            </motion.span>
            <motion.span
              {...stagger(0.46)}
              className="tag-pill absolute -right-2 bottom-[30%] rotate-[5deg] sm:-right-12"
            >
              Social media
            </motion.span>

            {/* floating stats */}
            <motion.div
              {...stagger(0.34)}
              className="float-card absolute -left-6 bottom-[4%] hidden w-[168px] sm:block md:-left-24"
            >
              <p className="text-[11px] leading-tight text-muted">Years crafting brands</p>
              <p className="mt-1 font-display text-[26px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                <CountUp value={site.yearsExperience} suffix="+" duration={900} />
              </p>
            </motion.div>
            <motion.div
              {...stagger(0.42)}
              className="float-card absolute -right-6 bottom-[-13%] hidden w-[170px] sm:block md:-right-20"
            >
              <p className="text-[11px] leading-tight text-muted">Projects worked on</p>
              <p className="mt-1 font-display text-[26px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                <CountUp value={site.projectsDelivered} suffix="+" duration={1000} />
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Primary actions, centred under the portrait */}
        <div className="relative z-20 mt-8 flex justify-center pb-2 md:mt-10">
          <motion.div {...stagger(0.3)} className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/services" className="btn btn-primary">
              Book a service
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Say hello
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Stylised portrait placeholder — swap in a real photo via <Image />. */
function Portrait() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="figure" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#241A16" />
          <stop offset="100%" stopColor="#120C0A" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFE1E1" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <path d="M30 500c6-92 48-150 114-170h112c66 20 108 78 114 170Z" fill="url(#figure)" />
      <path
        d="M148 340c16 22 34 34 52 34s36-12 52-34"
        stroke="#FFE1E1"
        strokeOpacity="0.16"
        strokeWidth="3"
        fill="none"
      />
      <path d="M174 280h52v66c0 14-52 14-52 0Z" fill="#1B1210" />
      <ellipse cx="200" cy="212" rx="74" ry="86" fill="url(#figure)" />

      <g fill="url(#figure)">
        <circle cx="136" cy="196" r="42" />
        <circle cx="264" cy="196" r="42" />
        <circle cx="168" cy="140" r="44" />
        <circle cx="232" cy="140" r="44" />
        <circle cx="200" cy="128" r="46" />
        <ellipse cx="200" cy="196" rx="76" ry="70" />
      </g>

      <path
        d="M200 146c30 0 52 26 52 62 0 40-23 72-52 72s-52-32-52-72c0-36 22-62 52-62Z"
        fill="#2C2019"
      />
      <path
        d="M252 168c10 16 14 36 12 58-2 24-12 44-26 58"
        stroke="url(#rim)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <g stroke="#FFE1E1" strokeOpacity="0.92" strokeWidth="4" fill="none" strokeLinecap="round">
        <rect x="154" y="188" width="42" height="32" rx="12" fill="#FFE1E1" fillOpacity="0.14" />
        <rect x="204" y="188" width="42" height="32" rx="12" fill="#FFE1E1" fillOpacity="0.14" />
        <path d="M196 202h8" />
        <path d="M154 198l-12-4M246 198l12-4" />
      </g>

      <path
        d="M186 246c9 8 19 8 28 0"
        stroke="#FFE1E1"
        strokeOpacity="0.55"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="146" cy="238" r="4.5" fill="#FFE1E1" fillOpacity="0.85" />
      <path d="M170 378h60" stroke="#FFE1E1" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}
