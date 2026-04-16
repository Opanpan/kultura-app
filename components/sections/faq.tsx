"use client";

import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

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
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row justify-between gap-6 mb-12"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-xs leading-tight" style={{ color: "var(--fg)" }}>
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
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            {items.map((item, i) => (
              <m.div key={i} variants={fadeUp} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left min-h-[44px]"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="text-sm font-medium pr-4" style={{ color: "var(--fg)" }}>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                    style={{ color: "var(--muted-fg)" }}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <m.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm pb-5 leading-relaxed" style={{ color: "var(--muted-fg)" }}>{item.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
