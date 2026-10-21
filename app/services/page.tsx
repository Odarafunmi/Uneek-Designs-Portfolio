import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard, TiltWrap } from "@/components/cards";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CtaBand } from "@/components/ui/cta-band";
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, social media design and product adverts — transparent pricing, WhatsApp booking and a clear process.",
};

const PROCESS = [
  {
    title: "Message",
    copy: "Tap Book, edit the pre-written WhatsApp message, send. I reply with availability and a couple of questions.",
  },
  {
    title: "Brief & quote",
    copy: "A short call or voice note, then a fixed quote and timeline. No hourly surprises.",
  },
  {
    title: "Design",
    copy: "Two rounds of concepts, presented with the reasoning. You see the thinking, not just the pixels.",
  },
  {
    title: "Handover",
    copy: "Files, exports, guidelines and a walkthrough call. Everything documented for the next person.",
  },
];

const FAQ = [
  {
    q: "How do payments work?",
    a: "50% to book the slot, 50% on final delivery. Bank transfer or Paystack — whichever is easier. Larger projects can be split across three milestones.",
  },
  {
    q: "Do you work with clients outside Lagos?",
    a: "Yes. Roughly a third of the studio's work is remote — UK, US and across Africa. Everything runs over WhatsApp, email and the occasional call.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short brief, any existing assets, and access to one decision-maker. Speed comes from clear feedback, not from compression.",
  },
  {
    q: "Can I just get a logo?",
    a: "You can, but the identity package is usually the honest answer. A mark without type, colour and rules tends to be redrawn within a year.",
  },
  {
    q: "Do you build the website too?",
    a: "For most brand projects, yes — design and Next.js build under one roof. See the web page for what that looks like.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        title={
          <>
            Clear scopes.
            <br />
            <span className="grad-text">No mystery invoices.</span>
          </>
        }
        copy="Three ways to work together, priced upfront. Every booking starts as a WhatsApp message you can edit before you send it — because a form has never closed a project."
        meta={[site.availability, site.responseTime, "Remote-friendly"]}
      />

      <section className="section-tight">
        <div className="shell">
          <RevealGroup className="grid items-stretch gap-5 md:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug} className="h-full">
                <TiltWrap strength={4} className="h-full">
                  <ServiceCard service={service} />
                </TiltWrap>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center">
              <p className="max-w-lg text-[13.5px] leading-relaxed text-muted">
                <span className="font-medium text-ink">Something custom?</span> Retainers,
                packaging systems, pitch decks and multi-market campaigns get quoted after a
                short conversation.
              </p>
              <a
                href={waLink(
                  `Hello ${site.owner}, I have a custom project I'd like to discuss. Here's what I need: `,
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-outline btn-sm shrink-0"
              >
                Describe it on WhatsApp
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section relative overflow-hidden border-y border-line bg-surface/50">
        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
              How it runs
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-4 max-w-2xl">Four steps, no black box.</h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <RevealItem key={step.title} className="h-full">
                <div className="relative h-full rounded-2xl border border-line bg-bg p-5">
                  <span className="font-hand text-3xl text-red">0{index + 1}</span>
                  <h3 className="mt-2 text-[16px] font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.copy}</p>
                  {index < PROCESS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-3 top-8 hidden text-line-strong lg:block"
                    >
                      →
                    </span>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
                Questions
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2 mt-4">The ones that come up every time.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted">
                Still unsure? Send a voice note. I answer faster than I type.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <Link href="/contact" className="btn btn-outline mt-6">
                Contact page
                <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.04}>
                <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 text-[15.5px] font-medium tracking-[-0.01em]">
                    {item.q}
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-red group-open:text-red">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[60ch] pr-10 text-[14px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
