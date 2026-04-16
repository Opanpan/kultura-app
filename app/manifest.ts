import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kultura Properties — Perumahan Cisauk Tangerang",
    short_name: "Kultura",
    description: "Pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun pengalaman, 7000+ unit terbangun dekat Stasiun Cisauk & BSD.",
    start_url: "/id",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#0a0a0a",
    categories: ["business", "real estate"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
