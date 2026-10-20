import { useId } from "react";
import type { ArtVariant } from "@/content/types";

type Tone = "paper" | "ink" | "red" | "grad" | "blush";

const TONE_BY_VARIANT: Record<ArtVariant, Tone> = {
  arch: "grad",
  grid: "paper",
  type: "ink",
  bottle: "blush",
  cards: "paper",
  disc: "ink",
  boxes: "grad",
  browser: "paper",
  ceramic: "blush",
  ribbon: "grad",
  poster: "red",
  portrait: "grad",
};

/**
 * Editorial cover art, drawn in SVG so it stays crisp, theme-aware and costs
 * almost nothing to load. Swap for photography by replacing <CoverArt /> with
 * <Image /> once real shots exist.
 */
export function CoverArt({
  variant,
  label,
  className = "",
  tone,
  seed = 0,
}: {
  variant: ArtVariant;
  label?: string;
  className?: string;
  tone?: Tone;
  /** Small integer that varies the composition of repeatable variants. */
  seed?: number;
}) {
  const uid = useId().replace(/[:]/g, "");
  const resolved = tone ?? TONE_BY_VARIANT[variant];
  const dark = resolved === "ink" || resolved === "red" || resolved === "grad";

  const palette = {
    paper: {
      bg: "var(--surface)",
      fg: "var(--text)",
      soft: "var(--surface-2)",
      line: "var(--border-strong)",
      accent: "#EE0303",
    },
    ink: { bg: "#101010", fg: "#FFFFFF", soft: "#1E1E1E", line: "rgba(255,255,255,0.18)", accent: "#EE0303" },
    red: { bg: "#EE0303", fg: "#FFFFFF", soft: "rgba(255,255,255,0.16)", line: "rgba(255,255,255,0.4)", accent: "#FFB020" },
    grad: { bg: "#EE0303", fg: "#FFFFFF", soft: "rgba(255,255,255,0.18)", line: "rgba(255,255,255,0.42)", accent: "#FFB020" },
    blush: { bg: "var(--surface-2)", fg: "var(--text)", soft: "var(--surface)", line: "var(--border-strong)", accent: "#EE0303" },
  }[resolved];

  const gradId = `g-${uid}`;
  const blurId = `b-${uid}`;
  const initial = (label ?? "U").trim().charAt(0).toUpperCase();

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: palette.bg }}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id={gradId} x1="8%" y1="0%" x2="92%" y2="100%">
            <stop offset="0%" stopColor="#EE0303" />
            <stop offset="55%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#FFB020" />
          </linearGradient>
          <filter id={blurId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {variant === "arch" && (
          <g>
            <rect width="400" height="400" fill={`url(#${gradId})`} />
            <g fill="none" stroke="#fff" strokeOpacity="0.55">
              <path d="M110 330V175a90 90 0 0 1 180 0v155" strokeWidth="1.2" />
              <path d="M80 350V170a120 120 0 0 1 240 0v180" strokeWidth="1.2" strokeOpacity="0.28" />
            </g>
            <path
              d="M140 330V180a60 60 0 0 1 120 0v150Z"
              fill="#fff"
              fillOpacity="0.14"
              stroke="#fff"
              strokeOpacity="0.7"
            />
            <circle cx="200" cy="222" r="16" fill="#fff" fillOpacity="0.9" />
            <path d="M200 238v62" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.9" />
            <path d="M200 262l-24 20M200 262l24 20" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.9" />
            <ellipse cx="200" cy="348" rx="120" ry="8" fill="#000" fillOpacity="0.12" />
          </g>
        )}

        {variant === "grid" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <g>
              <rect x="40" y="40" width="96" height="96" rx="18" fill={palette.accent} />
              <rect x="152" y="40" width="96" height="96" rx="48" fill={palette.fg} fillOpacity="0.08" stroke={palette.line} />
              <rect x="264" y="40" width="96" height="96" rx="18" fill="none" stroke={palette.fg} strokeOpacity="0.35" />
              <circle cx="312" cy="88" r="22" fill={palette.fg} fillOpacity="0.9" />
              <rect x="40" y="152" width="96" height="96" rx="48" fill={palette.fg} fillOpacity="0.9" />
              <rect x="152" y="152" width="96" height="96" rx="18" fill={`url(#${gradId})`} />
              <g stroke={palette.fg} strokeOpacity="0.5" strokeWidth="2">
                <path d="M264 200h96M312 152v96" />
              </g>
              <rect x="40" y="264" width="96" height="96" rx="18" fill="none" stroke={palette.line} strokeDasharray="6 7" />
              <path d="M152 360v-72a24 24 0 0 1 48 0v72" fill={palette.fg} fillOpacity="0.9" />
              <rect x="264" y="264" width="96" height="96" rx="18" fill={palette.accent} fillOpacity="0.15" stroke={palette.accent} strokeOpacity="0.5" />
              <circle cx="312" cy="312" r="18" fill={palette.accent} />
            </g>
          </g>
        )}

        {variant === "type" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <g stroke={palette.line} strokeWidth="1">
              <path d="M0 120h400M0 280h400M0 340h400" strokeOpacity="0.35" />
              <path d="M60 0v400M340 0v400" />
            </g>
            <text
              x="200"
              y="268"
              textAnchor="middle"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
              fontSize="290"
              letterSpacing="-18"
              fill={`url(#${gradId})`}
            >
              {initial}
            </text>
            <text
              x="200"
              y="330"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="11"
              letterSpacing="6"
              fill={palette.fg}
              fillOpacity="0.65"
            >
              BRAND SYSTEM
            </text>
            <g stroke={palette.accent} strokeWidth="1.5" fill="none" strokeOpacity="0.8">
              <path d="M200 22v-14M200 378v14M22 200H8M392 200h-14" />
            </g>
          </g>
        )}

        {variant === "bottle" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <ellipse cx="200" cy="330" rx="135" ry="52" fill={palette.accent} fillOpacity="0.1" filter={`url(#${blurId})`} />
            <g>
              <rect x="176" y="66" width="48" height="34" rx="6" fill={palette.fg} fillOpacity="0.85" />
              <rect x="164" y="96" width="72" height="22" rx="5" fill={palette.fg} fillOpacity="0.55" />
              <rect x="146" y="112" width="108" height="204" rx="18" fill={`url(#${gradId})`} />
              <rect x="146" y="112" width="108" height="204" rx="18" fill="#000" fillOpacity="0.06" />
              <rect x="160" y="150" width="80" height="120" rx="8" fill="#fff" fillOpacity="0.92" />
              <text
                x="200"
                y="192"
                textAnchor="middle"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
                fontSize="26"
                letterSpacing="-1"
                fill="#111"
              >
                {initial}
              </text>
              <text
                x="200"
                y="212"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="8"
                letterSpacing="3"
                fill="#111"
                fillOpacity="0.6"
              >
                FORMULA
              </text>
              <path d="M160 236h80" stroke="#111" strokeOpacity="0.15" />
              <path d="M160 248h52" stroke="#111" strokeOpacity="0.15" />
            </g>
            <ellipse cx="200" cy="326" rx="70" ry="11" fill="#000" fillOpacity="0.14" />
            <circle cx="86" cy="120" r="26" fill="none" stroke={palette.accent} strokeOpacity="0.35" />
            <circle cx="318" cy="272" r="12" fill={palette.accent} fillOpacity="0.35" />
          </g>
        )}

        {variant === "cards" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <g transform="rotate(-9 150 210)">
              <rect x="46" y="96" width="176" height="220" rx="22" fill={palette.bg} stroke={palette.line} />
              <rect x="66" y="118" width="136" height="104" rx="14" fill={`url(#${gradId})`} />
              <rect x="66" y="238" width="104" height="10" rx="5" fill={palette.fg} fillOpacity="0.75" />
              <rect x="66" y="258" width="72" height="8" rx="4" fill={palette.fg} fillOpacity="0.28" />
              <circle cx="188" cy="290" r="13" fill={palette.accent} />
            </g>
            <g transform="rotate(7 268 200)">
              <rect x="182" y="72" width="176" height="230" rx="22" fill={palette.fg} fillOpacity={dark ? 0.1 : 0.06} stroke={palette.line} />
              <circle cx="270" cy="150" r="44" fill={palette.accent} />
              <path d="M270 120v60M240 150h60" stroke="#fff" strokeWidth="3" />
              <rect x="206" y="222" width="128" height="9" rx="4.5" fill={palette.fg} fillOpacity="0.6" />
              <rect x="206" y="242" width="88" height="8" rx="4" fill={palette.fg} fillOpacity="0.25" />
              <rect x="206" y="266" width="60" height="22" rx="11" fill={palette.fg} fillOpacity="0.85" />
            </g>
          </g>
        )}

        {variant === "disc" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <circle cx="200" cy="200" r="150" fill="#0A0A0A" />
            <g stroke="#fff" strokeOpacity="0.09" strokeWidth="1">
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={i} cx="200" cy="200" r={80 + i * 5} fill="none" />
              ))}
            </g>
            <circle cx="200" cy="200" r="62" fill={`url(#${gradId})`} />
            <circle cx="200" cy="200" r="8" fill={palette.bg} />
            <text
              x="200"
              y="192"
              textAnchor="middle"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
              fontSize="20"
              fill="#fff"
              letterSpacing="-0.5"
            >
              SIDE A
            </text>
            <text
              x="200"
              y="212"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="8"
              letterSpacing="3"
              fill="#fff"
              fillOpacity="0.85"
            >
              33 ⅓ RPM
            </text>
            <g stroke="#fff" strokeOpacity="0.5" strokeWidth="1">
              <path d="M200 28v18M200 354v18M28 200h18M354 200h18" />
            </g>
          </g>
        )}

        {variant === "boxes" && (
          <g>
            <rect width="400" height="400" fill={`url(#${gradId})`} />
            <g fill="#fff">
              <path d="M200 74l64 34v52l-64 34-64-34v-52Z" fillOpacity="0.95" />
              <path d="M200 74l64 34-64 34-64-34Z" fillOpacity="0.65" />
              <path d="M264 160l52 28v42l-52 28-52-28v-42Z" fillOpacity="0.9" />
              <path d="M264 160l52 28-52 28-52-28Z" fillOpacity="0.55" />
              <path d="M148 176l46 25v38l-46 25-46-25v-38Z" fillOpacity="0.8" />
              <path d="M148 176l46 25-46 25-46-25Z" fillOpacity="0.45" />
            </g>
            <path d="M200 108v52M264 188v42M148 201v38" stroke="#000" strokeOpacity="0.15" />
            <ellipse cx="200" cy="330" rx="140" ry="18" fill="#000" fillOpacity="0.12" filter={`url(#${blurId})`} />
          </g>
        )}

        {variant === "browser" && (() => {
          const layout = ((seed % 3) + 3) % 3;
          return (
            <g>
              <rect width="400" height="400" fill={palette.bg} />
              <rect x="34" y="52" width="332" height="296" rx="20" fill={palette.bg} stroke={palette.line} />
              <path d="M34 108h332" stroke={palette.line} />
              <g>
                <circle cx="58" cy="80" r="5" fill={palette.accent} />
                <circle cx="76" cy="80" r="5" fill={palette.fg} fillOpacity="0.2" />
                <circle cx="94" cy="80" r="5" fill={palette.fg} fillOpacity="0.2" />
                <rect x="116" y="70" width="180" height="20" rx="10" fill={palette.fg} fillOpacity="0.07" />
              </g>

              {layout === 0 && (
                <g>
                  <rect x="58" y="132" width="126" height="12" rx="6" fill={palette.fg} fillOpacity="0.8" />
                  <rect x="58" y="154" width="90" height="8" rx="4" fill={palette.fg} fillOpacity="0.3" />
                  <rect x="58" y="182" width="130" height="94" rx="14" fill={`url(#${gradId})`} />
                  <rect x="200" y="182" width="140" height="42" rx="12" fill={palette.fg} fillOpacity="0.07" />
                  <rect x="200" y="234" width="140" height="42" rx="12" fill={palette.fg} fillOpacity="0.07" />
                  <rect x="58" y="292" width="80" height="24" rx="12" fill={palette.fg} fillOpacity="0.85" />
                  <path d="M200 300h140" stroke={palette.fg} strokeOpacity="0.25" strokeDasharray="4 6" />
                  <circle cx="340" cy="300" r="6" fill={palette.accent} />
                </g>
              )}

              {layout === 1 && (
                <g>
                  <rect x="58" y="130" width="120" height="10" rx="5" fill={palette.fg} fillOpacity="0.75" />
                  <rect x="58" y="152" width="180" height="6" rx="3" fill={palette.fg} fillOpacity="0.22" />
                  <g>
                    <rect x="58" y="176" width="94" height="72" rx="12" fill={`url(#${gradId})`} />
                    <rect x="162" y="176" width="94" height="72" rx="12" fill={palette.fg} fillOpacity="0.07" />
                    <rect x="266" y="176" width="74" height="72" rx="12" fill={palette.fg} fillOpacity="0.07" />
                    <rect x="58" y="260" width="94" height="14" rx="7" fill={palette.fg} fillOpacity="0.5" />
                    <rect x="162" y="260" width="80" height="14" rx="7" fill={palette.fg} fillOpacity="0.25" />
                    <rect x="266" y="260" width="60" height="14" rx="7" fill={palette.fg} fillOpacity="0.25" />
                    <circle cx="296" cy="212" r="9" fill={palette.accent} />
                  </g>
                  <rect x="58" y="296" width="140" height="24" rx="12" fill={palette.fg} fillOpacity="0.85" />
                  <rect x="206" y="296" width="60" height="24" rx="12" fill={palette.fg} fillOpacity="0.14" />
                </g>
              )}

              {layout === 2 && (
                <g>
                  <rect x="58" y="132" width="96" height="96" rx="16" fill={`url(#${gradId})`} />
                  <rect x="58" y="244" width="96" height="8" rx="4" fill={palette.fg} fillOpacity="0.6" />
                  <rect x="58" y="262" width="70" height="8" rx="4" fill={palette.fg} fillOpacity="0.25" />
                  <g fill={palette.fg} fillOpacity="0.07">
                    <rect x="174" y="132" width="160" height="18" rx="9" />
                    <rect x="174" y="160" width="120" height="18" rx="9" />
                    <rect x="174" y="188" width="160" height="18" rx="9" />
                  </g>
                  {/* little bar chart */}
                  <g fill={palette.accent}>
                    <rect x="178" y="288" width="16" height="20" rx="4" fillOpacity="0.45" />
                    <rect x="204" y="272" width="16" height="36" rx="4" fillOpacity="0.65" />
                    <rect x="230" y="256" width="16" height="52" rx="4" fillOpacity="0.85" />
                    <rect x="256" y="238" width="16" height="70" rx="4" />
                  </g>
                  <rect x="286" y="238" width="48" height="26" rx="13" fill={palette.fg} fillOpacity="0.85" />
                </g>
              )}
            </g>
          );
        })()}

        {variant === "ceramic" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <ellipse cx="200" cy="330" rx="150" ry="30" fill="#000" fillOpacity="0.07" />
            <path d="M118 126c26 0 30 30 30 62 0 44-10 104-30 104s-30-60-30-104c0-32 4-62 30-62Z" fill={`url(#${gradId})`} />
            <path d="M118 130c8 22 8 44 0 66" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <path d="M282 150c38 0 50 26 50 62s-14 62-50 62-50-26-50-62 12-62 50-62Z" fill={palette.fg} fillOpacity="0.82" />
            <ellipse cx="282" cy="150" rx="50" ry="12" fill={palette.fg} fillOpacity="0.5" />
            <path d="M200 200c26 0 40 20 40 48s-18 46-40 46-40-18-40-46 14-48 40-48Z" fill="none" stroke={palette.accent} strokeWidth="2.5" />
            <path d="M200 205c-10 18-10 40 0 58" stroke={palette.accent} strokeWidth="2" fill="none" strokeOpacity="0.5" />
            <g stroke={palette.line} strokeWidth="1">
              <path d="M40 330h320" />
              <path d="M40 120v210M360 120v210" strokeOpacity="0.4" />
            </g>
          </g>
        )}

        {variant === "ribbon" && (
          <g>
            <rect width="400" height="400" fill={`url(#${gradId})`} />
            <path
              d="M-20 300C60 200 120 360 200 260s140-120 220-40"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.55"
              strokeWidth="46"
              strokeLinecap="round"
            />
            <path
              d="M-20 340C70 250 130 400 210 300s130-110 210-30"
              fill="none"
              stroke="#000"
              strokeOpacity="0.12"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M-20 200C60 120 140 260 220 170s140-70 200-10"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.25"
              strokeWidth="2"
            />
            <circle cx="312" cy="86" r="34" fill="#fff" fillOpacity="0.9" />
            <circle cx="312" cy="86" r="16" fill="#EE0303" />
            <ellipse cx="200" cy="352" rx="150" ry="14" fill="#000" fillOpacity="0.1" filter={`url(#${blurId})`} />
          </g>
        )}

        {variant === "poster" && (
          <g>
            <rect width="400" height="400" fill={palette.bg} />
            <path d="M0 400L400 40v360Z" fill={`url(#${gradId})`} />
            <g fill="none" stroke="#fff" strokeOpacity="0.32">
              <path d="M0 400L400 40" />
              <path d="M0 340L400 -20" />
              <path d="M0 460L400 100" strokeOpacity="0.18" />
            </g>
            {/* centred type block: survives any aspect-ratio crop */}
            <g textAnchor="middle" fill="#fff">
              <text
                x="200"
                y="186"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
                fontSize="86"
                letterSpacing="-5"
              >
                NOW
              </text>
              <text
                x="200"
                y="228"
                fontFamily="Poppins, sans-serif"
                fontWeight="400"
                fontSize="30"
                letterSpacing="-1"
                fillOpacity="0.92"
              >
                showing
              </text>
              <path d="M132 248h136" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
              <text
                x="200"
                y="272"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                letterSpacing="4.5"
                fillOpacity="0.85"
              >
                A STUDY IN TYPE
              </text>
            </g>
            <g stroke="#fff" strokeOpacity="0.5" fill="none">
              <circle cx="200" cy="330" r="14" />
              <path d="M200 322v16M192 330h16" />
            </g>
            <g stroke="#fff" strokeOpacity="0.35">
              <path d="M172 108h56M200 80v56" />
            </g>
          </g>
        )}

        {variant === "portrait" && (
          <g>
            <rect width="400" height="400" fill={`url(#${gradId})`} />
            <circle cx="200" cy="150" r="120" fill="#fff" fillOpacity="0.1" />
            <g fill="#1A1A1A">
              <path d="M200 118c40 0 62 26 62 62 0 22-8 40-18 52l-6 22h-76l-6-22c-10-12-18-30-18-52 0-36 22-62 62-62Z" />
              <path d="M124 400c0-58 34-96 76-96s76 38 76 96Z" />
            </g>
            <g fill="#fff" fillOpacity="0.24">
              <circle cx="178" cy="176" r="16" />
              <circle cx="234" cy="176" r="16" />
              <path d="M200 196v12" stroke="#fff" strokeOpacity="0.24" strokeWidth="3" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

export function coverTone(variant: ArtVariant) {
  return TONE_BY_VARIANT[variant];
}
