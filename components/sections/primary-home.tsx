"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row justify-between gap-6 mb-8"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl max-w-md leading-tight" style={{ color: "var(--fg)" }}>
            <span className="font-normal">{t.title}</span>{" "}
            <span className="font-bold">{t.title_bold}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm max-w-md lg:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Image grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src={`https://images.unsplash.com/photo-${
                  i === 1 ? "1600596542815-ffad4c1539a9?w=600&q=80"
                    : i === 2 ? "1600585154340-be6161a56a0c?w=600&q=80"
                    : "1512917774080-9991f1c4c750?w=600&q=80"
                }`}
                alt={`Modern home ${i}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {i === 3 && (
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <button className="bg-white/90 p-2 rounded-full shadow-sm" aria-label="Previous">
                    <ChevronLeft className="w-4 h-4 text-neutral-900" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full shadow-sm" aria-label="Next">
                    <ChevronRight className="w-4 h-4 text-neutral-900" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mb-4"
        >
          <motion.p variants={fadeUp} className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted-fg)" }}>
            {t.description}
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm font-medium" style={{ color: "var(--fg)" }}>
            {t.sub_description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
