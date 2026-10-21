import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: string;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="h2">{title}</h2>
        </Reveal>
        {copy && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
              {copy}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.15} className="shrink-0">
          <Link href={action.href} className="btn btn-outline">
            {action.label}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
