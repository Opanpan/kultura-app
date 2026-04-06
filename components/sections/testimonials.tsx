"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;

  return (
    <section className="py-20" style={{ background: "var(--muted)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row justify-between gap-6 mb-10"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-xs leading-tight" style={{ color: "var(--fg)" }}>
            {t.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm max-w-md md:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
            {t.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex flex-col md:flex-row items-stretch gap-0 max-w-4xl mx-auto rounded-2xl overflow-hidden"
        >
          <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Happy client"
              fill
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
        </motion.div>
      </div>
    </section>
  );
}
