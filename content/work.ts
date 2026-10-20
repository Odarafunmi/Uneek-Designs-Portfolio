import type { Category, Project, Testimonial, WebProject } from "./types";

export const categories: Category[] = [
  {
    slug: "branding",
    name: "Branding",
    tagline: "Identities with a point of view",
    blurb:
      "Logos, type systems, colour and the guidelines that keep everything looking like it came from the same brain.",
    art: "type",
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: "Feeds that earn the scroll",
    blurb:
      "Template systems, campaign frames and content design built to be posted every week without losing the plot.",
    art: "cards",
  },
  {
    slug: "product-adverts",
    name: "Product Adverts",
    tagline: "Objects, made irresistible",
    blurb:
      "Product key art, packaging mockups and ad sets that turn a catalogue photo into something people save.",
    art: "bottle",
  },
  {
    slug: "hobbies",
    name: "Hobbies",
    tagline: "Work made for the love of it",
    blurb:
      "Posters, ceramics, type experiments and side quests — the playground where the studio's ideas get sharp.",
    art: "ceramic",
  },
];

export const projects: Project[] = [
  {
    slug: "zuri-coffee",
    category: "branding",
    title: "Zuri Coffee",
    client: "Zuri Coffee Roasters",
    tagline: "A roastery identity warm enough to smell",
    description:
      "Zuri needed to move from a market stall logo to a shelf-ready coffee brand. We built the identity around the roast curve — a single continuous line that becomes the Z, the bag stripe and the café signage. Warm cream stock, one confident red, and a wordmark with enough personality to hold a shopfront.",
    year: 2026,
    deliverables: ["Brand strategy", "Wordmark & monogram", "Packaging system", "Café signage"],
    art: "poster",
    featured: true,
  },
  {
    slug: "nkem-skincare",
    category: "branding",
    title: "Nkem Skincare",
    client: "Nkem",
    tagline: "Clinical calm for a skincare launch",
    description:
      "A new skincare line that needed to feel trustworthy without going cold. The identity pairs a tall, quiet wordmark with a soft apricot-and-red gradient that appears on every bottle, box and launch asset. The system is deliberately simple so a two-person team can run it.",
    year: 2026,
    deliverables: ["Identity", "Packaging", "Launch campaign", "Social templates"],
    art: "bottle",
    featured: true,
  },
  {
    slug: "oriki-records",
    category: "branding",
    title: "Oríkì Records",
    client: "Oríkì Records",
    tagline: "A record label that looks like its sound",
    description:
      "Afro-fusion label Oríkì needed artwork that could live at 12 inches and 1080 pixels. We designed a modular sleeve system: a rotating disc, a fixed grid and a hand-drawn mark that changes colour with each release. The first four sleeves shipped with the roster's debut singles.",
    year: 2025,
    deliverables: ["Label identity", "Sleeve system", "Artist lockups", "Motion sting"],
    art: "disc",
    featured: true,
  },
  {
    slug: "terra-interiors",
    category: "branding",
    title: "Terra Interiors",
    client: "Terra Studio",
    tagline: "Quiet luxury for a Lagos interiors studio",
    description:
      "Terra's work is all texture and restraint, and their old identity fought it. We stripped the palette back to clay, charcoal and paper, drew an arch monogram from their doorways, and set the whole system in a single serif to let the photography breathe.",
    year: 2025,
    deliverables: ["Identity refresh", "Stationery", "Project folio", "Signage"],
    art: "arch",
  },
  {
    slug: "kola-bank",
    category: "branding",
    title: "Kola Bank",
    client: "Kola Microfinance",
    tagline: "Making a microfinance brand feel human",
    description:
      "A microfinance app for market traders, launching against banks that talk like banks. We gave Kola a rounded, friendly mark, a verbal identity built on everyday pidgin and English, and a brand book that sales agents could actually use in the field.",
    year: 2024,
    deliverables: ["Naming support", "Identity", "Brand book", "App UI accents"],
    art: "grid",
  },
  {
    slug: "afrobeat-nights",
    category: "social-media",
    title: "Afrobeat Nights",
    client: "Afrobeat Nights Lagos",
    tagline: "A weekly party with a weekly system",
    description:
      "Every Thursday, a new flyer — without a designer on call. We built a template system with locked type, a colour rotation and a set of crops so the team can publish in twenty minutes and still look curated.",
    year: 2026,
    deliverables: ["Content system", "20+ templates", "Story kit", "Motion loops"],
    art: "cards",
    featured: true,
  },
  {
    slug: "lagos-fit-club",
    category: "social-media",
    title: "Lagos Fit Club",
    client: "Lagos Fit Club",
    tagline: "Fitness content that isn't shouting",
    description:
      "A community gym with a loud feed and a quiet brand. We rewrote the grid: big type, one accent, real members, and a monthly challenge format that gave people a reason to post along with the club.",
    year: 2025,
    deliverables: ["Grid redesign", "Campaign concepts", "Reels covers", "Community kit"],
    art: "type",
  },
  {
    slug: "mamas-kitchen",
    category: "social-media",
    title: "Mama's Kitchen",
    client: "Mama's Kitchen",
    tagline: "Food content with a family recipe",
    description:
      "Home-cooked food, photographed at home. We designed a warm, handwritten-forward system that keeps the food the hero, plus a menu template the family updates themselves every week.",
    year: 2025,
    deliverables: ["Social identity", "Menu templates", "Photo direction", "Story highlights"],
    art: "poster",
  },
  {
    slug: "sunhouse-solar",
    category: "social-media",
    title: "SunHouse Solar",
    client: "SunHouse Energy",
    tagline: "Explaining solar in one scroll",
    description:
      "Solar is an education problem before it's a design problem. We built a carousel-first content system that answers the five questions every buyer asks, with diagrams drawn to be read on a phone at 8am traffic.",
    year: 2024,
    deliverables: ["Content strategy", "Carousel system", "Diagram style", "Ad creative"],
    art: "grid",
  },
  {
    slug: "bloom-co",
    category: "product-adverts",
    title: "Bloom & Co.",
    client: "Bloom & Co.",
    tagline: "A serum launch with no studio budget",
    description:
      "A full product campaign shot on a kitchen table. We art-directed a paper-and-shadow set, designed six key visuals and animated them for paid social — all delivered in nine days.",
    year: 2026,
    deliverables: ["Campaign direction", "Key visuals", "Paid social set", "Motion cutdowns"],
    art: "bottle",
    featured: true,
  },
  {
    slug: "pulse-sneakers",
    category: "product-adverts",
    title: "Pulse Sneakers",
    client: "Pulse",
    tagline: "Product drops with a countdown feel",
    description:
      "Three drops, three moods, one recognisable frame. Pulse's advert system uses a hard red band, a rotating product plinth and a countdown lockup that customers started screenshotting before launch.",
    year: 2025,
    deliverables: ["Drop campaign", "Product key art", "Motion spots", "Retail posters"],
    art: "disc",
  },
  {
    slug: "terracotta-home",
    category: "product-adverts",
    title: "Terracotta Home",
    client: "Terracotta",
    tagline: "Ceramics that look best in shadow",
    description:
      "A catalogue refresh for a ceramics studio. We shifted from flat-lay product shots to sculptural, single-object compositions, and built a page grid that makes a twelve-piece collection feel like a gallery.",
    year: 2024,
    deliverables: ["Art direction", "Catalogue design", "Packaging inserts", "Web assets"],
    art: "ceramic",
  },
  {
    slug: "the-reading-room",
    category: "hobbies",
    title: "The Reading Room",
    client: "Personal",
    tagline: "A poster series for a fictional bookshop",
    description:
      "A self-initiated series exploring how far a bookshop identity can stretch when the only rule is 'the type does the work'. Twelve posters, two colours, one afternoon a week.",
    year: 2026,
    deliverables: ["Poster series", "Type exploration", "Risograph tests"],
    art: "poster",
  },
  {
    slug: "clay-studies",
    category: "hobbies",
    title: "Clay Studies",
    client: "Personal",
    tagline: "Hand-building, documented badly",
    description:
      "A running catalogue of ceramic experiments — vessels, pinch pots and a lot of failures. The project is mostly a discipline in photographing work honestly, but the glazes have started informing client palettes.",
    year: 2025,
    deliverables: ["Ceramics", "Photo documentation", "Glaze notes"],
    art: "ceramic",
  },
  {
    slug: "alphabets-at-2am",
    category: "hobbies",
    title: "Alphabets at 2AM",
    client: "Personal",
    tagline: "A sketchbook of letters",
    description:
      "An ongoing type sketchbook: one alphabet a month, drawn by hand, digitised only when it earns it. Some become client wordmarks. Most stay experiments, which is the point.",
    year: 2025,
    deliverables: ["Lettering", "Type drafts", "Zine"],
    art: "type",
  },
  {
    slug: "market-day",
    category: "hobbies",
    title: "Market Day",
    client: "Personal",
    tagline: "Colour studies from Balogun",
    description:
      "A photo-and-swatch study of the ways traders arrange colour at Balogun market. Started as reference gathering; became a printed zine and the palette reference for three branding projects.",
    year: 2024,
    deliverables: ["Photo study", "Palette system", "Zine"],
    art: "grid",
  },
];

