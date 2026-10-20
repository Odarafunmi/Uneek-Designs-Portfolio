import type { MetadataRoute } from "next";
import { categories, projects } from "@/content/work";
import { posts } from "@/content/posts";

const BASE = "https://uneekdesigns.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/web", "/blog", "/services", "/contact"].map(
    (route) => ({
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const categoryRoutes = categories.map((category) => ({
    url: `${BASE}/work/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE}/work/${project.category}/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes, ...postRoutes];
}
