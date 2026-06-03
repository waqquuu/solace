import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { getAllSlugs } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/catalog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/verify", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/quality", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/shipping", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${brand.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${brand.url}/product/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
