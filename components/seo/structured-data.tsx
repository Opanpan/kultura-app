import type { Locale } from "@/app/[locale]/dictionaries";

const BASE_URL = "https://kultura.id";

export function WebsiteSchema({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kultura Properties",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    description: locale === "id"
      ? "Pengembang perumahan terpercaya di Cisauk, Tangerang. 20+ tahun pengalaman, 7000+ unit terbangun."
      : "Trusted residential developer in Cisauk, Tangerang. 20+ years experience, 7000+ units built.",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Kultura Properties",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: "Pengembang perumahan terpercaya di Cisauk, Tangerang dengan pengalaman lebih dari 20 tahun. Membangun hunian yang relevan, nyaman, dan menciptakan kebahagiaan.",
    foundingDate: "2004",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: -6.3297, longitude: 106.6406 },
      geoRadius: "20000",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cisauk",
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
      postalCode: "15345",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.3297,
      longitude: 106.6406,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-811-1200-4007",
      contactType: "sales",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://www.instagram.com/kulturaproperties",
      "https://www.tiktok.com/@kulturaproperties",
      "https://youtube.com/@kulturaproperties",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "6",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kultura Properties Projects",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cluster Fontana", description: "Modern cluster housing in Cisauk" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cluster Innari", description: "Contemporary residential cluster near Cisauk Station" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Matano Boulevard", description: "Boulevard-style residential with lake view" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "New Abaya Village", description: "Village-style residential community" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "New Maninjau", description: "Lakeside residential with green environment" } },
      ],
    },
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

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Kultura Properties",
    image: `${BASE_URL}/images/logo.png`,
    url: BASE_URL,
    telephone: "+62-811-1200-4007",
    email: "kulturaproperties.info@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cisauk",
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
      postalCode: "15345",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.3297,
      longitude: 106.6406,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "17:00",
    },
    priceRange: "Rp 600.000.000 - Rp 2.000.000.000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "6",
      bestRating: "5",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
