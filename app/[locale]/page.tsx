import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "./dictionaries";
import { FAQSchema } from "@/components/seo/structured-data";
import Hero from "@/components/sections/hero";
import PrimaryHome from "@/components/sections/primary-home";
import Explore from "@/components/sections/explore";
import About from "@/components/sections/about";
import Reviews from "@/components/sections/reviews";
import Testimonials from "@/components/sections/testimonials";
import Products from "@/components/sections/products";

function BreadcrumbSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://kultura.id/${locale}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ReviewSchema({ dict }: { dict: Record<string, string> }) {
  const reviews = [
    { name: dict.review_1_name, body: dict.review_1, project: dict.review_1_project, rating: dict.review_1_rating },
    { name: dict.review_2_name, body: dict.review_2, project: dict.review_2_project, rating: dict.review_2_rating },
    { name: dict.review_3_name, body: dict.review_3, project: dict.review_3_project, rating: dict.review_3_rating },
    { name: dict.review_4_name, body: dict.review_4, project: dict.review_4_project, rating: dict.review_4_rating },
    { name: dict.review_5_name, body: dict.review_5, project: dict.review_5_project, rating: dict.review_5_rating },
    { name: dict.review_6_name, body: dict.review_6, project: dict.review_6_project, rating: dict.review_6_rating },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Kultura Properties",
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: "5" },
      itemReviewed: { "@type": "Residence", name: r.project },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const faq = dict.faq;
  const faqItems = [
    { q: faq.q1, a: faq.a1 },
    { q: faq.q2, a: faq.a2 },
    { q: faq.q3, a: faq.a3 },
    { q: faq.q4, a: faq.a4 },
    { q: faq.q5, a: faq.a5 },
  ];

  return (
    <article>
      <BreadcrumbSchema locale={locale} />
      <FAQSchema items={faqItems} />
      <ReviewSchema dict={dict.reviews as unknown as Record<string, string>} />
      <Hero dict={dict} />
      <PrimaryHome dict={dict} />
      <Testimonials dict={dict} />
      <Products dict={dict} />
      <Explore dict={dict} />
      <About dict={dict} />
      <Reviews dict={dict} />
    </article>
  );
}
