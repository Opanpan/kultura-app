"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { m, LazyMotion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

function AnimatedNumber({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/\d/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
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

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const projects = [
  { src: "/images/projects/cluster-innari.webp", label: "Cluster Innari" },
  { src: "/images/projects/matano-boulevard.webp", label: "Matano Boulevard" },
  { src: "/images/projects/matano-boulevard-2.webp", label: "Matano Boulevard 2" },
  { src: "/images/projects/matano-boulevard-3.webp", label: "Matano Boulevard 3" },
  { src: "/images/projects/new-abaya-village.webp", label: "New Abaya Village" },
  { src: "/images/projects/new-maninjau.webp", label: "New Maninjau" },
  { src: "/images/projects/cluster-fontana.webp", label: "Cluster Fontana" },
];

const nearby = [
  { src: "/images/nearby/aeon-mall-bsd.webp", label: "Aeon Mall BSD" },
  { src: "/images/nearby/ice-bsd.webp", label: "ICE BSD" },
  { src: "/images/nearby/gerbang-toll-serbaraja.webp", label: "Gerbang Toll Serbaraja" },
  { src: "/images/nearby/stasiun-cisauk.webp", label: "Stasiun Cisauk" },
  { src: "/images/nearby/universitas-multimedia-nusantara.webp", label: "Universitas Multimedia Nusantara" },
];

function getSlides(idx: number) {
  const len = projects.length;
  return {
    left: projects[idx % len],
    center: projects[(idx + 1) % len],
    right: projects[(idx + 2) % len],
  };
}

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;
  const [rightIdx, setRightIdx] = useState(0);
  const carouselImages = projects.slice(2); // exclude col 1 & 2
  const prev = useCallback(() => setRightIdx((i) => (i - 1 + carouselImages.length) % carouselImages.length), [carouselImages.length]);
  const next = useCallback(() => setRightIdx((i) => (i + 1) % carouselImages.length), [carouselImages.length]);
  const left = projects[0];
  const center = projects[1];
  const right = carouselImages[rightIdx];

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header: title left, subtitle right-aligned top */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] max-w-md leading-[1.15]" style={{ color: "var(--fg)" }}>
              <span className="font-normal">{t.title}</span>{" "}
              <span className="font-bold">{t.title_bold}</span>
            </h2>
            <p className="text-sm max-w-sm lg:self-start leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.subtitle}
            </p>
          </div>

          {/* Carousel */}
          <div className="flex flex-col lg:flex-row gap-5 mb-16">
            {/* Col 1 — tall image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden lg:w-[42%] shrink-0">
              <Image src={left.src} alt={left.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
            </div>

            {/* Right side — col 2 + col 3 + description stacked */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Row: center image+card & right image */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Center — image + price card */}
                <div className="flex flex-col gap-4 sm:w-3/5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src={center.src} alt={center.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1" style={{ color: "var(--fg)" }}>{t.price_label}</p>
                    <p className="text-sm mb-4 line-clamp-1" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
                    <button className="w-full py-2.5 rounded-full text-sm font-medium border transition-colors min-h-[44px]" style={{ borderColor: "var(--border)", color: "var(--fg)" }} aria-label={t.details_cta}>
                      {t.details_cta}
                    </button>
                  </div>
                </div>

                {/* Right — image with arrows + animation */}
                <div className="relative sm:w-2/5">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <m.div
                        key={right.src}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0"
                      >
                        <Image src={right.src} alt={right.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 20vw" />
                      </m.div>
                    </AnimatePresence>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={prev} className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg)" }} aria-label="Previous">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg)" }} aria-label="Next">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description — below col 2+3, beside col 1 */}
              <div className="max-w-lg">
                <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
                <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{t.sub_description}</p>
              </div>
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="flex gap-2 mb-6 lg:hidden">
            <button onClick={prev} className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--fg)" }} aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--fg)" }} aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16 pb-16"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {[
              { label: dict.stats.rent, value: dict.stats.rent_count },
              { label: dict.stats.buy, value: dict.stats.buy_count },
              { label: dict.stats.cities, value: dict.stats.cities_count },
            ].filter((i) => i.value).map((item) => (
              <m.div key={item.label} variants={fadeUp}>
                <p className="text-xs mb-2 tracking-wide" style={{ color: "var(--muted-fg)" }}>{item.label}</p>
                <p className="text-4xl md:text-5xl font-bold" style={{ color: "var(--fg)" }}>
                  <AnimatedNumber target={item.value} />
                </p>
              </m.div>
            ))}
          </m.div>

          {/* Nearby landmarks */}
          <m.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <m.h3 variants={fadeUp} className="text-xl md:text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
              {t.nearby ?? "Nearby Landmarks"}
            </m.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {nearby.map((n) => (
                <m.div key={n.label} variants={fadeUp} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <Image src={n.src} alt={n.label} fill loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-[11px] sm:text-xs font-medium leading-tight">{n.label}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
