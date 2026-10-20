import Image from "next/image";
import Link from "next/link";

export function Logo({
  href = "/",
  size = 30,
  wordmark = true,
}: {
  href?: string | null;
  size?: number;
  wordmark?: boolean;
}) {
  const mark = (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="relative inline-flex items-center justify-center"
        style={{ width: size * 0.83, height: size }}
      >
        {/* Light mode mark */}
        <Image
          src="/brand/mark-light.png"
          alt=""
          width={705}
          height={849}
          priority
          className="h-full w-auto dark:hidden"
          style={{ height: "100%", width: "auto" }}
        />
        <Image
          src="/brand/mark-white.png"
          alt=""
          width={705}
          height={849}
          priority
          className="hidden h-full w-auto dark:block"
          style={{ height: "100%", width: "auto" }}
        />
      </span>
      {wordmark && (
        <span
          className="font-display font-semibold leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: size * 0.44 }}
        >
          UNEEK
          <br />
          DESIGNS
        </span>
      )}
    </span>
  );

  const label = "Uneek Designs — home";

  if (!href) {
    return (
      <span aria-label={label} className="text-ink">
        {mark}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className="text-ink transition-opacity hover:opacity-80">
      {mark}
    </Link>
  );
}
