"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { m, LazyMotion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipe } from "@/lib/utils";
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
  { key: "1", src: "/images/nearby/stasiun-cisauk.webp" },
  { key: "2", src: "/images/nearby/gerbang-toll-serbaraja.webp" },
  { key: "3", src: "/images/nearby/aeon-mall-bsd.webp" },
  { key: "4", src: "/images/nearby/universitas-multimedia-nusantara.webp" },
  { key: "5", src: "/images/nearby/ice-bsd.webp" },
];

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;
  const te = dict.explore;

  // Carousel for col 1 (house facades)
  const [facadeIdx, setFacadeIdx] = useState(0);
  const prevFacade = useCallback(() => setFacadeIdx((i) => (i - 1 + projects.length) % projects.length), []);
  const nextFacade = useCallback(() => setFacadeIdx((i) => (i + 1) % projects.length), []);
  const facadeSwipe = useSwipe(nextFacade, prevFacade);

  // Carousel for col 2 (nearby locations)
  const [nearbyIdx, setNearbyIdx] = useState(0);
  const prevNearby = useCallback(() => setNearbyIdx((i) => (i - 1 + nearby.length) % nearby.length), []);
  const nextNearby = useCallback(() => setNearbyIdx((i) => (i + 1) % nearby.length), []);
  const nearbySwipe = useSwipe(nextNearby, prevNearby);

  const nearbyItems = nearby.map((n) => ({
    ...n,
    name: te[`landmark_${n.key}` as keyof typeof te],
    distance: te[`landmark_${n.key}_distance` as keyof typeof te],
    time: te[`landmark_${n.key}_time` as keyof typeof te],
  }));

  const currentNearby = nearbyItems[nearbyIdx];
  const currentFacade = projects[facadeIdx];

  // Static mezzanine — use a fixed project image
  const mezzanineImg = projects[1];

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-[1.15]" style={{ color: "var(--fg)" }}>
              <span className="md:block md:whitespace-nowrap font-normal">{t.title}</span>{" "}
              <span className="md:block md:whitespace-nowrap font-bold">{t.title_bold}</span>
            </h2>
            <p className="text-sm max-w-sm lg:self-start leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.subtitle}
            </p>
          </div>

          {/* 3-Column Section */}
          <div className="flex flex-col lg:flex-row gap-5 mb-16">
            {/* Col 1 — Facade carousel (tall) */}
            <div className="relative lg:w-[35%] shrink-0">
              <div className="swipe-target relative aspect-[3/4] rounded-2xl overflow-hidden" {...facadeSwipe}>
                <AnimatePresence mode="popLayout">
                  <m.div
                    key={currentFacade.src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={currentFacade.src} alt={currentFacade.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 35vw" />
                  </m.div>
                </AnimatePresence>
                {/* Label overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{currentFacade.label}</span>
              </div>
              {/* Arrows */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={prevFacade} className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50 transition-colors" style={{ color: "var(--fg)" }} aria-label="Previous facade">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextFacade} className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50 transition-colors" style={{ color: "var(--fg)" }} aria-label="Next facade">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Col 2 — Nearby carousel (top 50%) + Stats (bottom 50%) */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Nearby locations carousel */}
              <div className="swipe-target relative flex-1 min-h-0 rounded-2xl overflow-hidden" {...nearbySwipe}>
                <AnimatePresence mode="popLayout">
                  <m.div
                    key={currentNearby.src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={currentNearby.src} alt={currentNearby.name} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                  </m.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{currentNearby.name}</span>
                {/* Arrows */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={prevNearby} className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50 transition-colors" style={{ color: "var(--fg)" }} aria-label="Previous nearby">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextNearby} className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50 transition-colors" style={{ color: "var(--fg)" }} aria-label="Next nearby">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-2xl p-6 flex flex-col justify-center gap-4" style={{ background: "var(--muted)" }}>
                {[
                  { value: t.stat_1_value, unit: t.stat_1_unit, label: t.stat_1_label },
                  { value: t.stat_2_value, unit: t.stat_2_unit, label: t.stat_2_label },
                  { value: t.stat_3_value, unit: t.stat_3_unit, label: t.stat_3_label },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: "var(--fg)" }}>
                      <AnimatedNumber target={item.value} />
                    </p>
                    <p className="text-xs tracking-wide" style={{ color: "var(--muted-fg)" }}>
                      {item.unit} {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3 — Static mezzanine image */}
            <div className="relative lg:w-[28%] shrink-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden h-full">
                <Image src={mezzanineImg.src} alt={mezzanineImg.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 28vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{mezzanineImg.label}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-lg mb-16">
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
            <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{t.sub_description}</p>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
