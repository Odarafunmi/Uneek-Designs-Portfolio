"use client";

import dynamic from "next/dynamic";

/**
 * Client-only boundary so the three.js bundle is never part of the initial JS.
 * Only mounts on capable devices and when it scrolls into view (see HeroObject).
 */
export const HeroObjectLazy = dynamic(
  () => import("@/components/hero-object").then((mod) => mod.HeroObject),
  { ssr: false },
);
