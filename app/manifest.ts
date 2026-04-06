import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kultura - Your Trusted Real Estate Partner",
    short_name: "Kultura",
    description: "Trusted real estate platform with verified properties.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#22c55e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
