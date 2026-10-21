import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ScanLine,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { TiltWrap } from "@/components/cards";
import { Reveal } from "@/components/ui/reveal";
import { ConnectButton, CopyField } from "@/components/contact-actions";
import { site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Message Uneek Designs on WhatsApp, scan the QR code, call or email — and view the full portfolio on Google Drive.",
};

const SOCIALS = [
  { label: "Instagram", href: site.instagram },
  { label: "Behance", href: site.behance },
  { label: "LinkedIn", href: site.linkedin },
  { label: "X / Twitter", href: site.x },
];

const DAYS = [
  { day: "Monday – Friday", hours: "9:00 — 18:00" },
  { day: "Saturday", hours: "10:00 — 14:00" },
  { day: "Sunday", hours: "Closed (usually drawing)" },
];

export default async function ContactPage() {
  const qrSvg = await QRCode.toString(waLink(`Hello ${site.owner}, I found your portfolio.`), {
    type: "svg",
    margin: 1,
    width: 220,
    errorCorrectionLevel: "M",
    color: { dark: "#0A0A0A", light: "#FFFFFF" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s make
            <br />
            <span className="grad-text">something loud.</span>
          </>
        }
        copy="One button, no contact form. Tell me what you're building and when you need it — I'll tell you honestly whether I'm the right person for it."
        meta={[site.availability, site.location, site.timezone]}
      />

      {/* Oversized connect */}
      <section className="relative overflow-hidden pb-16">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-14 text-center md:py-20">
              <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(60%_80%_at_50%_120%,rgba(238,3,3,0.22),transparent_70%)]" />
              <div className="relative">
                <ConnectButton />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QR + details */}
      <section className="section-tight">
        <div className="shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <TiltWrap strength={4} className="h-full">
            <div className="card flex h-full flex-col items-center justify-center gap-5 p-7 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted">
                <ScanLine size={12} />
                Scan to chat
              </div>
              <div
                className="w-[210px] overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-sm [&>svg]:h-full [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div>
                <p className="text-[14px] font-medium">WhatsApp QR code</p>
                <p className="mt-1 max-w-[26ch] text-[12px] leading-relaxed text-muted">
                  Point a phone camera at it and the chat opens with the message ready.
                </p>
              </div>
              <a
                href={waLink(`Hello ${site.owner}, I found your portfolio.`)}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary btn-sm"
              >
                Open in WhatsApp
                <ArrowUpRight size={14} />
              </a>
            </div>
            </TiltWrap>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.06}>
              <TiltWrap strength={4}>
              <div className="card p-6">
                <p className="eyebrow mb-2">Direct lines</p>
                <CopyField
                  label="Phone / WhatsApp"
                  value={site.phoneDisplay}
                  href={`tel:${site.phone}`}
                  icon={<Phone size={13} />}
                />
                <CopyField
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                  icon={<Mail size={13} />}
                />
                <CopyField label="Studio" value={site.location} icon={<MapPin size={13} />} />
              </div>
              </TiltWrap>
            </Reveal>

            <Reveal delay={0.12}>
              <TiltWrap strength={4}>
              <div className="card p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Studio hours</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                    <Clock size={11} /> {site.timezone}
                  </span>
                </div>
                <dl className="mt-4 space-y-2.5">
                  {DAYS.map((row) => (
                    <div key={row.day} className="flex items-baseline justify-between gap-4 text-[13px]">
                      <dt className="text-muted">{row.day}</dt>
                      <dd className="font-medium tabular-nums">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              </TiltWrap>
            </Reveal>

            <Reveal delay={0.18}>
              <TiltWrap strength={4}>
              <div className="card p-6">
                <p className="eyebrow mb-4">Elsewhere</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-[12px] font-medium text-muted transition-colors hover:border-red hover:text-red"
                    >
                      {social.label}
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
                <a
                  href={site.driveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                >
                  <span>
                    <span className="block text-[13.5px] font-medium">
                      View full portfolio on Google Drive
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-muted">
                      Unpublished work, decks and process files
                    </span>
                  </span>
                  <span className="arrow-badge shrink-0">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
              </TiltWrap>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brief helper */}
      <section className="section-tight border-t border-line">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Make the first message count</p>
            <h2 className="h2 max-w-[16ch]">What I need to quote you properly.</h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-muted">
              No pressure to have it all figured out — but these four answers turn a
              conversation into a timeline much faster.
            </p>
            <p className="hand mt-6 text-2xl text-red">Voice notes count. I listen to all of them.</p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { n: "01", t: "What you're building", d: "The business, the offer, who buys it." },
              { n: "02", t: "What's broken", d: "The thing that made you look for a designer." },
              { n: "03", t: "Scope", d: "Identity, campaign, feed, site — or all four." },
              { n: "04", t: "Timing & budget", d: "A date to hit and a range to respect." },
            ].map((item, index) => (
              <Reveal key={item.n} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line p-5">
                  <span className="font-hand text-2xl text-red">{item.n}</span>
                  <p className="mt-1.5 text-[14px] font-medium">{item.t}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="shell pb-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center">
            <p className="text-[13.5px] text-muted">
              Prefer to pick a package first?{" "}
              <Link href="/services" className="font-medium text-ink underline decoration-red underline-offset-4">
                See services &amp; pricing
              </Link>
            </p>
            <Link href="/work" className="btn btn-outline btn-sm">
              Browse the work
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
