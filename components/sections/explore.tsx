"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const propertyImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=80",
];

export default function Explore({ dict }: { dict: Dictionary }) {
  const t = dict.explore;
  const properties = propertyImages.map((image, i) => ({
    id: i + 1, image, title: t.card_title, price: t.card_price,
  }));

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col md:flex-row justify-between gap-6 mb-10"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-md leading-tight" style={{ color: "var(--fg)" }}>
            {t.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm max-w-md md:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
            {t.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8"
        >
          {properties.map((p) => (
            <motion.article key={p.id} variants={fadeUp} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              </div>
              <h3 className="text-sm font-medium truncate transition-colors" style={{ color: "var(--fg)" }}>{p.title}</h3>
              <p className="text-base font-bold mt-0.5" style={{ color: "var(--fg)" }}>{p.price}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
