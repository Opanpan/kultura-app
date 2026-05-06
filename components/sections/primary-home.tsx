"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { m, LazyMotion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2, BarChart3, Award } from "lucide-react";
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
  { src: "/images/projects/matano-boulevard.webp", label: "Matano Boulevard" },
  { src: "/images/projects/cluster-innari.webp", label: "Cluster Innari" },
  { src: "/images/projects/new-abaya-village.webp", label: "New Abaya Village" },
];

const nearby = [
  { key: "1", src: "/images/nearby/stasiun-cisauk.webp", categoryKey: "landmark_category_1" },
  { key: "2", src: "/images/nearby/gerbang-toll-serbaraja.webp", categoryKey: "landmark_category_1" },
  { key: "3", src: "/images/nearby/aeon-mall-bsd.webp", categoryKey: "landmark_category_2" },
  { key: "4", src: "/images/nearby/universitas-prasetya-mulya.webp", categoryKey: "landmark_category_3" },
  { key: "5", src: "/images/nearby/ice-bsd.webp", categoryKey: "landmark_category_2" },
];

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;
  const te = dict.explore;

  const [facadeIdx, setFacadeIdx] = useState(0);
  const prevFacade = useCallback(() => setFacadeIdx((i) => (i - 1 + projects.length) % projects.length), []);
  const nextFacade = useCallback(() => setFacadeIdx((i) => (i + 1) % projects.length), []);
  const facadeSwipe = useSwipe(nextFacade, prevFacade);

  const [nearbyIdx, setNearbyIdx] = useState(0);
  const prevNearby = useCallback(() => setNearbyIdx((i) => (i - 1 + nearby.length) % nearby.length), []);
  const nextNearby = useCallback(() => setNearbyIdx((i) => (i + 1) % nearby.length), []);
  const nearbySwipe = useSwipe(nextNearby, prevNearby);

  const nearbyItems = nearby.map((n) => ({
    ...n,
    name: te[`landmark_${n.key}` as keyof typeof te],
    distance: te[`landmark_${n.key}_distance` as keyof typeof te],
    time: te[`landmark_${n.key}_time` as keyof typeof te],
    category: te[n.categoryKey as keyof typeof te],
  }));

  const currentNearby = nearbyItems[nearbyIdx];
  const currentFacade = projects[facadeIdx];

  const stats = [
    { icon: Building2, value: t.stat_1_value, label: t.stat_1_label },
    { icon: BarChart3, value: t.stat_2_value, label: t.stat_2_label },
    { icon: Award, value: t.stat_3_value, label: t.stat_3_label },
  ];

  const promos = [
    { badge: t.promo_1_badge, label: t.promo_1_label },
    { badge: t.promo_2_badge, label: t.promo_2_label },
    { badge: t.promo_3_badge, label: t.promo_3_label },
  ];

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Header */}
          <p className="text-sm italic mb-3" style={{ color: "var(--muted-fg)" }}>{t.section_label}</p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-[1.15] mb-10 font-semibold" style={{ color: "var(--fg)" }}>
            <span className="block">{t.title}</span>
            <span className="block" style={{ color: "var(--muted-fg)" }}>{t.title_highlight}</span>
          </h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr_0.85fr] gap-4" style={{ minHeight: "620px" }}>
            {/* Col 1 — Facade carousel (spans 2 rows) */}
            <div className="relative lg:row-span-2">
              <div className="swipe-target relative aspect-[3/4] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden" {...facadeSwipe}>
                <AnimatePresence mode="popLayout">
                  <m.div
                    key={currentFacade.src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={currentFacade.src} alt={currentFacade.label} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  </m.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Badge */}
                <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(0,0,0,0.4)" }}>{t.badge_design}</span>
                {/* Arrows */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button onClick={prevFacade} className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50" style={{ color: "var(--fg)" }} aria-label="Previous">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextFacade} className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50" style={{ color: "var(--fg)" }} aria-label="Next">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Label */}
                <p className="absolute bottom-5 left-5 z-10 text-white text-xl font-semibold">{currentFacade.label}</p>
              </div>
            </div>

            {/* Col 2 top — Nearby carousel */}
            <div className="swipe-target relative rounded-2xl overflow-hidden min-h-[300px]" {...nearbySwipe}>
              <AnimatePresence mode="popLayout">
                <m.div
                  key={currentNearby.src}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={currentNearby.src} alt={currentNearby.name} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                </m.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Badge */}
              <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md whitespace-nowrap" style={{ background: "rgba(0,0,0,0.4)" }}>{t.badge_location}</span>
              {/* Arrows */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button onClick={prevNearby} className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50" style={{ color: "var(--fg)" }} aria-label="Previous nearby">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextNearby} className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 dark:bg-black/50" style={{ color: "var(--fg)" }} aria-label="Next nearby">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {/* Info */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">{currentNearby.name}</p>
                  <p className="text-white/70 text-xs sm:text-sm">{currentNearby.distance} - {currentNearby.time}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md self-start sm:self-auto shrink-0" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  📍 {currentNearby.category}
                </span>
              </div>
            </div>

            {/* Col 3 — Payment card (spans 2 rows) */}
            <div className="rounded-2xl p-7 flex flex-col lg:row-span-2" style={{ background: "var(--muted)" }}>
              <h3 className="text-2xl font-normal leading-tight" style={{ color: "var(--fg)" }}>{t.payment_title}</h3>
              <p className="text-2xl font-bold italic leading-tight" style={{ color: "var(--fg)" }}>{t.payment_title_bold}</p>
              <div className="w-12 h-[2px] mt-5 mb-6" style={{ background: "var(--fg)" }} />
              <div className="flex flex-col gap-4 flex-1 justify-center">
                {promos.map((item) => (
                  <div key={item.badge} className="flex items-center gap-5 rounded-2xl p-3" style={{ border: "1px solid var(--border, rgba(0,0,0,0.08))" }}>
                    <div className="shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "var(--bg)" }}>
                      <span className="text-3xl font-extrabold" style={{ color: "var(--fg)" }}>{item.badge}</span>
                    </div>
                    <p className="text-base font-semibold leading-tight whitespace-pre-line" style={{ color: "var(--fg)" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2 bottom — Stats */}
            <div className="rounded-2xl p-7" style={{ background: "var(--muted)", borderTop: "2px solid var(--border, rgba(0,0,0,0.06))" }}>
              <h3 className="text-xl font-bold mb-5" style={{ color: "var(--fg)" }}>{t.stat_title}</h3>
              <div className="flex flex-col gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--bg)" }}>
                      <item.icon className="w-5 h-5" style={{ color: "var(--fg)" }} />
                    </div>
                    <p className="text-2xl font-bold min-w-[80px]" style={{ color: "var(--fg)" }}>
                      <AnimatedNumber target={item.value} />
                    </p>
                    <p className="text-sm" style={{ color: "var(--muted-fg)" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
