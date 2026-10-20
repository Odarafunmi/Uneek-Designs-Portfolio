"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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

  // Rotating list above the headline.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setRotation((r) => r + 1), 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden pb-16 pt-24 md:pb-20 md:pt-28"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Gradient mesh */}
      <div className="mesh mesh-soft">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>

      {/* Top meta row */}
      <div className="shell relative z-10 flex flex-wrap items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          <span className="availability-dot" />
          {site.availability}
        </p>
        <p className="font-hand text-lg text-muted md:text-xl">
          {site.role} · {site.location}
        </p>
      </div>

      {/* Slides */}
      <div
        className="relative z-10 mt-8 min-h-[420px] md:mt-10 md:min-h-[470px]"
        style={{ touchAction: "pan-y" }}
      >
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
      <div className="shell relative z-20 mt-10 flex items-center justify-between gap-6">
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

function SlideOne({ rotation, reduced }: { rotation: number; reduced: boolean }) {
  const current = ROTATING[rotation % ROTATING.length];

  return (
    <div className="relative">
      <div className="shell">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="eyebrow shrink-0">I design</span>
            <span className="relative block h-7 overflow-hidden md:h-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current}
                  initial={reduced ? undefined : { y: "110%", opacity: 0 }}
                  animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                  exit={reduced ? undefined : { y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="block font-display text-[19px] font-medium tracking-[-0.03em] text-red md:text-[22px]"
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <p className="max-w-[290px] text-[13px] leading-relaxed text-muted md:text-right">
            Six years of branding, campaigns and code for brands that would rather be
            remembered than liked.
          </p>
        </div>
      </div>

      {/* Giant word */}
      <div className="relative mt-4 select-none md:mt-2">
        <motion.h1
          initial={reduced ? undefined : { x: -18, opacity: 0 }}
          animate={reduced ? undefined : { x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.06 }}
          className="giant whitespace-nowrap text-center text-ink"
          style={{ fontSize: "clamp(2.9rem, 16.8vw, 15.6rem)" }}
        >
          Portfolio
        </motion.h1>

      </div>

      <div className="shell mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="hand text-2xl leading-tight text-ink md:text-[28px]">
            Big ideas, tidy systems, red everything.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            I&apos;m {site.owner} — a brand and product designer building identities that
            small teams can actually run.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
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

      <div className="shell mt-10 hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted md:flex">
        <ArrowDown size={13} className="animate-bounce" />
        Scroll to explore
      </div>
    </div>
  );
}

function SlideTwo({ reduced }: { reduced: boolean }) {
  return (
    <div className="shell relative">
      {/* Giant DESIGNER text sits behind the arch */}
      <div className="relative mx-auto max-w-[1100px]">
        <motion.h1
          initial={reduced ? undefined : { x: 24, opacity: 0 }}
          animate={reduced ? undefined : { x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.04 }}
          aria-label={`${site.role} — ${site.owner}`}
          className="giant pointer-events-none absolute inset-x-0 top-[42%] z-0 select-none whitespace-nowrap text-center text-ink"
          style={{ fontSize: "clamp(2.9rem, 18vw, 16.4rem)" }}
        >
          Designer
        </motion.h1>

        <div className="absolute right-[3%] top-[6%] z-0 hidden w-[260px] xl:block">
          <HeroObject className="aspect-square w-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-2 md:pt-0">
          <motion.div
            initial={reduced ? undefined : { y: 34, opacity: 0, scale: 0.97 }}
            animate={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.12 }}
            className="arch arch-grad relative w-[248px] shadow-[0_40px_90px_-40px_rgba(238,3,3,0.75)] sm:w-[292px] md:w-[330px]"
            style={{ height: "clamp(320px, 40vw, 430px)" }}
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_10%,#fff,transparent_60%)]" />
            <Portrait />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-white/15 px-3.5 py-2 backdrop-blur-md">
              <span className="text-[12px] font-medium tracking-[-0.01em] text-white">
                {site.owner}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/80">
                Founder
              </span>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-col items-center gap-4 text-center md:mt-10">
            <motion.p
              initial={reduced ? undefined : { y: 16, opacity: 0 }}
              animate={reduced ? undefined : { y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              className="max-w-lg text-[14px] leading-relaxed text-muted md:text-[15px]"
            >
              Brand identity, product adverts and social systems — designed in Lagos,
              shipped everywhere.
            </motion.p>
            <motion.div
              initial={reduced ? undefined : { y: 16, opacity: 0 }}
              animate={reduced ? undefined : { y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
              className="flex flex-wrap items-center justify-center gap-2.5"
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
          <stop offset="0%" stopColor="#FFB020" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFE3DC" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* shoulders / turtleneck */}
      <path
        d="M30 500c6-92 48-150 114-170h112c66 20 108 78 114 170Z"
        fill="url(#figure)"
      />
      <path d="M148 340c16 22 34 34 52 34s36-12 52-34" stroke="#FFE3DC" strokeOpacity="0.16" strokeWidth="3" fill="none" />

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

      {/* face plane, lifted slightly out of the hair */}
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
      <g stroke="#FFB020" strokeOpacity="0.9" strokeWidth="4" fill="none" strokeLinecap="round">
        <rect x="154" y="188" width="42" height="32" rx="12" fill="#FFB020" fillOpacity="0.14" />
        <rect x="204" y="188" width="42" height="32" rx="12" fill="#FFB020" fillOpacity="0.14" />
        <path d="M196 202h8" />
        <path d="M154 198l-12-4M246 198l12-4" />
      </g>

      {/* smile */}
      <path
        d="M186 246c9 8 19 8 28 0"
        stroke="#FFE3DC"
        strokeOpacity="0.55"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* earring + collar detail */}
      <circle cx="146" cy="238" r="4.5" fill="#FFB020" fillOpacity="0.85" />
      <path d="M170 378h60" stroke="#FFE3DC" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}
