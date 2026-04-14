"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const images = [
  "/images/testimonials/willy.webp",
  "/images/testimonials/gilang.webp",
  "/images/testimonials/widia.webp",
];

const videos = [
  "/videos/testimoni-rifqi.mp4",
  "/videos/testimoni-emir.mp4",
  "/videos/testimoni-gilang.mp4",
];

// ── Video player sub-component ──────────────────────────────────────────────
function VideoPlayer({ src, name, project }: { src: string; name: string; project: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16] cursor-pointer group" onClick={toggle}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
        <div className="h-full bg-white transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
          {playing
            ? <Pause className="w-5 h-5 text-white fill-white" />
            : <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          }
        </div>
      </div>

      {/* Name tag */}
      <div className="absolute bottom-4 left-4">
        <p className="text-white font-semibold text-sm leading-tight">{name}</p>
        <p className="text-white/60 text-xs mt-0.5">{project}</p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;
  const items = [
    { image: images[0], quote: t.quote_1, name: t.name_1 },
    { image: images[1], quote: t.quote_2, name: t.name_2 },
    { image: images[2], quote: t.quote_3, name: t.name_3 },
  ];
  const videoItems = [
    { src: videos[0], name: t.name_1, project: t.project_1 },
    { src: videos[1], name: t.name_2, project: t.project_2 },
    { src: videos[2], name: t.name_3, project: t.project_3 },
  ];

  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const current = items[idx];

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <section id="testimonials" className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row justify-between gap-6 mb-12"
          >
            <div>
              <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold max-w-xs leading-tight mb-2" style={{ color: "var(--fg)" }}>
                {t.title}
              </m.h2>
              <m.p variants={fadeUp} className="text-sm max-w-md leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                {t.description}
              </m.p>
            </div>
            <m.p variants={fadeUp} className="text-sm max-w-md md:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.sub_description}
            </m.p>
          </m.div>

          {/* ── Original testimonial card (unchanged) ── */}
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden min-h-[400px]" style={{ background: "var(--card)" }}>
            {/* Image side */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <m.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={current.name} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </m.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />

              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <button onClick={prev} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95" aria-label="Previous testimonial">
                  <ChevronLeft className="w-4 h-4 text-neutral-900" />
                </button>
                <button onClick={next} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95" aria-label="Next testimonial">
                  <ChevronRight className="w-4 h-4 text-neutral-900" />
                </button>
              </div>
            </div>

            {/* Quote side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center" style={{ background: "var(--fg)", color: "var(--bg)" }}>
              <Quote className="w-10 h-10 mb-6 opacity-20" />

              <AnimatePresence mode="wait">
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="text-lg md:text-xl leading-relaxed font-medium mb-8">
                    &ldquo; {current.quote} &rdquo;
                  </p>
                  <p className="text-sm font-medium opacity-60">– {current.name}</p>
                </m.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-8">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === idx ? 24 : 8,
                      background: "var(--bg)",
                      opacity: i === idx ? 1 : 0.3,
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Video testimonials ── */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16"
          >
            <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--muted-fg)" }}>
              {t.video_label}
            </m.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {videoItems.map((v, i) => (
                <m.div key={i} variants={fadeUp}>
                  <VideoPlayer src={v.src} name={v.name} project={v.project} />
                </m.div>
              ))}
            </div>
          </m.div>

          {/* WhatsApp CTA */}
          <m.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 text-center">
            <a
              href="https://wa.me/6281112004007?text=%5BKPWA%20WEB%5D%20Hi%20Kultura%E2%9C%A8%2C%20Saya%20mau%20informasi%20tentang%20rumah%20%E2%80%A6%20%2C%20Nama%20saya%20%E2%80%A6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full transition-colors"
              style={{ background: "var(--fg)", color: "var(--bg)" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.whatsapp_cta}
            </a>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}
