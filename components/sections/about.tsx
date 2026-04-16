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
  "/images/projects/cluster-fontana.webp",
  "/images/projects/cluster-innari.webp",
  "/images/projects/matano-boulevard.webp",
  "/images/projects/new-abaya-village.webp",
  "/images/projects/new-maninjau.webp",
  "/images/projects/matano-boulevard-2.webp",
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

        {/* Mobile: horizontal marquee photo strip */}
        <div className="lg:hidden overflow-hidden">
          <div className="flex animate-marquee">
            {[...photos, ...photos].map((src, i) => (
              <div key={i} className="relative aspect-[3/2] shrink-0 w-[50vw] sm:w-[33vw]">
                <Image src={src} alt="" fill loading="lazy" className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: flex row — content left, vertical photos right */}
        <div className="hidden lg:flex max-h-[700px] max-w-[1400px] mx-auto">
          <div className="flex-1 px-6 py-20 lg:py-28">
            <m.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] mb-10 opacity-40">
                  {t.label}
                </m.p>
                <m.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] max-w-4xl mb-14">
                  {t.title}
                </m.h2>
                <m.div variants={fadeUp} className="flex flex-wrap gap-x-12 gap-y-6">
                  {stats.map((st) => (
                    <div key={st.label}>
                      <p className="text-4xl md:text-5xl font-bold leading-none mb-1">
                        <Counter target={st.value} />
                      </p>
                      <p className="text-xs uppercase tracking-wider opacity-40">{st.unit} {st.label}</p>
                    </div>
                  ))}
                </m.div>
              </m.div>
          </div>

          {/* Right photos — staggered 2-col brick layout, vertical auto-scroll */}
          <div className="w-[40%] shrink-0 overflow-hidden self-stretch flex gap-2 p-2">
            <div className="w-1/2 overflow-hidden">
              <div className="flex flex-col gap-2 animate-marquee-vertical">
                {[...photos.slice(0, 3), ...photos.slice(0, 3)].map((src, i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden shrink-0 ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                    <Image src={src} alt="" fill loading="lazy" className="object-cover" sizes="20vw" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 overflow-hidden pt-16">
              <div className="flex flex-col gap-2 animate-marquee-vertical">
                {[...photos.slice(3, 6), ...photos.slice(3, 6)].map((src, i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden shrink-0 ${i % 2 === 0 ? "aspect-square" : "aspect-[3/4]"}`}>
                    <Image src={src} alt="" fill loading="lazy" className="object-cover" sizes="20vw" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: description + quote below the hero row */}
        <div className="hidden lg:block max-w-[1400px] mx-auto px-6 pb-28">
          <div className="w-[60%]">
            <div className="h-px mb-16" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent 80%)" }} />
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-12"
            >
              <m.p variants={fadeUp} className="text-base leading-[1.9] opacity-60">
                {t.description}
              </m.p>
              <m.div variants={fadeUp}>
                <div className="relative pl-6" style={{ borderLeft: "2px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-lg font-medium leading-relaxed opacity-90">
                    {t.sub_description}
                  </p>
                </div>
              </m.div>
            </m.div>
          </div>
        </div>

        {/* Mobile: content below horizontal strip */}
        <div className="lg:hidden max-w-[1400px] mx-auto px-6 py-20">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] mb-10 opacity-40">
              {t.label}
            </m.p>
            <m.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold leading-[1.08] max-w-4xl mb-14">
              {t.title}
            </m.h2>
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
            <div className="flex flex-col gap-12">
              <m.p variants={fadeUp} className="text-sm sm:text-base leading-[1.9] opacity-60">
                {t.description}
              </m.p>
              <m.div variants={fadeUp}>
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
