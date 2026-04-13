import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
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
  title: { default: "Kultura | Your Trusted Real Estate Partner", template: "%s | Kultura" },
  description:
    "Kultura connects buyers and sellers through a trusted platform with verified properties, transparent deals, and expert guidance.",
  keywords: [
    "real estate",
    "property",
    "buy house",
    "rent house",
    "properti",
    "rumah dijual",
    "kultura",
    "real estate Indonesia",
    "jual rumah",
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
    siteName: "Kultura",
    locale: "id_ID",
    alternateLocale: "en_US",
    images: [{ url: "/og/og-image.jpg", width: 1200, height: 630, alt: "Kultura Real Estate" }],
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "ID",
    "geo.placename": "Indonesia",
    "ICBM": "-6.2088, 106.8456",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        {children}
      </body>
    </html>
  );
}
