"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export default function CTA({ dict }: { dict: Dictionary }) {
  const t = dict.cta;

  return (
    <section className="py-24 text-center" style={{ background: "var(--fg)", color: "var(--bg)" }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
          {t.title_1}
          <br />
          {t.title_2}
        </h2>
        <p className="text-sm mb-8 max-w-lg mx-auto leading-relaxed opacity-60">{t.description}</p>
        <button className="font-medium px-8 py-3.5 rounded-full transition-colors text-sm" style={{ background: "var(--bg)", color: "var(--fg)" }}>
          {t.button}
        </button>
      </motion.div>
    </section>
  );
}
