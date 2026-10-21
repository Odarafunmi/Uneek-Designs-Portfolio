"use client";

import Image from "next/image";
import { useState } from "react";
import { CoverArt } from "@/components/art";
import type { ArtVariant } from "@/content/types";

/**
 * A hosted project image that degrades gracefully.
 *
 * The portfolio shots live in a public Google Drive folder and are loaded straight
 * from Drive's thumbnail endpoint (`unoptimized`), so the server never has to fetch
 * them. If a file is moved, unshared or the network blocks it, the generated SVG
 * cover takes its place instead of a broken image.
 */
export function WorkImage({
  src,
  variant,
  label,
  sizes,
  seed,
  fit = "contain",
  priority = false,
  className,
}: {
  src?: string;
  variant: ArtVariant;
  label: string;
  sizes: string;
  seed?: number;
  /** `contain` shows the whole picture (no cropping), `cover` fills the frame. */
  fit?: "contain" | "cover";
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <CoverArt variant={variant} label={label} seed={seed} />;

  return (
    <Image
      src={src}
      alt={label}
      fill
      unoptimized
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
      className={className ?? (fit === "contain" ? "object-contain" : "object-cover")}
    />
  );
}
