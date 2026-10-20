import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "logo-is-not-a-brand",
    title: "A logo is not a brand, and you already know that",
    excerpt:
      "Why the single most common brief in Lagos — 'I need a logo' — is usually asking for something else entirely.",
    date: "2026-09-28",
    readingTime: "5 min read",
    tags: ["Branding", "Strategy"],
    art: "type",
    body: `## The brief behind the brief

Almost every first call starts the same way. "I need a logo." Then, twenty minutes later, the real problem shows up: the shop doesn't look like the price, the ads get ignored, the team writes captions in five different voices.

A logo can't fix any of that. A logo is a signature. It works because of everything the document it sits on already says.

## What people actually buy

When a brand books me for an "identity", here is the list of things that usually changes:

- **The words.** How the business describes itself in one line, without adjectives that every competitor also uses.
- **The hierarchy.** What customers should notice first, second, third — on a bag, a shelf, a feed, a site.
- **The limits.** Two typefaces, three colours, and a rule about when to break both. Limits are what make a small team look consistent.
- **The signature.** The mark, the wordmark, the thing that makes it yours. This comes last, not first.

## The test that matters

Put your logo at the top of a plain page with no colour, no photography, no copy. If it still looks like it belongs to a business with a point of view, you're fine.

If it doesn't, no version of the mark will save it. That's not a design problem. That's a positioning problem wearing a design costume.

## So what should you ask for?

Ask for a system, not a file. Ask what your brand does when it has to say something difficult — a price increase, a recall, an apology. Ask to see the guidelines, not just the presentation deck. The mark is the easy part.`,
  },
  {
    slug: "designing-for-whatsapp",
    title: "Designing for WhatsApp first",
    excerpt:
      "Most of my clients' customers arrive on a phone, from a chat, with one bar of signal. Here's how that changes the work.",
    date: "2026-08-14",
    readingTime: "4 min read",
    tags: ["Product", "Social Media"],
    art: "cards",
    body: `## The real first screen

Your website is not the first screen your customer sees. WhatsApp is. A friend forwarded a flyer, a status was screenshotted, someone sent a catalogue PDF at 11pm.

That means three things for design:

1. **The preview is the brand.** That first 1080 × 1350 image is doing the work of a homepage. It has to survive being compressed, forwarded and re-uploaded four times.
2. **Files get saved, not clicked.** If the useful information is behind a link, half your audience will never see it. Put the price, the location and the next step in the image.
3. **Vertical is the default.** Not because it's trendy, but because everyone is holding the phone with one hand.

## Type sizes are a design decision

On a good screen, 14px is fine. On a phone at 40% brightness, in traffic, with a cracked protector, 14px is decoration. Body copy starts at 16 and headlines do not need to be subtle. Contrast is not a stylistic preference — half your audience is reading on a bus.

## Build one good template

Most small brands don't need twenty templates. They need one that can hold a price, a photo, a headline and a date, and one variation for stories. Lock the type. Let the photo change. Publish weekly.

The brands that look consistent aren't the ones with the biggest design budgets. They're the ones with the fewest ways to do it wrong.`,
  },
  {
    slug: "red-is-a-responsibility",
    title: "Red is a responsibility",
    excerpt:
      "Notes from building a brand system around #EE0303 — where it earns its place, and where it gets in the way.",
    date: "2026-07-02",
    readingTime: "6 min read",
    tags: ["Colour", "Craft"],
    art: "poster",
    body: `## The loudest colour in the room

Red is the colour of urgency. It's why it works on a sale sticker and why it fails on a paragraph of body copy. If everything is urgent, nothing is.

When the Uneek palette landed on #EE0303, the first job wasn't picking a gradient. It was deciding how rarely the red would appear.

## The 70/25/5 rule

The system I use on client work:

- **70% neutral.** Paper, charcoal, black, white. This is where the reading happens.
- **25% red.** Buttons, marks, one headline per view, the thing you want tapped.
- **5% accent.** The orange and amber in the gradient. Treat it like a highlight, not a colour.

Break the ratio on purpose — one full-bleed red section on a page — and it feels like an event. Break it everywhere and it feels like a warning label.

## Contrast is not optional

Red text on white fails at body sizes. Red text on black is worse. So the rules are simple:

- **White text on red**, at 4.5:1 or better, for anything you want people to act on.
- **Red text only for large headings**, where the size buys back legibility.
- **Charcoal for anything long.** #484848 on white does the quiet work.

## Why gradients

A flat red is a decision. A red-to-amber gradient is a mood — heat, movement, something being made. Used in one place per screen, it reads as energy. Used as a background for a whole site, it reads as a template.

Restraint is the design. The colour is just the proof.`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
