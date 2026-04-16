"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

export default function BestValue({ dict }: { dict: Dictionary }) {
  const t = dict.bestValue;

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <m.div variants={fadeUp} className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--fg)" }}>
                {t.title}
              </h2>
              <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
              <button className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full transition-colors min-h-[44px]" style={{ background: "var(--fg)", color: "var(--bg)" }} aria-label={t.cta}>
                {t.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </m.div>
            <m.div variants={fadeUp} className="flex-1 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/best-value.jpg"
                  alt="Best value property"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24">
                <Image src="/images/map-pin.svg" alt="" width={96} height={96} aria-hidden="true" />
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
