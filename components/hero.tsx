"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site, waLink } from "@/content/site";

const HeroObject = dynamic(
  () => import("@/components/hero-object").then((mod) => mod.HeroObject),
  { ssr: false },
);

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

  // Rotating discipline list in the top bar.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setRotation((r) => r + 1), 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden pb-10 pt-24 md:pb-12 md:pt-24"
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

      <div className="relative z-10 md:min-h-[620px]" style={{ touchAction: "pan-y" }}>
        <AnimatePresence initial={false} mode="wait">
          {index === 0 ? (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                if (info.offset.x > 60) go(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <SlideOne rotation={rotation} reduced={!!reduced} />
            </motion.div>
          ) : (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                if (info.offset.x > 60) go(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <SlideTwo reduced={!!reduced} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="shell relative z-20 mt-7 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red hover:text-red"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-red hover:text-red"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Slide 1 — the poster. One giant word, one portrait, almost nothing else.
--------------------------------------------------------------------------- */
function SlideOne({ rotation, reduced }: { rotation: number; reduced: boolean }) {
  const current = ROTATING[rotation % ROTATING.length];

  return (
    <div className="relative">
      <div className="shell relative z-30 flex items-center justify-between gap-4">
        <span className="eyebrow">Portfolio</span>

        <span className="flex items-center gap-2.5">
          <span className="eyebrow hidden shrink-0 sm:inline">I design</span>
          <span className="relative block h-5 overflow-hidden text-right sm:text-left md:h-7">
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={reduced ? undefined : { y: "115%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                exit={reduced ? undefined : { y: "-115%", opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="block whitespace-nowrap font-display text-[13px] font-medium tracking-[-0.02em] text-red-ink md:text-[17px]"
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </div>

      {/* Giant word: full-bleed, dissolving into the portrait below */}
      <div className="relative mt-5 md:mt-7">
        <motion.h1
          initial={reduced ? undefined : { y: -18, opacity: 0 }}
          animate={reduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
          className="designer-word"
        >
          Designer
          <span className="sr-only">
            {" "}
            — {site.owner}, {site.role} in {site.location}
          </span>
        </motion.h1>
      </div>

      {/* Portrait container, tucked into the faded base of the word */}
      <div className="relative z-20 -mt-[6vw] flex justify-center md:-mt-[3.2vw]">
        <motion.div
          initial={reduced ? undefined : { y: 40, opacity: 0, scale: 0.97 }}
          animate={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.14 }}
          className="portrait-shell fade-bottom w-[236px] sm:w-[286px] md:w-[330px]"
          style={{ height: "clamp(250px, min(37vw, 42vh), 395px)" }}
        >
          <Portrait />
        </motion.div>
      </div>

      {/* The only other copy on the slide */}
      <div className="shell relative z-30 mt-5 flex flex-col items-center gap-5 text-center md:mt-7 md:flex-row md:items-end md:justify-between md:text-left">
        <p className="hand text-[26px] leading-none text-ink md:text-[32px]">
          Big ideas, tidy systems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Link href="/work" className="btn btn-primary">
            See the work
            <ArrowUpRight size={16} />
          </Link>
          <a
            href={waLink(`Hello ${site.owner}, I'd like to talk about a project.`)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-outline"
          >
            Start a project
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Slide 2 — About the founder. Everything the poster deliberately leaves out.
--------------------------------------------------------------------------- */
function SlideTwo({ reduced }: { reduced: boolean }) {
  const facts = useMemo(
    () => [
      { value: `${site.yearsExperience} yrs`, label: "Running the studio" },
      { value: `${site.projectsDelivered}+`, label: "Projects shipped" },
      { value: "12", label: "Brands on retainer" },
    ],
    [],
  );

  return (
    <div className="shell relative z-10">

      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow flex items-center gap-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
            About the founder
          </motion.p>

          <motion.h2
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="h1 mt-4"
          >
            Peculiar
          </motion.h2>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="hand mt-3 text-2xl text-muted md:text-[26px]"
          >
            {site.role} · {site.location}
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-xl space-y-4 text-[14.5px] leading-relaxed text-muted md:text-[15px]"
          >
            <p>
              Six years of branding, campaigns and code for brands that would rather be
              remembered than liked.
            </p>
            <p>
              I build systems, not one-off files — identity, adverts, social and the
              occasional website, all pulled from the same visual logic and documented
              well enough for a small team to run.
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            <Link href="/services" className="btn btn-primary">
              Book a service
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Say hello
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -right-10 -top-14 z-20 hidden w-[150px] xl:block">
            <HeroObject className="aspect-square w-full" />
          </div>

          <div className="card relative overflow-hidden p-6">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full opacity-25 blur-3xl [background:var(--grad-brand)]" />
            <p className="relative inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              <span className="availability-dot" />
              {site.availability}
            </p>

            <dl className="relative mt-6 divide-y divide-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[12.5px] text-muted">{fact.label}</dt>
                  <dd className="display text-[1.6rem] leading-none">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="hand relative mt-5 text-xl text-red-ink">{site.responseTime}</p>
          </div>
        </motion.div>
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

      {/* shoulders / turtleneck */}
      <path d="M30 500c6-92 48-150 114-170h112c66 20 108 78 114 170Z" fill="url(#figure)" />
      <path
        d="M148 340c16 22 34 34 52 34s36-12 52-34"
        stroke="#FFE1E1"
        strokeOpacity="0.16"
        strokeWidth="3"
        fill="none"
      />

      {/* neck */}
      <path d="M174 280h52v66c0 14-52 14-52 0Z" fill="#1B1210" />

      {/* head */}
      <ellipse cx="200" cy="212" rx="74" ry="86" fill="url(#figure)" />

      {/* afro silhouette */}
      <g fill="url(#figure)">
        <circle cx="136" cy="196" r="42" />
        <circle cx="264" cy="196" r="42" />
        <circle cx="168" cy="140" r="44" />
        <circle cx="232" cy="140" r="44" />
        <circle cx="200" cy="128" r="46" />
        <ellipse cx="200" cy="196" rx="76" ry="70" />
      </g>

      {/* face plane */}
      <path
        d="M200 146c30 0 52 26 52 62 0 40-23 72-52 72s-52-32-52-72c0-36 22-62 52-62Z"
        fill="#2C2019"
      />

      {/* rim light */}
      <path
        d="M252 168c10 16 14 36 12 58-2 24-12 44-26 58"
        stroke="url(#rim)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* glasses */}
      <g stroke="#FFE1E1" strokeOpacity="0.92" strokeWidth="4" fill="none" strokeLinecap="round">
        <rect x="154" y="188" width="42" height="32" rx="12" fill="#FFE1E1" fillOpacity="0.14" />
        <rect x="204" y="188" width="42" height="32" rx="12" fill="#FFE1E1" fillOpacity="0.14" />
        <path d="M196 202h8" />
        <path d="M154 198l-12-4M246 198l12-4" />
      </g>

      {/* smile */}
      <path
        d="M186 246c9 8 19 8 28 0"
        stroke="#FFE1E1"
        strokeOpacity="0.55"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* earring + collar detail */}
      <circle cx="146" cy="238" r="4.5" fill="#FFE1E1" fillOpacity="0.85" />
      <path d="M170 378h60" stroke="#FFE1E1" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}
