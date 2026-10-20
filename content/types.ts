export type ArtVariant =
  | "arch"
  | "grid"
  | "type"
  | "bottle"
  | "cards"
  | "disc"
  | "boxes"
  | "browser"
  | "ceramic"
  | "ribbon"
  | "poster"
  | "portrait";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  art: ArtVariant;
};

export type Project = {
  slug: string;
  category: string;
  title: string;
  client: string;
  tagline: string;
  description: string;
  year: number;
  deliverables: string[];
  art: ArtVariant;
  featured?: boolean;
  /** Optional Behance / Drive link. Leave undefined to route enquiries to WhatsApp. */
  externalUrl?: string;
};

export type WebProject = {
  slug: string;
  title: string;
  description: string;
  year: number;
  tech: string[];
  liveUrl?: string;
  art: ArtVariant;
  featured?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  includes: string[];
  whatsappTemplate: string;
  featured?: boolean;
  badge?: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  art: ArtVariant;
  body: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};