export const webProjects: WebProject[] = [
  {
    slug: "uneek-studio",
    title: "Uneek Designs",
    description:
      "This site. Built around a two-slide hero, a theme-aware doodle layer and a WhatsApp-first booking flow — no form, no waiting.",
    year: 2026,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Three Fiber"],
    liveUrl: "/",
    art: "browser",
    featured: true,
  },
  {
    slug: "oriki-store",
    title: "Oríkì Records Store",
    description:
      "A lightweight storefront for a Lagos label: releases, vinyl bundles and a pre-order flow that collects orders straight into WhatsApp.",
    year: 2026,
    tech: ["Next.js", "Supabase", "Stripe", "Cloudinary"],
    art: "browser",
    featured: true,
  },
  {
    slug: "lagos-fit-club-booking",
    title: "Lagos Fit Club Booking",
    description:
      "Class schedules, trainer profiles and a booking flow that works on a 3G connection in traffic. Cut no-shows by a third in the first month.",
    year: 2025,
    tech: ["Next.js", "Supabase", "Resend", "Tailwind CSS"],
    art: "browser",
  },
  {
    slug: "sunhouse-calculator",
    title: "SunHouse Savings Calculator",
    description:
      "An interactive solar savings calculator that lets homeowners price a system in under a minute, then hands a warm lead to the sales team.",
    year: 2025,
    tech: ["React", "Vite", "Chart.js", "Netlify"],
    art: "browser",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Peculiar didn't just give us a logo. She gave us a way of talking about the business that finally made sense to customers. We sold out our first roast run in eleven days.",
    name: "Adaeze O.",
    role: "Founder, Zuri Coffee",
    initials: "AO",
  },
  {
    quote:
      "We came in with a Pinterest board and left with a system. Six months later, the feed still looks like us — even when someone else is posting.",
    name: "Tunde B.",
    role: "Marketing lead, Afrobeat Nights",
    initials: "TB",
  },
  {
    quote:
      "Fast, opinionated and genuinely easy to work with. The launch assets were ready before our bottles cleared customs.",
    name: "Ify N.",
    role: "Co-founder, Nkem Skincare",
    initials: "IN",
  },
];

export function projectsByCategory(slug: string) {
  return projects.filter((p) => p.category === slug);
}

export function featuredProjects(limit = 3) {
  return projects.filter((p) => p.featured).slice(0, limit);
}
