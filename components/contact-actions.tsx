"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { site, waLink } from "@/content/site";

const HINT = "Tap it. I'm on the other side.";

export function ConnectButton() {
  const reduced = useReducedMotion();
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <p className="hand mb-5 text-center text-2xl text-red md:text-3xl">{HINT}</p>

      <div className="relative">
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
