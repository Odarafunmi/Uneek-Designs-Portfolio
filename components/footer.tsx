import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navLinks, site, waLink } from "@/content/site";

const SOCIALS = [
  { href: site.instagram, label: "Instagram", icon: Instagram },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.behance, label: "Behance", icon: null },
  { href: site.x, label: "X", icon: null },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="shell relative z-10 pb-12 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-16">
          <div>
            <Logo size={56} wordmark={false} />
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-muted">
              {site.description}
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary btn-sm mt-6"
            >
              Start a project
              <ArrowUpRight size={15} />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow mb-4">Pages</p>
              <ul className="space-y-2.5 text-[13.5px]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Reach</p>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <Mail size={14} /> Email
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <Phone size={14} /> Call
                  </a>
                </li>
                <li>
                  <a
                    href={site.driveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <ArrowUpRight size={14} /> Drive
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div>
            <p className="eyebrow mb-4">Studio</p>
            <p className="inline-flex items-start gap-2 text-[13.5px] text-muted">
              <MapPin size={14} className="mt-1 shrink-0" />
              {site.location}
              <br />
            </p>
            <p className="mt-3 text-[13.5px] text-muted">{site.whatsappDisplay}</p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-line px-3 text-[11.5px] font-medium text-muted transition-colors hover:border-red hover:text-red"
                >
                  {social.icon ? <social.icon size={14} /> : social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-[11.5px] text-muted md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-hand text-base">
            Designed &amp; built in Lagos, with a lot of red.
          </p>
        </div>
      </div>

      {/* Oversized wordmark, cropped at the baseline */}
      <div aria-hidden className="pointer-events-none relative -mb-3 select-none overflow-hidden md:-mb-6">
        <p
          className="display whitespace-nowrap text-center text-[11.5vw] leading-[0.8] text-ink/[0.06]"
          style={{ letterSpacing: "-0.05em" }}
        >
          UNEEK DESIGNS
        </p>
      </div>
    </footer>
  );
}
