import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";

export function PageHeader({
  eyebrow,
  title,
  copy,
  meta,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  meta?: string[];
  breadcrumb?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
      <div className="mesh mesh-soft opacity-90">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>

      <div className="shell relative z-10">
        {breadcrumb && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11.5px] text-muted">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              {breadcrumb.map((crumb) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="opacity-50" />
                  <Link href={crumb.href} className="hover:text-ink">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <Reveal>
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="h1 mt-5 max-w-4xl">{title}</h1>
        </Reveal>

        {copy && (
          <Reveal delay={0.12}>
            <p className="lede mt-6 max-w-2xl">{copy}</p>
          </Reveal>
        )}

        {meta && (
          <Reveal delay={0.16}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-muted">
              {meta.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
