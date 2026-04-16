import type { MetadataRoute } from "next";

const BASE_URL = "https://kultura.id";
const locales = ["en", "id"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Root redirect
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Locale pages
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          id: `${BASE_URL}/id`,
          "x-default": `${BASE_URL}/id`,
        },
      },
    });
  }
  return entries;
}
