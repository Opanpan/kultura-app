"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const images = [
  "/images/testimonials/willy.webp",
  "/images/testimonials/gilang.webp",
  "/images/testimonials/widia.webp",
];

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;
  const items = [
    { image: images[0], quote: t.quote_1, name: t.name_1 },
    { image: images[1], quote: t.quote_2, name: t.name_2 },
    { image: images[2], quote: t.quote_3, name: t.name_3 },
  ];
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const current = items[idx];

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
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

          {/* Testimonial card */}
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden min-h-[400px]" style={{ background: "var(--card)" }}>
            {/* Image side */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <m.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={current.name} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </m.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />

              {/* Nav arrows */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <button onClick={prev} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95" aria-label="Previous testimonial">
                  <ChevronLeft className="w-4 h-4 text-neutral-900" />
                </button>
                <button onClick={next} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95" aria-label="Next testimonial">
                  <ChevronRight className="w-4 h-4 text-neutral-900" />
                </button>
              </div>
            </div>

            {/* Quote side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center" style={{ background: "var(--fg)", color: "var(--bg)" }}>
              <Quote className="w-10 h-10 mb-6 opacity-20" />

              <AnimatePresence mode="wait">
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="text-lg md:text-xl leading-relaxed font-medium mb-8">
                    &ldquo; {current.quote} &rdquo;
                  </p>
                  <p className="text-sm font-medium opacity-60">– {current.name}</p>
                </m.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === idx ? 24 : 8,
                      background: i === idx ? "var(--bg)" : "var(--bg)",
                      opacity: i === idx ? 1 : 0.3,
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
