# Uneek Designs — Portfolio

The portfolio site for **Uneek Designs**, the studio of Peculiar — a Lagos-based brand
and product designer. Built to the v2 style guide and the PRD: premium editorial layout,
huge display type, flowing red gradients, cursor-aware doodles, light/dark mode on every
page, and a WhatsApp-first booking flow.

Live-ish stack: **Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion ·
Lenis · React Three Fiber**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender as static/SSG)
npm start
```

Node 20+ recommended.

---

## What's in here

| Route | What it does |
| --- | --- |
| `/` | Two-slide hero, marquee, studio intro, featured work, categories, services, testimonials, journal, CTA |
| `/work` | All 16 projects grouped by discipline, plus category cards |
| `/work/[category]` | Branding / Social Media / Product Adverts / Hobbies |
| `/work/[category]/[project]` | Project case study with brief, deliverables and next-project link |
| `/web` | Coded sites with tech chips and live links |
| `/blog`, `/blog/[slug]` | Journal + post pages rendered from Markdown-ish content |
| `/services` | Pricing cards, process, FAQ — each card opens the WhatsApp booking modal |
| `/contact` | Oversized tactile **Connect** button, WhatsApp QR code, copy-to-clipboard lines, hours, Drive link |
| `/admin` | **Not built yet** — see “Next milestone” below |

---

## Editing content (no database required)

Everything the site renders lives in `content/`:

```
content/
  site.ts      ← phone, WhatsApp number, email, Drive link, socials, availability
  work.ts      ← categories, projects, web projects, testimonials
  services.ts  ← pricing cards + the per-service WhatsApp message template
  posts.ts     ← blog posts (Markdown body, rendered by lib/markdown.tsx)
  types.ts     ← shared types
```

### ⚠️ Placeholder details to replace before launch

`content/site.ts` currently ships **dummy contact details**. Update these first:

- `whatsapp` / `whatsappDisplay` — international format, digits only for `whatsapp`
- `phone` / `phoneDisplay`
- `email`, `driveUrl`, `behance`, `instagram`, `x`, `linkedin`
- `availability` text

Nothing else hardcodes a phone number, so this one file controls the QR code, the nav
button, the booking modal, every service CTA and the footer.

### Cover art

Project covers are drawn as SVG (`components/art.tsx`) rather than photographs, so the
site ships no large images, stays sharp at any size and re-colours with the theme. Each
variant (`arch`, `grid`, `type`, `bottle`, `cards`, `disc`, `boxes`, `browser`, `ceramic`,
`ribbon`, `poster`, `portrait`) is a small composition in the brand palette.

When real photography is ready, swap `<CoverArt />` in `components/cards.tsx` for
`next/image`; the card markup is already built around a fixed-ratio cover slot. The hero
portrait (`Portrait()` in `components/hero.tsx`) is likewise a placeholder — replace the
inline SVG with `<Image src="/images/peculiar.jpg" />` inside `.portrait-shell`.

### Brand assets

`public/brand/` holds transparent, high-resolution cuts derived from the supplied
rebranding board:

- `mark-light.png` — red + charcoal mark (light backgrounds)
- `mark-white.png` — all-white mark (red, charcoal and dark backgrounds)
- `logo-light.png`, `logo-white.png` — stacked lockups
- `icon-512.png`, `apple-icon.png`, `og.png` — app icons and the 1200×630 social card

Logo rules from the style guide are respected: the mark swaps variant with the theme and
the lockup keeps clear space equal to the “U” notch.

---

## Design system

Tokens live at the top of `app/globals.css` and are exposed to Tailwind 4 through
`@theme inline` (so `bg-surface`, `text-muted`, `border-line`, `text-red` etc. work).

- **Hero**: slide 1 is a poster — a full-bleed `DESIGNER` word that dissolves into a
  portrait container (both masked with a soft bottom fade), the `Portfolio` label, the
  rotating "I design …" line and one strapline. Everything else about the founder lives
  on slide 2 (About the founder). No orange: the gradient runs deep red → brand red →
  bright red, with grey and black/white as the secondary palette.
- **Theme** is driven by `data-theme="light|dark"` on `<html>`, set before paint by an
  inline script (`themeScript`) so there is no flash. Defaults to the system setting,
  then remembers the visitor's choice in `localStorage`, with a 300 ms colour transition.
- **Custom classes** (`.btn`, `.card`, `.shell`, `.giant`, …) are declared inside
  `@layer components`, which keeps Tailwind utilities able to override them.
- **Counters**: the home-page stats use `components/ui/count-up.tsx`, which counts up
  once when scrolled into view (~760 ms, ease-out) and shows the final value immediately
  under `prefers-reduced-motion`.
- **Motion**: reveal-on-scroll (`components/ui/reveal.tsx`), page transitions
  (`app/template.tsx`), Lenis smooth scroll (`components/smooth-scroll.tsx`), hero
  parallax, and doodles that lean toward the pointer and drift with scroll
  (`components/doodles.tsx`).
- **Reduced motion**: Lenis is skipped, reveals render instantly, the marquee stops, the
  3D object is replaced by a static SVG, and all CSS animation is neutralised.
- **3D**: one hero object (torus knot in brand red) in `components/hero-object.tsx`,
  lazy-loaded with `next/dynamic`, only mounted on large screens with 4+ cores and no
  reduced-motion preference; static SVG fallback otherwise.
- **Contrast**: red is used for large type and filled buttons only (`--red-ink` is a
  darker red for small text in light mode and a lighter red in dark mode), body text is
  `--text` / `--text-muted` at 4.5:1+.

---

## Booking flow

1. `Book this service` → `BookingProvider` (`components/providers/booking.tsx`) opens a
   modal with that service's editable pre-written message.
2. **Copy message** puts it on the clipboard.
3. **Continue to WhatsApp** opens `wa.me/<number>?text=<message>`.

The same modal is used by every “Start a project” / “Book a call” button, so there is no
form and no backend dependency.

---

## Supabase migration (next milestone)

`supabase/schema.sql` contains the full data model from the PRD — `categories`,
`projects`, `web_projects`, `services`, `posts`, `settings` — plus row-level security
(public read, authenticated write) and a seeded settings row.

To go from flat files to the database:

1. Create a Supabase project and run `supabase/schema.sql`.
2. Add the env vars:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=   # server-only, for the admin dashboard
   ```
3. Create `lib/supabase.ts` clients, then replace the imports in each page — the exported
   shapes in `content/types.ts` were written to map 1:1 to the table columns, so the
   components do not change.
4. Build `/admin` (login via Supabase Auth, CRUD for each table, image upload to Storage).
   The public site stays read-only and never renders admin controls.

---

## Performance notes

- Every route prerenders (SSG) except the admin (not built).
- No images above the fold except the wordmark and the SVG art — no layout shift.
- `optimizePackageImports` is on for `lucide-react` and `framer-motion`.
- Fonts are self-hosted via Fontsource (Poppins, Inter, Caveat) — no third-party font
  request or blocking stylesheet.
- 3D is deferred, lazy and feature-gated; the rest of the hero paints immediately.

---

## Accessibility

- Skip-to-content link, visible red focus rings, semantic landmarks and heading order.
- Icon-only buttons have `aria-label`s; the hero slider exposes slide buttons with
  `aria-current`; the booking modal is `role="dialog"` + `aria-modal` and closes on
  Escape.
- Decorative art and doodles are `aria-hidden`; the QR card has a text alternative below.
- Everything respects `prefers-reduced-motion` and `prefers-color-scheme`.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on `0.0.0.0:3000` |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
