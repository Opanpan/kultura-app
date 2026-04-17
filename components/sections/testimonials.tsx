"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useSwipe } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const photos = [
  "/images/testimonials/willy.webp",
  "/images/testimonials/gilang.webp",
  "/images/testimonials/widia.webp",
];

const videos = [
  "/videos/testimoni-rifqi.mp4",
  "/videos/testimoni-emir.mp4",
  "/videos/testimoni-gilang.mp4",
];

/* ── Fullscreen video modal ─────────────────────────────────────────────── */
function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    ref.current?.play();
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video ref={ref} src={src} className="w-full h-full object-cover" controls playsInline autoPlay />
      </m.div>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white" aria-label="Close">✕</button>
    </m.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;

  const items = [
    { image: photos[0], quote: t.quote_1, name: t.name_1 },
    { image: photos[1], quote: t.quote_2, name: t.name_2 },
    { image: photos[2], quote: t.quote_3, name: t.name_3 },
  ];
  const videoItems = [
    { src: videos[0], name: t.video_name_1, project: t.project_1 },
    { src: videos[1], name: t.video_name_2, project: t.project_2 },
    { src: videos[2], name: t.video_name_3, project: t.project_3 },
  ];

  const [idx, setIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const prev = useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const current = items[idx];
  const swipe = useSwipe(next, prev);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <section id="testimonials" className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* ── Outer card ── */}
            <m.div variants={fadeUp} className="relative rounded-[28px] overflow-hidden" style={{ background: "var(--card, var(--muted))" }}>

              {/* ══════════════════════════════════════════════════════════
                  DESKTOP LAYOUT (lg+)
                  Image on right ~60%, content on left ~40%, overlapping thumbnails
                  ══════════════════════════════════════════════════════════ */}

              {/* Background image — right 62% on desktop, full on mobile */}
              <div className="relative min-h-[500px] lg:min-h-[680px]" {...swipe}>

                {/* The photo — on desktop it's clipped to right side */}
                <div className="absolute inset-0 lg:left-[35%] rounded-[20px] lg:rounded-l-[28px] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <m.div
                      key={current.image}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Image src={current.image} alt={current.name} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
                    </m.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent lg:from-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Vertical "TESTIMONI" label on left edge of image */}
                  <div className="hidden lg:flex absolute top-0 left-0 bottom-0 w-10 items-center justify-center z-10 rounded-l-[28px]" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                      Testimoni
                    </span>
                  </div>

                  {/* Quote pills + navigation — bottom-right inside photo */}
                  <AnimatePresence mode="wait">
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-5 right-5 z-20 flex flex-col items-end gap-3 max-w-xs"
                    >
                      <div className="flex flex-wrap gap-2 justify-end">
                        <div className="px-4 py-2.5 rounded-full text-white text-xs font-medium" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                          {current.name}
                        </div>
                        <div className="px-4 py-2.5 rounded-full text-white text-xs font-medium max-w-[220px] truncate" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                          &ldquo;{current.quote}&rdquo;
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-white">
                          <span className="text-base font-bold">{idx + 1}</span>
                          <span className="text-white/50">/{items.length}</span>
                        </span>
                        <div className="flex gap-2">
                          <button onClick={prev} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white hover:bg-white/20" style={{ border: "1px solid rgba(255,255,255,0.3)" }} aria-label="Previous">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button onClick={next} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white hover:bg-white/20" style={{ border: "1px solid rgba(255,255,255,0.3)" }} aria-label="Next">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>

                {/* ── Content layer (on top of everything) ── */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[500px] lg:min-h-[680px] p-6 md:p-8 pointer-events-none">

                  {/* Top row */}
                  <div className="flex justify-between items-start pointer-events-auto">
                    {/* Title — visible on muted bg on desktop, on image on mobile */}
                    <div className="max-w-xs lg:max-w-sm">
                      <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold leading-[1.08] mb-3 text-white lg:text-[var(--fg)]">
                        {t.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-white/70 lg:text-[var(--muted-fg)]">
                        {t.description}
                      </p>
                      <p className="text-[11px] uppercase tracking-wider leading-relaxed max-w-[200px] mt-3 text-white/50 lg:text-[var(--muted-fg)]">
                        {t.sub_description}
                      </p>
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href="https://wa.me/6281112004007?text=%5BKPWA%20WEB%5D%20Hi%20Kultura%E2%9C%A8%2C%20Saya%20mau%20informasi%20tentang%20rumah%20%E2%80%A6%20%2C%20Nama%20saya%20%E2%80%A6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full shrink-0 transition-colors"
                      style={{ background: "var(--fg)", color: "var(--bg)" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t.whatsapp_cta}
                    </a>
                  </div>

                  {/* Bottom row */}
                  <div className="flex flex-col sm:flex-row items-end justify-between gap-6">

                    {/* Left bottom: thumbnails + counter/arrows — overlaps image on desktop, hidden on mobile */}
                    <div className="hidden lg:block lg:translate-x-[60%] lg:-translate-y-[40%] relative z-20 pointer-events-auto">

                      {/* Thumbnails — white card like reference */}
                      <div className="inline-flex gap-3 p-3 rounded-2xl" style={{ background: "var(--card, rgba(255,255,255,0.92))", backdropFilter: "blur(16px)" }}>
                        {videoItems.map((v, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveVideo(v.src)}
                            className="group flex flex-col items-center gap-1.5 cursor-pointer"
                          >
                            <div className="relative w-[110px] aspect-square rounded-xl overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px var(--border, rgba(0,0,0,0.05))" }}>
                              <video src={v.src} className="w-full h-full object-cover" playsInline preload="metadata" muted />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/80 flex items-center justify-center transition-opacity">
                                <Play className="w-2.5 h-2.5 text-neutral-800 fill-neutral-800 ml-px" />
                              </div>
                            </div>
                            <span className="text-[11px] font-medium" style={{ color: "var(--muted-fg)" }}>{v.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </m.div>

            {/* ── Mobile: video thumbnails below card ── */}
            <div className="lg:hidden mt-5">
              <div className="flex gap-3 p-3 rounded-2xl shadow-sm" style={{ background: "var(--card, white)" }}>
                {videoItems.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVideo(v.src)}
                    className="group flex flex-col items-center gap-1.5 cursor-pointer flex-1"
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px var(--border, rgba(0,0,0,0.05))" }}>
                      <video src={v.src} className="w-full h-full object-cover" playsInline preload="metadata" muted />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/80 flex items-center justify-center transition-opacity">
                        <Play className="w-2.5 h-2.5 text-neutral-800 fill-neutral-800 ml-px" />
                      </div>
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: "var(--muted-fg)" }}>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </m.div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </LazyMotion>
  );
}
