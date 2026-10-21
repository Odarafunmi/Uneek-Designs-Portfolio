import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CoverArt } from "@/components/art";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pb-20 pt-32">
      <div className="mesh mesh-soft">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>
      <div className="shell relative z-10 grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
            Error 404
          </p>
          <h1 className="h1 mt-5">
            This page went
            <br />
            <span className="grad-text">to print.</span>
          </h1>
          <p className="lede mt-5 max-w-md">
            Dead link, moved file, or a typo somewhere. Either way — the work is still here.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/" className="btn btn-primary">
              Back home
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/work" className="btn btn-outline">
              Browse the work
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line">
          <CoverArt variant="poster" label="404" />
        </div>
      </div>
    </section>
  );
}
