import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kultura.id"),
  title: { default: "Kultura Properties | Perumahan Cisauk Tangerang Dekat Stasiun & BSD", template: "%s | Kultura Properties" },
  description:
    "Kultura Properties — pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun pengalaman, 7000+ unit terbangun. Rumah mulai Rp 600jt-an dekat Stasiun Cisauk & BSD. Cluster Fontana, Innari, Matano Boulevard, New Abaya Village.",
  keywords: [
    "kultura properties",
    "kultura properties cisauk",
    "perumahan cisauk",
    "rumah dijual cisauk",
    "rumah dekat stasiun cisauk",
    "perumahan tangerang",
    "rumah murah tangerang",
    "perumahan dekat BSD",
    "rumah dekat BSD city",
    "perumahan dekat tol serbaraja",
    "cluster fontana cisauk",
    "cluster innari cisauk",
    "matano boulevard cisauk",
    "new abaya village cisauk",
    "new maninjau cisauk",
    "developer perumahan cisauk",
    "developer properti tangerang",
    "rumah KPR cisauk tangerang",
    "rumah baru cisauk 2025",
    "perumahan baru tangerang selatan",
    "rumah dijual dekat stasiun KRL",
    "properti cisauk BSD",
    "jual rumah cisauk tangerang",
    "perumahan cisauk tangerang banten",
    "rumah cluster cisauk",
    "hunian modern cisauk",
    "real estate cisauk tangerang",
    "property developer indonesia",
    "residential cisauk near station",
    "house for sale cisauk tangerang",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Kultura Properties",
    locale: "id_ID",
    alternateLocale: "en_US",
    title: "Kultura Properties | Perumahan Cisauk Tangerang Dekat Stasiun & BSD",
    description: "Pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun pengalaman, 7000+ unit. Rumah mulai Rp 600jt-an dekat Stasiun Cisauk & BSD.",
    images: [{ url: "/og/og-image.jpg", width: 1200, height: 630, alt: "Kultura Properties — Perumahan Cisauk Tangerang" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kultura Properties | Perumahan Cisauk Tangerang",
    description: "Pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun, 7000+ unit. Dekat Stasiun Cisauk & BSD.",
  },
  other: {
    "geo.region": "ID-BT",
    "geo.placename": "Cisauk, Tangerang, Banten, Indonesia",
    "ICBM": "-6.3297, 106.6406",
    "geo.position": "-6.3297;106.6406",
    "place:location:latitude": "-6.3297",
    "place:location:longitude": "106.6406",
    "business:contact_data:street_address": "Cisauk",
    "business:contact_data:locality": "Tangerang",
    "business:contact_data:region": "Banten",
    "business:contact_data:postal_code": "15345",
    "business:contact_data:country_name": "Indonesia",
    "business:contact_data:phone_number": "+62-811-1200-4007",
    "business:contact_data:email": "hello@kulturaproperties.com",
  },
  category: "Real Estate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }}
        />
        {children}
      </body>
    </html>
  );
}
