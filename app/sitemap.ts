import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/portfolio", "/ai-studio", "/about", "/pricing", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: new Date() })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/portfolio/${p.slug}`, lastModified: new Date() })),
  ];
}
