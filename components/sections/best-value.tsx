"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export default function BestValue({ dict }: { dict: Dictionary }) {
  const t = dict.bestValue;

  return (
    <section className="py-20" style={{ background: "var(--muted)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          <motion.div variants={fadeUp} className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--fg)" }}>
              {t.title}
            </h2>
            <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
            <button className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full transition-colors" style={{ background: "var(--fg)", color: "var(--bg)" }}>
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Best value property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
