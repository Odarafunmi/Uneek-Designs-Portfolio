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
| `/` | Two-slide hero, marquee, compact studio intro (one paragraph + three capability chips + 2×2 stats), featured work, categories, services, journal, CTA. The testimonials block only renders once real quotes are added to `content/work.ts` |
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

- **Hero**: two slides, both built to the reference screenshots.
  - *Slide 1 — the poster (first reference, no photo).* Small `Portfolio` label, an
    "Available for work" pill, the headline "Brand & UI/UX Designer based in Lagos" on the
    left, the micro-copy + rotating "I design …" line + Say hello button on the right, and
    a giant `DESIGNER` anchored to the bottom of the viewport that dissolves upward —
    clipped at the base like the reference.
  - *Slide 2 — the founder (second reference).* Portrait inside a red arch, a huge ghosted
    "PECULIAR" behind it, floating discipline pills (Brand identity / Product design /
    Social media) and glass stat cards that count up, with "Hey, I'm Peculiar." + the
    discipline headline bottom-left and CTAs bottom-right.
  - Both slides are stacked in one CSS grid cell, so the row is always as tall as the
    taller slide: switching (or autoplaying) never shifts the page. From `md` up the hero
    is `100svh`; on phones it is content-sized (~680–700 px) so there is no dead band
    under the CTAs. Slide 2 distributes the extra height around the portrait.
  - No orange: gradients run deep red → brand red → bright red, grey + black/white secondary.
- **Header scrim**: once the page is scrolled the fixed header paints an opaque, blurred
  strip behind the logo and pill nav (`components/nav.tsx`), masked to fade out at its
  bottom edge, so page content never shows through the navigation.
- **Theme** is driven by `data-theme="light|dark"` on `<html>`, set before paint by an
  inline script (`themeScript`) so there is no flash. Defaults to the system setting,
  then remembers the visitor's choice in `localStorage`, with a 300 ms colour transition.
- **Real work comes from the studio's Google Drive** (`My Portfolio`). `content/work.ts`
  declares each project with a `cover`, an optional `gallery` and a `driveUrl`, using the
  public `https://drive.google.com/thumbnail?id=…&sz=w1400` endpoint — no build-time fetch,
  so the sandbox or a CI runner never needs Drive access. Images render `unoptimized`
  (the browser fetches them directly) and any load failure silently falls back to the
  generated SVG cover, so a private or moved folder never shows a broken image.
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
- **3D**: one torus-knot object (brand-red lighting) in `components/hero-object.tsx`,
  used three times as a low-key watermark — never inside the hero content:
  `components/ui/cta-band.tsx` (bottom-right of the dark CTA panel) and twice on the home
  page beside the "Selected work" and "From the studio" section headings. It is lazy-loaded
  through `components/hero-object-lazy.tsx`, only mounts on large screens with 4+ cores and
  no reduced-motion preference, pauses its render loop when scrolled out of view, and falls
  back to a static SVG otherwise.
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
