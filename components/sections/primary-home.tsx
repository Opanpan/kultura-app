"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row justify-between gap-6 mb-8"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl max-w-md leading-tight" style={{ color: "var(--fg)" }}>
              <span className="font-normal">{t.title}</span>{" "}
              <span className="font-bold">{t.title_bold}</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-md lg:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.subtitle}
            </m.p>
          </m.div>

          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            {["/images/home-1.jpg", "/images/home-2.jpg", "/images/home-3.jpg"].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`Modern home ${i + 1}`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {i === 2 && (
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
          </m.div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mb-4"
          >
            <m.p variants={fadeUp} className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
            <m.p variants={fadeUp} className="text-sm font-medium" style={{ color: "var(--fg)" }}>
              {t.sub_description}
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
