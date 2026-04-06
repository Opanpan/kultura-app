"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const propertyImages = [
  "/images/property-1.jpg",
  "/images/property-2.jpg",
  "/images/property-3.jpg",
  "/images/property-4.jpg",
  "/images/property-1.jpg",
  "/images/property-2.jpg",
  "/images/property-3.jpg",
  "/images/property-4.jpg",
];

export default function Explore({ dict }: { dict: Dictionary }) {
  const t = dict.explore;
  const properties = propertyImages.map((image, i) => ({
    id: i + 1, image, title: t.card_title, price: t.card_price,
  }));

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col md:flex-row justify-between gap-6 mb-10"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-md leading-tight" style={{ color: "var(--fg)" }}>
              {t.title}
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-md md:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
          </m.div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8"
          >
            {properties.map((p) => (
              <m.article key={p.id} variants={fadeUp} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image src={p.image} alt={p.title} fill loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
                <h3 className="text-sm font-medium truncate transition-colors" style={{ color: "var(--fg)" }}>{p.title}</h3>
                <p className="text-base font-bold mt-0.5" style={{ color: "var(--fg)" }}>{p.price}</p>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
