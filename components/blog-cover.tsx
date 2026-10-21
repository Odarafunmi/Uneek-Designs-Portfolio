import { useId } from "react";

/**
 * Blog covers drawn in the same design language as the Uneek social posts:
 * a near-black grid field, one oversized display glyph that dissolves into the
 * footer, spaced-out caps in an editorial rail, and red used only where it
 * earns attention.
 *
 * Vector only — crisp at any size, theme-aware, and zero network requests.
 *
 * `portrait` is the 4/5 card crop, `wide` the 2:1 hero used on a post page.
 */

type Shape = "portrait" | "wide";

const DARK = "#0B0B0B";

export function BlogCover({
  slug,
  index = 0,
  shape = "portrait",
  className = "",
}: {
  slug: string;
  index?: number;
  shape?: Shape;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const redId = `red-${uid}`;
  const fadeGrad = `fadegrad-${uid}`;
  const fadeMask = `fademask-${uid}`;

  const wide = shape === "wide";
  const W = wide ? 1200 : 400;
  const H = wide ? 600 : 500;

  const pad = wide ? 64 : 30;
  const railTop = wide ? 66 : 48;
  const railBottom = H - (wide ? 48 : 34);
  /** Caption sits in its own band, clear of both the glyph and the bottom rail. */
  const captionY = railBottom - (wide ? 40 : 26);
  const num = String(index + 1).padStart(2, "0");

  const isRed = slug === "red-is-a-responsibility";

  const defs = (
    <defs>
      <linearGradient id={redId} x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#950000" />
        <stop offset="52%" stopColor="#EE0303" />
        <stop offset="100%" stopColor="#FF4A4A" />
      </linearGradient>
      {/* Mask luminance: white reveals, black hides — the glyph dissolves downward. */}
      <linearGradient id={fadeGrad} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="42%" stopColor="#FFFFFF" />
        <stop offset="88%" stopColor="#000000" />
      </linearGradient>
      <mask id={fadeMask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
        <rect width={W} height={H} fill={`url(#${fadeGrad})`} />
      </mask>
    </defs>
  );

  /* ------------------------------------------------------------ shared rails */
  const grid = (strength: number) => (
    <g stroke="#FFFFFF" strokeWidth="1">
      <path
        d={`M0 ${H * 0.24}h${W}M0 ${H * 0.78}h${W}`}
        strokeOpacity={0.09 * strength}
      />
      <path d={`M${W * 0.1} 0v${H}M${W * 0.9} 0v${H}`} strokeOpacity={0.06 * strength} />
    </g>
  );

  /** Small red rule sitting to the left of the top label. */
  const kicker = (color = "#EE0303") => (
    <rect x={pad} y={railTop - (wide ? 11 : 9)} width={wide ? 22 : 16} height={wide ? 2 : 1.6} fill={color} />
  );

  const rails = (color = "#FFFFFF", opacity = 0.55) => (
    <g fontFamily="Inter, sans-serif" fill={color} fillOpacity={opacity}>
      <text
        x={pad + (wide ? 34 : 24)}
        y={railTop}
        fontSize={wide ? 12.5 : 9.4}
        letterSpacing={wide ? 5 : 3.1}
      >
        UNEEK JOURNAL
      </text>

      {wide ? (
        <text
          x={W - pad}
          y={railTop}
          textAnchor="end"
          fontSize={12.5}
          letterSpacing={5}
        >
          NOTE {num} / 03
        </text>
      ) : (
        <text x={pad} y={railBottom} fontSize={9.4} letterSpacing={3.1}>
          {num} / 03 · UNEEK DESIGNS
        </text>
      )}

      <text
        x={W - pad}
        y={railBottom}
        textAnchor="end"
        fontSize={wide ? 12.5 : 9.4}
        letterSpacing={wide ? 5 : 3.1}
        fill="#EE0303"
        fillOpacity={1}
      >
        uneekdesigns
      </text>
    </g>
  );

  const glyphSize = H * (wide ? 0.66 : 0.62);
  const glyphY = H * (wide ? 0.7 : 0.66);

  /* ------------------------------------------------- 01 — a logo is not a brand */
  const logoCover = (
    <g>
      <rect width={W} height={H} fill={DARK} />
      {grid(1)}

      {/* the copy sitting behind the mark — same letter, one tone down */}
      <text
        x={W / 2 + (wide ? 150 : 34)}
        y={glyphY + H * 0.02}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize={glyphSize}
        letterSpacing={-glyphSize * 0.055}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      >
        A
      </text>
      <text
        x={W / 2}
        y={glyphY}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize={glyphSize}
        letterSpacing={-glyphSize * 0.055}
        fill={`url(#${redId})`}
        mask={`url(#${fadeMask})`}
      >
        A
      </text>

      <text
        x={W / 2}
        y={captionY}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize={wide ? 12 : 9}
        letterSpacing={wide ? 6 : 3.2}
        fill="#FFFFFF"
        fillOpacity="0.68"
      >
        A LOGO IS NOT A BRAND
      </text>

      {kicker()}
      {rails()}
    </g>
  );

  /* ---------------------------------------------- 02 — designing for whatsapp */
  const phoneW = wide ? 150 : 112;
  const phoneH = phoneW * 1.9;
  const phoneX = W / 2 - phoneW / 2;
  const phoneY = H * 0.46 - phoneH / 2;

  const whatsappCover = (
    <g>
      <rect width={W} height={H} fill={DARK} />
      {grid(1)}
      <text
        x={W / 2}
        y={H * 0.68}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize={H * 0.62}
        letterSpacing={-H * 0.03}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="1.2"
      >
        W
      </text>

      {/* the first screen most customers ever see */}
      <g>
        <rect
          x={phoneX}
          y={phoneY}
          width={phoneW}
          height={phoneH}
          rx={phoneW * 0.17}
          fill="#151515"
          stroke="#FFFFFF"
          strokeOpacity="0.24"
        />
        <rect
          x={phoneX + phoneW * 0.36}
          y={phoneY + phoneW * 0.1}
          width={phoneW * 0.28}
          height={phoneW * 0.045}
          rx={2}
          fill="#FFFFFF"
          fillOpacity="0.2"
        />
        <rect
          x={phoneX + phoneW * 0.1}
          y={phoneY + phoneH * 0.16}
          width={phoneW * 0.58}
          height={phoneH * 0.12}
          rx={phoneW * 0.06}
          fill="#FFFFFF"
          fillOpacity="0.14"
        />
        <rect
          x={phoneX + phoneW * 0.1}
          y={phoneY + phoneH * 0.31}
          width={phoneW * 0.42}
          height={phoneH * 0.09}
          rx={phoneW * 0.06}
          fill="#FFFFFF"
          fillOpacity="0.08"
        />
        <rect
          x={phoneX + phoneW * 0.3}
          y={phoneY + phoneH * 0.45}
          width={phoneW * 0.6}
          height={phoneH * 0.27}
          rx={phoneW * 0.06}
          fill={`url(#${redId})`}
        />
        <g fill="#FFFFFF" fillOpacity="0.76">
          <rect
            x={phoneX + phoneW * 0.38}
            y={phoneY + phoneH * 0.515}
            width={phoneW * 0.42}
            height={phoneH * 0.019}
            rx={2}
          />
          <rect
            x={phoneX + phoneW * 0.38}
            y={phoneY + phoneH * 0.565}
            width={phoneW * 0.29}
            height={phoneH * 0.019}
            rx={2}
          />
          <rect
            x={phoneX + phoneW * 0.38}
            y={phoneY + phoneH * 0.615}
            width={phoneW * 0.36}
            height={phoneH * 0.019}
            rx={2}
          />
        </g>
        <g fill="#FFFFFF" fillOpacity="0.45">
          <circle cx={phoneX + phoneW * 0.16} cy={phoneY + phoneH * 0.8} r={2.2} />
          <circle cx={phoneX + phoneW * 0.25} cy={phoneY + phoneH * 0.8} r={2.2} />
          <circle cx={phoneX + phoneW * 0.34} cy={phoneY + phoneH * 0.8} r={2.2} />
        </g>
      </g>

      <text
        x={W / 2}
        y={captionY}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize={wide ? 12 : 8.4}
        letterSpacing={wide ? 6 : 2.6}
        fill="#FFFFFF"
        fillOpacity="0.68"
      >
        DESIGNING FOR WHATSAPP FIRST
      </text>

      {kicker()}
      {rails()}
    </g>
  );

  /* --------------------------------------------- 03 — red is a responsibility */
  const ratioY = captionY - (wide ? 46 : 34);
  const barW = W - pad * 2;

  const redCover = (
    <g>
      <rect width={W} height={H} fill={`url(#${redId})`} />
      <g stroke="#FFFFFF" strokeWidth="1">
        <path d={`M0 ${H * 0.24}h${W}M0 ${H * 0.78}h${W}`} strokeOpacity="0.16" />
        <path d={`M${W * 0.1} 0v${H}M${W * 0.9} 0v${H}`} strokeOpacity="0.11" />
      </g>
      <text
        x={W / 2}
        y={H * 0.66}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize={H * 0.62}
        letterSpacing={-H * 0.035}
        fill="#FFFFFF"
        fillOpacity="0.95"
        mask={`url(#${fadeMask})`}
      >
        R
      </text>

      {/* the 70 / 25 / 5 ratio, drawn instead of described */}
      <rect
        x={pad}
        y={ratioY}
        width={barW * 0.7}
        height={wide ? 6 : 5}
        rx={2}
        fill="#FFFFFF"
        fillOpacity="0.24"
      />
      <rect
        x={pad + barW * 0.7}
        y={ratioY}
        width={barW * 0.25}
        height={wide ? 6 : 5}
        rx={2}
        fill="#FFFFFF"
        fillOpacity="0.88"
      />
      <rect
        x={pad + barW * 0.95}
        y={ratioY}
        width={barW * 0.05}
        height={wide ? 6 : 5}
        rx={2}
        fill="#FFFFFF"
      />
      <text
        x={W / 2}
        y={ratioY + (wide ? 30 : 22)}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize={wide ? 11.5 : 8}
        letterSpacing={wide ? 5.4 : 2.7}
        fill="#FFFFFF"
        fillOpacity="0.92"
      >
        70 NEUTRAL · 25 RED · 5 ACCENT
      </text>

      {kicker("#FFFFFF")}
      {rails("#FFFFFF", 0.84)}
    </g>
  );

  const fallback = (
    <g>
      <rect width={W} height={H} fill={DARK} />
      {grid(1)}
      <text
        x={W / 2}
        y={glyphY}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize={glyphSize}
        fill={`url(#${redId})`}
        mask={`url(#${fadeMask})`}
      >
        U
      </text>
      {kicker()}
      {rails()}
    </g>
  );

  const art =
    slug === "logo-is-not-a-brand"
      ? logoCover
      : slug === "designing-for-whatsapp"
        ? whatsappCover
        : isRed
          ? redCover
          : fallback;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: isRed ? "#EE0303" : DARK }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="presentation"
      >
        {defs}
        {art}
      </svg>
    </div>
  );
}
