import { site } from "./site";
import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "social-media-design",
    name: "Social Media Design",
    price: "₦180,000",
    cadence: "per month",
    summary:
      "A monthly design retainer for brands that post often and refuse to look like it.",
    includes: [
      "12 designed posts + 8 stories a month",
      "Editable template system",
      "One campaign concept per month",
      "Monthly grid review call",
    ],
    whatsappTemplate: `Hello ${site.owner}, I'd like to book your social media design retainer. Here's a bit about my brand and what I need: `,
    badge: "Most booked",
  },
  {
    slug: "brand-identity",
    name: "Brand Identity",
    price: "₦450,000",
    cadence: "one-off · 3–4 weeks",
    summary:
      "The full foundation: strategy, identity, and a system your team can actually run.",
    includes: [
      "Discovery workshop + positioning",
      "Logo suite & type system",
      "Colour, pattern & art direction",
      "Brand guidelines PDF",
      "Launch asset kit",
    ],
    whatsappTemplate: `Hello ${site.owner}, I'd like to book your branding services. My business is: `,
    featured: true,
  },
  {
    slug: "product-adverts",
    name: "Product Adverts",
    price: "₦320,000",
    cadence: "per campaign",
    summary:
      "Key visuals and cutdowns that make a product launch feel bigger than its budget.",
    includes: [
      "Campaign concept & art direction",
      "6–10 product key visuals",
      "Paid social crops (1:1, 4:5, 9:16)",
      "One animated cutdown",
    ],
    whatsappTemplate: `Hello ${site.owner}, I'd like to book a product advert campaign. The product is: `,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
