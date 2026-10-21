import type { Category, Project, Testimonial, WebProject } from "./types";

/** Google Drive thumbnail endpoint — the portfolio folders are share-with-link. */
const drive = (id: string, width = 1400) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

const FOLDER = "https://drive.google.com/drive/folders/";

export const categories: Category[] = [
  {
    slug: "branding",
    name: "Branding",
    tagline: "Identities with a point of view",
    blurb:
      "Logos, type systems, colour and the guidelines that keep everything looking like it came from the same brain.",
    art: "type",
    cover: drive("1Ef383AV_v8Hr4n3VBrQlZTIv6aFvFVVn"),
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: "Feeds that earn the scroll",
    blurb:
      "Template systems, campaign frames and content design built to be posted every week without losing the plot.",
    art: "cards",
    cover: drive("1fqtchhAjTMYBEbFCPoLfpNdjz_GRSdLI"),
  },
  {
    slug: "product-adverts",
    name: "Product Adverts",
    tagline: "Objects, made irresistible",
    blurb:
      "Product key art, packaging mockups and ad sets that turn a catalogue photo into something people save.",
    art: "bottle",
    cover: drive("1xBUbgGWaCuDXKxnC4UlrhiBgqgL1rFeA"),
  },
  {
    slug: "print",
    name: "Print",
    tagline: "Pieces you can hold",
    blurb:
      "Flyers, billboards, newspapers and packaging — print work built with the same eye as the screen stuff.",
    art: "poster",
    cover: drive("16GGZyD3O-sCxNAUgOlfjAlmCL2WRzhG3"),
  },
];

