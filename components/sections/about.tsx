"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { m, LazyMotion, useInView } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

function Counter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/\d/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const photos = [
  "/images/projects/cluster-innari.webp",
  "/images/projects/matano-boulevard.webp",
  "/images/projects/new-abaya-village.webp",
  "/images/projects/cluster-fontana.webp",
];

export default function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;
  const s = dict.primary;

  const stats = [
    { value: s.stat_1_value, unit: s.stat_1_unit, label: s.stat_1_label },
    { value: s.stat_2_value, unit: s.stat_2_unit, label: s.stat_2_label },
    { value: s.stat_3_value, unit: s.stat_3_unit, label: s.stat_3_label },
  ];

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="relative overflow-hidden" id="about" style={{ background: "var(--fg)", color: "var(--bg)" }}>

        {/* Photo mosaic strip */}
        {/* Scrolling photo strip */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {[...photos, ...photos].map((src, i) => (
              <div key={i} className="relative aspect-[3/2] shrink-0 w-[50vw] sm:w-[33vw] lg:w-[25vw]">
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Label */}
            <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] mb-10 opacity-40">
              {t.label}
            </m.p>

            {/* Title */}
            <m.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] max-w-4xl mb-14">
              {t.title}
            </m.h2>

            {/* Stats row */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-x-12 gap-y-6 mb-16 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              {stats.map((st) => (
                <div key={st.label}>
                  <p className="text-4xl md:text-5xl font-bold leading-none mb-1">
                    <Counter target={st.value} />
                  </p>
                  <p className="text-xs uppercase tracking-wider opacity-40">{st.unit} {st.label}</p>
                </div>
              ))}
            </m.div>

            {/* Two-column text */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <m.p variants={fadeUp} className="text-sm sm:text-base leading-[1.9] opacity-60 lg:flex-1">
                {t.description}
              </m.p>

              <m.div variants={fadeUp} className="lg:max-w-md shrink-0">
                <div className="relative pl-6" style={{ borderLeft: "2px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-base sm:text-lg font-medium leading-relaxed opacity-90">
                    {t.sub_description}
                  </p>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
