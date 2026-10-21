/**
 * Single source of truth for contact details and global copy.
 * Swap these values for the live ones (or hydrate from the Supabase `settings`
 * table) — nothing else in the site hardcodes a phone number.
 */
export const site = {
  name: "Uneek Designs",
  owner: "Peculiar",
  role: "Brand & Product Designer",
  location: "Lagos, Nigeria",
  timezone: "WAT",
  email: "odarafunmipeculiar@gmail.com",
  phoneDisplay: "+234 814 515 2707",
  phone: "+2348145152707",
  /** International format, digits only — used for wa.me links and the QR code. */
  whatsapp: "2348181848719",
  whatsappDisplay: "+234 818 184 8719",
  driveUrl:
    "https://drive.google.com/drive/folders/1p-dpckOpX7FIDYmvl-JuAKvKQGTtcpOm",
  behance: "https://www.behance.net/",
  instagram: "https://instagram.com/",
  x: "https://x.com/",
  linkedin: "https://www.linkedin.com/",
  availability: "Booking projects for Nov – Dec 2026",
  yearsExperience: 3,
  projectsDelivered: 50,
  brandsOnRetainer: 5,
  responseTime: "Replies within a few hours",
  description:
    "Uneek Designs is the studio of Peculiar, a Lagos-based brand and product designer building identities, adverts and social systems that make small brands look inevitable.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/web", label: "Web" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage = `Hello ${site.owner}, I found your portfolio and I'd love to talk about a project.`;
