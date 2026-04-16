import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales, type Locale } from "./dictionaries";
import { WebsiteSchema, OrganizationSchema, LocalBusinessSchema } from "@/components/seo/structured-data";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";
  const title = isId
    ? "Kultura Properties | Perumahan Cisauk Tangerang Dekat Stasiun & BSD"
    : "Kultura Properties | Residential Developer in Cisauk, Tangerang near BSD";
  const description = isId
    ? "Pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun pengalaman, 7000+ unit terbangun. Rumah mulai Rp 600jt-an dekat Stasiun Cisauk & BSD. Cluster Fontana, Innari, Matano Boulevard."
    : "Trusted residential developer in Cisauk, Tangerang. 20+ years experience, 7000+ units built. Homes from Rp 600M near Cisauk Station & BSD. Cluster Fontana, Innari, Matano Boulevard.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://kultura.id/${locale}`,
      languages: { "en": "https://kultura.id/en", "id": "https://kultura.id/id" },
    },
    openGraph: {
      title,
      description,
      locale: isId ? "id_ID" : "en_US",
      alternateLocale: isId ? "en_US" : "id_ID",
      url: `https://kultura.id/${locale}`,
      images: [{ url: "/og/og-image.jpg", width: 1200, height: 630, alt: isId ? "Kultura Properties — Perumahan Cisauk Tangerang" : "Kultura Properties — Residential Developer Cisauk Tangerang" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <WebsiteSchema locale={locale as Locale} />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <script
        dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${locale === "id" ? "id" : "en"}"` }}
      />
      <Header dict={dict} locale={locale as Locale} />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer dict={dict} locale={locale as Locale} />
    </>
  );
}
