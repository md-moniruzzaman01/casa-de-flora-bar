import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes: { path: string; changeFrequency: "yearly" | "monthly" | "weekly" | "daily"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
  { path: "/reservations", changeFrequency: "weekly", priority: 0.95 },
  { path: "/bouquet", changeFrequency: "weekly", priority: 0.85 },
  { path: "/florals", changeFrequency: "monthly", priority: 0.8 },
  { path: "/celebrate", changeFrequency: "monthly", priority: 0.85 },
  { path: "/catering", changeFrequency: "monthly", priority: 0.85 },
  { path: "/vanue", changeFrequency: "monthly", priority: 0.85 },
  { path: "/summer-events", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
