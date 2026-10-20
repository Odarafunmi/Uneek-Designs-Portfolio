"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site, waLink } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-red focus:px-5 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? "pt-2.5" : "pt-4 md:pt-6"}`}
      >
        <div className="shell flex items-center justify-between gap-3">
          <div className="flex items-center">
            <Logo size={scrolled ? 26 : 30} />
          </div>

          {/* Desktop pill nav */}
          <nav
            aria-label="Primary"
            className="pill-nav hidden items-center gap-1 rounded-full p-1.5 md:flex"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    active ? "text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-red"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={waLink(`Hello ${site.owner}, I'd like to talk about a project.`)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Book a call
              <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="display text-[clamp(2rem,11vw,2.75rem)]">
                        {link.label}
                      </span>
                      <span className="font-hand text-lg text-red">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-3">
                <p className="hand text-2xl text-muted">{site.availability}</p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary w-full"
                >
                  Message on WhatsApp
                  <ArrowUpRight size={16} />
                </a>
                <p className="text-center text-xs text-muted">{site.whatsappDisplay}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
