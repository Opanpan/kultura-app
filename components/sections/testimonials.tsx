"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row justify-between gap-6 mb-10"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-xs leading-tight" style={{ color: "var(--fg)" }}>
              {t.title}
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-md md:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
          </m.div>

          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex flex-col md:flex-row items-stretch gap-0 max-w-4xl mx-auto rounded-2xl overflow-hidden"
          >
            <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto">
              <Image
                src="/images/testimonial.jpg"
                alt="Happy client"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="bg-white/90 p-2 rounded-full shadow-sm" aria-label="Previous testimonial">
                  <ChevronLeft className="w-4 h-4 text-neutral-900" />
                </button>
                <button className="bg-white/90 p-2 rounded-full shadow-sm" aria-label="Next testimonial">
                  <ChevronRight className="w-4 h-4 text-neutral-900" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center" style={{ background: "var(--fg)", color: "var(--bg)" }}>
              <Quote className="w-8 h-8 mb-4 opacity-40" />
              <p className="text-base leading-relaxed font-medium">{t.quote}</p>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
