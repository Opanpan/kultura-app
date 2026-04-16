"use client";

import { m, LazyMotion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const reviewKeys = ["1", "2", "3", "4", "5", "6"] as const;

export default function Reviews({ dict }: { dict: Dictionary }) {
  const t = dict.reviews;

  const items = reviewKeys.map((k) => ({
    quote: t[`review_${k}` as keyof typeof t],
    name: t[`review_${k}_name` as keyof typeof t],
    project: t[`review_${k}_project` as keyof typeof t],
    rating: parseInt(t[`review_${k}_rating` as keyof typeof t]),
  }));

  return (
    <LazyMotion features={loadFeatures} strict>
      <section id="reviews" className="py-24" style={{ background: "var(--muted)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Header */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4" style={{ color: "var(--fg)" }}>
              {t.title}
            </m.h2>
            <m.p variants={fadeUp} className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
          </m.div>

          {/* Masonry-style grid */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {items.map((item, i) => (
              <m.div
                key={i}
                variants={fadeUp}
                className="flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-lg"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4"
                      style={{
                        color: s < item.rating ? "#f59e0b" : "var(--border)",
                        fill: s < item.rating ? "#f59e0b" : "none",
                      }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base leading-relaxed mb-5 flex-1" style={{ color: "var(--fg)" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--fg)", color: "var(--bg)" }}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: "var(--fg)" }}>{item.name}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
