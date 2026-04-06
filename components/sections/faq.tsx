"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export default function FAQ({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const items = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row justify-between gap-6 mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-xs leading-tight" style={{ color: "var(--fg)" }}>
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
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto"
          style={{ borderColor: "var(--border)" }}
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={fadeUp} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium pr-4" style={{ color: "var(--fg)" }}>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--muted-fg)" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm pb-5 leading-relaxed" style={{ color: "var(--muted-fg)" }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
