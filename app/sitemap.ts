import type { MetadataRoute } from "next";

const BASE_URL = "https://kultura.id";
const locales = ["en", "id"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/faq", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }
  return entries;
}
