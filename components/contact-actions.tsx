"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { site, waLink } from "@/content/site";

const HINT = "Tap it. I'm on the other side.";

/**
 * A hand-drawn connector that unspools from the button and carries a pulse
 * outward. It only draws while the button is hovered, and it flips for the
 * left-hand side so the ink leaves the button in both directions.
 */
function Connector({ side }: { side: "left" | "right" }) {
  const flip = side === "left";
  return (
    <svg
      aria-hidden
      viewBox="0 0 150 90"
      fill="none"
      className={`connect-link pointer-events-none absolute top-1/2 hidden h-[90px] w-[150px] -translate-y-1/2 md:block ${
        flip ? "right-full mr-2 scale-x-[-1]" : "left-full ml-2"
      }`}
    >
      {/* the wire: a loose travelling curve */}
      <path
        className="connect-wire"
        d="M2 58 C 26 58, 30 30, 52 30 S 84 52, 104 40 S 128 20, 146 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      {/* the little spark at the far end */}
      <path
        className="connect-spark"
        d="M146 14 V 34 M136 24 H 156"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* ink nodes the pulse passes */}
      <circle className="connect-node" style={{ transitionDelay: "180ms" }} cx="52" cy="30" r="3" fill="currentColor" />
      <circle className="connect-node" style={{ transitionDelay: "360ms" }} cx="104" cy="40" r="3" fill="currentColor" />
      {/* the pulse: a lit segment of the same wire, travelling outward */}
      <path
        className="connect-pulse"
        d="M2 58 C 26 58, 30 30, 52 30 S 84 52, 104 40 S 128 20, 146 24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={100}
      />
    </svg>
  );
}

export function ConnectButton() {
  const reduced = useReducedMotion();
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <p className="hand mb-5 text-center text-2xl text-red md:text-3xl">{HINT}</p>

      <div className="group relative">
        <Connector side="left" />
        <Connector side="right" />
        <span
          aria-hidden
          className="absolute inset-x-3 -bottom-2 h-full rounded-[999px] bg-[#8f0000]"
          style={{ transform: "translateY(10px)" }}
        />
        <motion.a
          href={waLink(`Hello ${site.owner}, I'd like to talk about a project.`)}
          target="_blank"
          rel="noreferrer noopener"
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          animate={
            reduced
              ? undefined
              : { y: pressed ? 6 : 0, boxShadow: pressed ? "0 2px 0 rgba(0,0,0,0.2)" : "0 8px 0 rgba(0,0,0,0.08)" }
          }
          whileHover={reduced ? undefined : { y: pressed ? 6 : -2 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="relative inline-flex select-none items-center justify-center gap-3 rounded-full bg-red px-10 py-6 font-display text-[clamp(1.5rem,5vw,2.4rem)] font-semibold tracking-[-0.04em] text-white shadow-[0_8px_0_rgba(0,0,0,0.08)] sm:px-14 sm:py-7"
        >
          <MessageCircle size={26} strokeWidth={1.8} />
          Connect
          <ArrowUpRight size={26} strokeWidth={1.8} className="opacity-80" />
        </motion.a>
      </div>

      <p className="mt-6 text-center text-[12px] text-muted">
        Opens WhatsApp · {site.whatsappDisplay}
      </p>
    </div>
  );
}

export function CopyField({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="eyebrow mb-1">{label}</p>
        {href ? (
          <a
            href={href}
            className="inline-flex items-center gap-1.5 truncate text-[14.5px] font-medium tracking-[-0.01em] transition-colors hover:text-red"
          >
            {icon}
            {value}
          </a>
        ) : (
          <p className="truncate text-[14.5px] font-medium tracking-[-0.01em]">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3 text-[11.5px] font-medium text-muted transition-colors hover:border-red hover:text-red"
      >
        {copied ? <Check size={13} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
