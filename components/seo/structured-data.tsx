import type { Locale } from "@/app/[locale]/dictionaries";

const BASE_URL = "https://kultura.id";

export function WebsiteSchema({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kultura",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Kultura",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: "Trusted real estate platform connecting buyers and sellers with verified properties.",
    areaServed: ["ID", "US", "GB"],
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
