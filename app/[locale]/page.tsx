import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "./dictionaries";
import { FAQSchema } from "@/components/seo/structured-data";
import Hero from "@/components/sections/hero";
import PrimaryHome from "@/components/sections/primary-home";
import Stats from "@/components/sections/stats";
import BestValue from "@/components/sections/best-value";
import Explore from "@/components/sections/explore";
import FAQ from "@/components/sections/faq";
import Testimonials from "@/components/sections/testimonials";
import Products from "@/components/sections/products";
import CTA from "@/components/sections/cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const faqItems = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
  ];

  return (
    <article>
      <FAQSchema items={faqItems} />
      <Hero dict={dict} />
      <PrimaryHome dict={dict} />
      <Testimonials dict={dict} />
      <Products dict={dict} />
      <Stats dict={dict} />
      <BestValue dict={dict} />
      <Explore dict={dict} />
      <FAQ dict={dict} />
      <CTA dict={dict} />
    </article>
  );
}
