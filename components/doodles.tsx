"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type Shape = "star" | "arrow" | "squiggle" | "spiral" | "asterisk" | "circle" | "plus" | "zigzag";

type Doodle = {
  shape: Shape;
  /** viewport position, in % */
  x: number;
  y: number;
  size: number;
  rotate: number;
  depth: number;
  red?: boolean;
  hideOnMobile?: boolean;
  float?: string;
};

const DOODLES: Doodle[] = [
  { shape: "star", x: 4, y: 30, size: 30, rotate: -12, depth: 1.5, red: true, hideOnMobile: true },
  { shape: "squiggle", x: 91, y: 10, size: 68, rotate: 8, depth: 0.8, hideOnMobile: true },
  { shape: "arrow", x: 91, y: 47, size: 60, rotate: -24, depth: 1.2 },
  { shape: "circle", x: 3, y: 63, size: 78, rotate: 0, depth: 0.6, hideOnMobile: true },
  { shape: "asterisk", x: 83, y: 74, size: 38, rotate: 14, depth: 1.8, red: true },
  { shape: "zigzag", x: 55, y: 90, size: 62, rotate: -6, depth: 1, hideOnMobile: true },
  { shape: "plus", x: 49, y: 5, size: 24, rotate: 0, depth: 2.2, hideOnMobile: true },
  { shape: "spiral", x: 72, y: 95, size: 50, rotate: 0, depth: 1.4, hideOnMobile: true },
];

function DoodlePath({ shape }: { shape: Shape }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (shape) {
    case "star":
      return (
        <path
          d="M30 2c2.5 12.5 4.9 17.9 8 24.1 2.6 5.1 6.6 7.6 12 8.6-5.4 1-9.4 3.5-12 8.6-3.1 6.2-5.5 11.6-8 24.1-2.5-12.5-4.9-17.9-8-24.1-2.6-5.1-6.6-7.6-12-8.6 5.4-1 9.4-3.5 12-8.6 3.1-6.2 5.5-11.6 8-24.1Z"
          fill="currentColor"
        />
      );
    case "arrow":
      return (
        <>
          <path d="M4 44C18 10 44 4 70 12" {...common} />
          <path d="M70 12 56 9M70 12l-2 14" {...common} />
        </>
      );
    case "squiggle":
      return <path d="M2 20c10-18 20 18 30 0s20 18 30 0 14 8 20 2" {...common} />;
    case "circle":
      return (
        <>
          <path d="M38 6c20 0 36 15 36 34S58 74 38 74 2 59 2 40" {...common} />
          <path d="M6 24C12 10 24 4 38 4" {...common} strokeWidth={3} />
          <path d="M30 79l10-6-9-7" {...common} strokeWidth={2.2} />
        </>
      );
    case "asterisk":
      return (
        <>
          <path d="M20 2v36M2 20h36M7 7l26 26M33 7 7 33" {...common} strokeWidth={2.4} />
        </>
      );
    case "plus":
      return <path d="M13 2v22M2 13h22" {...common} strokeWidth={2.6} />;
    case "zigzag":
      return <path d="M2 22 14 6l12 16L38 6l12 16L62 6" {...common} />;
    case "spiral":
      return (
        <path
          d="M28 28a5 5 0 1 0 5-5 10 10 0 1 0 10 10 16 16 0 1 0-16 16 22 22 0 0 0 22-22"
          {...common}
        />
      );
    default:
      return null;
  }
}

export function Doodles() {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 });
  const smoothScroll = useSpring(scrollY, { stiffness: 70, damping: 22 });

  const frame = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
        pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
      });
    };
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pointerX, pointerY, scrollY, reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {DOODLES.map((doodle, index) => {
        const x = useTransform(smoothX, (v) => v * 18 * doodle.depth);
        const y = useTransform(
          [smoothY, smoothScroll] as const,
          ([py, sy]: number[]) => py * 16 * doodle.depth + sy * -0.06 * doodle.depth,
        );

        return (
          <motion.div
            key={`${doodle.shape}-${index}`}
            className={`doodle ${doodle.red ? "doodle--red" : ""} ${doodle.hideOnMobile ? "hidden lg:block" : ""}`}
            style={{
              left: `${doodle.x}%`,
              top: `${doodle.y}%`,
              x,
              y,
              rotate: doodle.rotate,
              opacity: 0.55,
            }}
            initial={reduced ? undefined : { opacity: 0, scale: 0.7 }}
            whileInView={reduced ? undefined : { opacity: 0.55, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={reduced ? "" : "doodle--float"}
              style={{ ["--r" as string]: `${doodle.rotate}deg`, animationDelay: `${index * 0.7}s` }}
            >
              <svg
                width={doodle.size}
                height={doodle.size}
                viewBox="0 0 80 80"
                className="overflow-visible"
              >
                <DoodlePath shape={doodle.shape} />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