export const projects: Project[] = [
  /* ---------------------------------------------------------------- Branding */
  {
    slug: "kiisi-collections",
    category: "branding",
    title: "Kiisi Collections",
    client: "Kiisi Collections",
    tagline: "A fashion label dressed in its own system",
    description:
      "A full brand book for Kiisi Collections: the mark, the palette, the type scale and the application rules that keep a growing label consistent from lookbook to hangtag. The guidelines were built page by page so the team can hand them to any printer or designer.",
    year: 2026,
    deliverables: ["Brand strategy", "Wordmark", "Brand guidelines", "Print applications"],
    art: "type",
    cover: drive("1Ef383AV_v8Hr4n3VBrQlZTIv6aFvFVVn"),
    gallery: [
      drive("12cOrHOdgdvlOqociiKwqaPmDHaS5I5jA", 1200),
      drive("1cLfgezPM6MiDElWvSIyF67Ow-qL0YdcN", 1200),
      drive("1nTT-uHiiOI-gxS53OeOe4Xb4WiUfPrjF", 1200),
    ],
    driveUrl: FOLDER + "1RwkEzuH9qV3uPd0XSb-5NZ5HdZAQ4voJ",
    featured: true,
  },
  {
    slug: "uneek-rebrand",
    category: "branding",
    title: "Uneek Rebrand",
    client: "Uneek Designs",
    tagline: "The studio's own identity, redrawn",
    description:
      "The Uneek rebrand: a sharper monogram, a red that holds up on screen and in print, and a set of applications from stationery to signage. This is the system the studio runs on today.",
    year: 2026,
    deliverables: ["Monogram", "Colour system", "Stationery", "Signage"],
    art: "arch",
    cover: drive("1XWlyaucYNw6kO1R3bM8JrxfT4y0YBW1I"),
    gallery: [
      drive("1eAqyd9q9LhsXBoazJ3zHHeCrxZbrtCn_", 1200),
      drive("1IBGA4LSv-16ECDKSnZANW5oaD0GJXKw9", 1200),
      drive("1oFSVKmxOdNZGf31rNT_sPslAYS3K5DWY", 1200),
    ],
    driveUrl: FOLDER + "1kuCAfJWO0z8I498-uho5peSYnPeRDXTf",
  },
  {
    slug: "zyntra-fitness",
    category: "branding",
    title: "Zyntra Fitness",
    client: "Zyntra Fitness",
    tagline: "A gym brand built to move",
    description:
      "A brand book for Zyntra Fitness covering the mark, the energetic colour system and the type treatment, then showing it all in motion across apparel, signage and social.",
    year: 2025,
    deliverables: ["Brand book", "Wordmark", "Colour & type", "Apparel"],
    art: "grid",
    cover: drive("1sPbli1BPBxBIqgw2mhMdUSV6nlSP9jhd"),
    gallery: [
      drive("1LD1JAwPmpm10MadnSB1Ujtz-_9RFUGTD", 1200),
      drive("1r7GBGaMBZgzyRC4O2-sfPDDIicc6j5aL", 1200),
      drive("1c6IWo1501LqCwcNETccGQdsJv02ve4Zj", 1200),
    ],
    driveUrl: FOLDER + "1ns00xKStpadLNUw-iTC6_urwkwQuIX-R",
  },

  /* ------------------------------------------------------------ Social media */
  {
    slug: "christmas-wonderland",
    category: "social-media",
    title: "Christmas Wonderland",
    client: "Christmas Wonderland",
    tagline: "A festive campaign, one grid at a time",
    description:
      "A Christmas campaign system: newspaper-style announcements, carousels and countdown posts that hold together across the whole season without repeating the same frame.",
    year: 2025,
    deliverables: ["Campaign concept", "Carousels", "Print announcements"],
    art: "cards",
    cover: drive("1fqtchhAjTMYBEbFCPoLfpNdjz_GRSdLI"),
    gallery: [
      drive("1-XwmPOFN_v9n-QyCs175v77TYdE8QDxE", 1200),
      drive("15GRERA3wft8yWXwbdZ2AeQtqBzC9kDM0", 1200),
      drive("1CzlL6Y2wiLqnQSsf7jVNHWEESs7wrPQX", 1200),
    ],
    driveUrl: FOLDER + "12hrhq2uH5ynWd_o9Iy_oQnJHQva4VQJJ",
  },
  {
    slug: "church-flyers",
    category: "social-media",
    title: "Church Flyers",
    client: "Church Flyers",
    tagline: "Weekly announcements that still look designed",
    description:
      "A rolling flyer system for weekly services and special Sundays — billboards, A5 handouts and social crops that share one grid, one type hierarchy and one colour language.",
    year: 2025,
    deliverables: ["Flyers", "Billboard", "Social crops"],
    art: "poster",
    cover: drive("1qYSdvKSLZKNN7okT_CrVkL3kZaElXAhw"),
    gallery: [
      drive("1H-MU-lrNXzXs36DYE2dgY7DHqbx_1XOk", 1200),
      drive("10N0Q0fJh3-9iTR2PXRs25g0uQDFukFXi", 1200),
      drive("1y6qpp6-l-Lwsb_80DYbw8pVfDJdKiNZy", 1200),
    ],
    driveUrl: FOLDER + "1hZ9atuFfZGB2ink106oqo-0KRRmscQSV",
  },
  {
    slug: "fenchurch",
    category: "social-media",
    title: "Fenchurch",
    client: "Fenchurch",
    tagline: "A calendar that never runs out of ideas",
    description:
      "Social design for Fenchurch across the year: holiday posts, hiring notes, internal campaigns and Monday motivation, all kept on one restrained system.",
    year: 2025,
    deliverables: ["Social templates", "Campaign posts", "Motion-ready art"],
    art: "cards",
    cover: drive("11au-iZvxs586_w5dCK9FZYM0gIywN_4u"),
    gallery: [
      drive("1KEZBoVp6SmjV5DSZbNAB6bmaOTSDTelG", 1200),
      drive("13yonNU9Cp0Dz8Zmv6u_HEb4qChbiYGYi", 1200),
      drive("1Xy-SpYU32DP3fQRRvd-9Ovpk7u8WS6bL", 1200),
    ],
    driveUrl: FOLDER + "1ayKPTYYpevby7L-1ne6ZqYrYFsxy6s--",
    featured: true,
  },
  {
    slug: "metricore-ai",
    category: "social-media",
    title: "Metricore AI",
    client: "Metricore AI",
    tagline: "Making an AI product feel human",
    description:
      "Launch and always-on social for Metricore AI — carousels and feature frames that explain a technical product in plain, confident visuals.",
    year: 2026,
    deliverables: ["Carousels", "Launch posts", "Feature frames"],
    art: "browser",
    cover: drive("13-KhGbjU1_FN_PLuCcU9YCyffZO5D-jW"),
    gallery: [
      drive("185bkNWGft6k_QwkTru7VXW5yczhQqhZ4", 1200),
    ],
    driveUrl: FOLDER + "1rfxyiY1QBJ9L5YN35efk9yugV4kypE-w",
  },
  {
    slug: "oister",
    category: "social-media",
    title: "Oister",
    client: "Oister",
    tagline: "A year of moments, one voice",
    description:
      "Festival and seasonal social for Oister — Easter, Ramadan, Women's Day, Christmas and New Year — designed as a family of posts rather than one-offs.",
    year: 2025,
    deliverables: ["Seasonal posts", "Event art", "LinkedIn features"],
    art: "disc",
    cover: drive("1XY_DUKSNYPo5CmGRZzXkWByVyxETUWHW"),
    gallery: [
      drive("1O4j8HzCyStp0kBvjsQdzmCk1pN7D64D5", 1200),
      drive("1uwSCgtL5K-Dxw4JMlGvur4Y7iHkx26cg", 1200),
      drive("1n7KeXV47Nugj6hyX5GELZ1SfKN74yFye", 1200),
    ],
    driveUrl: FOLDER + "199rxWQNXKVU9ORNxYwgm3fOtKfYTALNE",
  },
  {
    slug: "uneek-social",
    category: "social-media",
    title: "Uneek Social",
    client: "Uneek Designs",
    tagline: "The studio's own feed, on its own system",
    description:
      "The studio's monthly posting system: Monday Motivation, seasonal posts and the recurring formats that keep the Uneek feed recognisable in a scroll.",
    year: 2026,
    deliverables: ["Monthly templates", "Recurring formats", "Story crops"],
    art: "ribbon",
    cover: drive("1-54-2W7LoW0QGI1BcxnOqL-I1_9R3Ut4"),
    gallery: [
      drive("1YVomJ3JpxMvKMbf6IWInLbSxFv87kmr0", 1200),
      drive("19tYgVN2wvrMghh41svfcH-EoazwzerwE", 1200),
      drive("1-lA5P5uviV8GfuEvziiAJS5o57oAlR84", 1200),
    ],
    driveUrl: FOLDER + "1t9mo1dTPV6F69W7agxffO9olJdxVNlex",
  },

  /* --------------------------------------------------------- Product adverts */
  {
    slug: "kayali",
    category: "product-adverts",
    title: "Kayali",
    client: "Kayali",
    tagline: "Fragrance, shot like it matters",
    description:
      "Key art for Kayali fragrance: hard light, deep shadow and a single hit of colour, built as a set that works as a square post, a story and a store banner.",
    year: 2025,
    deliverables: ["Product key art", "Ad set", "Social crops"],
    art: "bottle",
    cover: drive("1xBUbgGWaCuDXKxnC4UlrhiBgqgL1rFeA"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
    featured: true,
  },
  {
    slug: "nivea-sun",
    category: "product-adverts",
    title: "Nivea Sun",
    client: "Nivea",
    tagline: "Sun care with a summer pulse",
    description:
      "A summer product advert for Nivea Sun — bright, warm and uncluttered, with the product doing the talking and the type kept out of its way.",
    year: 2026,
    deliverables: ["Key visual", "Campaign crops"],
    art: "bottle",
    cover: drive("16ABlaHDnyED6AWO57xJrUXin0VD9D_34"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "oraimo-spacebox",
    category: "product-adverts",
    title: "Oraimo Spacebox",
    client: "Oraimo",
    tagline: "Audio, staged like hardware",
    description:
      "Product advert for Oraimo's Spacebox speaker: studio lighting, a controlled palette and a composition that leaves room for the claim.",
    year: 2025,
    deliverables: ["Product key art", "Retail banner"],
    art: "boxes",
    cover: drive("1930rjXnh5YvZjNtuFXKHvT_aLH6T1fMI"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "samsong",
    category: "product-adverts",
    title: "Samsong",
    client: "Samsong",
    tagline: "Household tech, premium light",
    description:
      "A product advert built to lift Samsong out of the appliance aisle: clean staging, a tight grade and type that reads at thumbnail size.",
    year: 2025,
    deliverables: ["Key visual", "Ad set"],
    art: "boxes",
    cover: drive("1bCe09GwlpVbxdPYitpWjonniygrsNyBf"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "lador",
    category: "product-adverts",
    title: "Lador",
    client: "Lador",
    tagline: "Hair care, sold on shine",
    description:
      "Lador product adverts across two artboards — the same bottle, two moods, both leaning on gloss, reflection and a tight red accent.",
    year: 2025,
    deliverables: ["Product key art", "Ad set"],
    art: "bottle",
    cover: drive("1c6bc8rTLGS-PSQ4wZFuWzLW4hH7DaBSP"),
    gallery: [drive("1k9GpCw4WG-ajE0u8ISmAL8257HJAGM4J", 1200)],
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "medix",
    category: "product-adverts",
    title: "Medix",
    client: "Medix",
    tagline: "Clinical, not cold",
    description:
      "Product advert for Medix: a clean, medical-adjacent composition that still feels warm enough to pick up off a shelf.",
    year: 2025,
    deliverables: ["Product key art"],
    art: "bottle",
    cover: drive("1kYXRXJkbYwBcWfvIXPNopqd60OqVIsy7"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "lipstick",
    category: "product-adverts",
    title: "Lipstick",
    client: "Studio piece",
    tagline: "One object, one colour story",
    description:
      "A beauty advert study: a single lipstick, a saturated backdrop and a composition built to make the product feel collectable.",
    year: 2025,
    deliverables: ["Key visual"],
    art: "bottle",
    cover: drive("1zH1Gzi9b919Pgp2sAJAIZLztiBlj0Ofz"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "alonzo-kinglier",
    category: "product-adverts",
    title: "Alonzo Kinglier",
    client: "Alonzo Kinglier",
    tagline: "A label with a sharper edge",
    description:
      "Product advert for Alonzo Kinglier, staged with plenty of negative space so the brand mark and the product share the frame without competing.",
    year: 2025,
    deliverables: ["Key visual", "Ad set"],
    art: "boxes",
    cover: drive("1sRGmgylCzSTKb0FyqPWOq4SM_LGSH2Fh"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "product-practice",
    category: "product-adverts",
    title: "Product Practice",
    client: "Studio series",
    tagline: "Three takes, one lighting rig",
    description:
      "A studio practice series — three product scenes built on the same lighting rig to test how far one setup can stretch before it starts repeating itself.",
    year: 2025,
    deliverables: ["Key visuals", "Lighting study"],
    art: "bottle",
    cover: drive("1nZLE4AIaQ3MPJOyEEUUDB2hJnYPjUn8e"),
    gallery: [
      drive("1aH6Gaw9HP1yOAOizCNUcs5pUNURbw0BB", 1200),
      drive("1Q9kdgaeeJtpw1z9xD8RJ82ty83d3A-Kn", 1200),
    ],
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },
  {
    slug: "monday-motivation",
    category: "product-adverts",
    title: "Monday Motivation",
    client: "Studio series",
    tagline: "A weekly post that refuses to look weekly",
    description:
      "A long-running Monday Motivation series: one layout family, endlessly re-composed, so the post is recognisable before you read a word of it.",
    year: 2025,
    deliverables: ["Post series", "Layout system"],
    art: "poster",
    cover: drive("1G1Bd5WO_lEqNlOCFlyg_2Uk6jK3jKCeH"),
    driveUrl: FOLDER + "1sizpOS4zvDxJ0RJrkWKPu8-EL3zfM4oi",
  },

  /* ------------------------------------------------------------------- Print */
  {
    slug: "church-flyer-print",
    category: "print",
    title: "Church Flyer — Print",
    client: "Church Flyers",
    tagline: "Flyers built for the wall, not the feed",
    description:
      "The print side of the Church Flyers system: A5 handouts and larger format pieces with heavier type, richer ink and margins that survive a bad printer.",
    year: 2025,
    deliverables: ["A5 flyers", "Large format"],
    art: "poster",
    cover: drive("16GGZyD3O-sCxNAUgOlfjAlmCL2WRzhG3"),
    gallery: [
      drive("1bKV7Qhy0PZHQb4L5PBU3qCDQeYqbEUJj", 1200),
      drive("1_wT8X_g4pzVn7Tf6aJdf-A8W2U7fKaCa", 1200),
      drive("1fEneiVzwNRcTH5KIWn8ADVSKgLgX_10d", 1200),
    ],
    driveUrl: FOLDER + "1kF9eUfe4ij4_KnvK_Z-IA2Q_I0bXGF7I",
  },
  {
    slug: "royal-packages",
    category: "print",
    title: "Royal Packages",
    client: "Royal Packages",
    tagline: "Packaging that earns the shelf",
    description:
      "Packaging artwork for Royal Packages — structure, print specification and the finished mockup, designed to be read from two metres away.",
    year: 2025,
    deliverables: ["Packaging art", "Print spec"],
    art: "boxes",
    cover: drive("1GPQZM9J8Nx-bJDOSzh2zz-Rhp6tvEFZI"),
    driveUrl: FOLDER + "1u1BFK1zmtaCUHTsWBB2bCE2sZ7sOCq4F",
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

/**
 * Real client quotes only — the section is hidden while this is empty rather
 * than shipping invented testimonials. Add `{ quote, name, role, initials }`.
 */
export const testimonials: Testimonial[] = [];

export function projectsByCategory(slug: string) {
  return projects.filter((p) => p.category === slug);
}

export function featuredProjects(limit = 3) {
  return projects.filter((p) => p.featured).slice(0, limit);
}
