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
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <article>
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
