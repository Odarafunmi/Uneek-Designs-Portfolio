"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useBooking } from "@/components/providers/booking";
import { Reveal } from "./reveal";
import { site } from "@/content/site";

export function CtaBand() {
  const { openBooking } = useBooking();

  return (
    <section className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-[#0B0B0B] px-6 py-16 text-white md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(80%_120%_at_80%_120%,#EE0303_0%,rgba(238,3,3,0)_55%),radial-gradient(60%_90%_at_10%_-10%,rgba(255,90,31,0.5),transparent_60%)]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber/25 blur-[90px]" />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <Reveal>
                <p className="eyebrow mb-5 text-white/60">Next opening · {site.availability}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h1 max-w-[14ch] text-white">
                  Let&apos;s make it <span className="text-amber">unmissable.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-white/70">
                  Tell me what you&apos;re building. If it needs a brand, a campaign or a
                  feed that finally looks like the business behind it — I can help.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="md:justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn btn-lg bg-white text-[#0B0B0B] hover:bg-white/90"
                >
                  Start a project
                  <ArrowUpRight size={17} />
                </button>
                <Link
                  href="/contact"
                  className="btn btn-lg border border-white/25 text-white hover:border-white/60 hover:bg-white/5"
                >
                  Contact page
                </Link>
                <p className="text-center font-hand text-lg text-white/60 md:text-right">
                  {site.responseTime}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
