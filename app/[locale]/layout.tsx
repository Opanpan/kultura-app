import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales, type Locale } from "./dictionaries";
import { WebsiteSchema, OrganizationSchema } from "@/components/seo/structured-data";
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
  return {
    alternates: {
      canonical: `https://kultura.id/${locale}`,
      languages: { en: "/en", "id-ID": "/id" },
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
      <Header dict={dict} locale={locale as Locale} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer dict={dict} locale={locale as Locale} />
    </>
  );
}
