"use client";

import Image from "next/image";
import { useState } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const products = [
  {
    id: "fontana",
    name: "Cluster Fontana",
    price: "Rp 500Jt-an",
    tag: "Cluster",
    images: [
      "/images/products/fontana/fasad.webp",
      "/images/products/fontana/bev.webp",
      "/images/products/fontana/fasilitas.webp",
      "/images/products/fontana/living-room.webp",
      "/images/products/fontana/taman.webp",
      "/images/products/fontana/layout.webp",
    ],
  },
  {
    id: "innari-2lt",
    name: "Innari 2 Lantai",
    price: "Rp 650Jt-an",
    tag: "Cluster",
    images: Array.from({ length: 14 }, (_, i) => `/images/products/innari-2lt/${i + 1}.webp`),
  },
  {
    id: "innari-1lt",
    name: "Innari 1 Lantai",
    price: "Rp 650Jt-an",
    tag: "Cluster",
    images: Array.from({ length: 15 }, (_, i) => `/images/products/innari-1lt/${i + 1}.webp`),
  },
  {
    id: "maninjau",
    name: "Cluster New Maninjau",
    price: "Rp 800Jt-an",
    tag: "Cluster",
    images: ["/images/products/maninjau/new-maninjau.jpg"],
  },
  {
    id: "matano",
    name: "Matano Boulevard",
    price: "Rp 800Jt-an",
    tag: "Boulevard",
    images: Array.from({ length: 11 }, (_, i) => `/images/products/matano/${i + 1}.webp`),
  },
  {
    id: "abaya",
    name: "New Abaya Village",
    price: "Rp 900Jt-an",
    tag: "Village",
    images: Array.from({ length: 12 }, (_, i) => `/images/products/abaya/${i + 1}.webp`),
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ product, startIdx, onClose }: {
  product: typeof products[0];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + product.images.length) % product.images.length);
  const next = () => setIdx((i) => (i + 1) % product.images.length);

  return (
    <m.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
          <X className="w-4 h-4 text-white" />
        </button>

        <m.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image src={product.images[idx]} alt={product.name} fill className="object-cover" sizes="95vw" />
        </m.div>

        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-white font-semibold">{product.name}</p>
          <p className="text-white/40 text-sm font-mono">{idx + 1} / {product.images.length}</p>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
          {product.images.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className="relative shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all"
              style={{ opacity: i === idx ? 1 : 0.35, outline: i === idx ? "2px solid white" : "none", outlineOffset: 2 }}>
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>

        <button onClick={prev} className="absolute left-0 top-[45%] -translate-x-14 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={next} className="absolute right-0 top-[45%] translate-x-14 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </m.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Products({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState(products[0]);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ product: typeof products[0]; idx: number } | null>(null);

  const selectProduct = (p: typeof products[0]) => {
    setActive(p);
    setImgIdx(0);
  };

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-24 overflow-hidden" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <m.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted-fg)" }}>
                Our Projects
              </m.p>
              <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
                Pilih hunian<br />yang cocok untuk Anda
              </m.h2>
            </div>
            <m.p variants={fadeUp} className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {products.length} proyek tersedia · Mulai dari Rp 500Jt
            </m.p>
          </m.div>

          {/* Main layout: featured left + list right */}
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ── Featured (left) ── */}
            <div className="w-full lg:w-[62%] shrink-0">
              {/* Big image */}
              <div className="relative rounded-3xl overflow-hidden cursor-zoom-in" style={{ aspectRatio: "4/3" }}
                onClick={() => setLightbox({ product: active, idx: imgIdx })}>
                <AnimatePresence mode="popLayout">
                  <m.div key={`${active.id}-${imgIdx}`}
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0">
                    <Image src={active.images[imgIdx]} alt={active.name} fill className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 62vw" priority />
                  </m.div>
                </AnimatePresence>

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-5 left-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    {active.tag}
                  </span>
                </div>

                {/* Expand hint */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <AnimatePresence mode="wait">
                      <m.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                        <p className="text-white font-bold text-2xl leading-tight">{active.name}</p>
                        <p className="text-white/60 text-sm mt-1">Mulai dari {active.price}</p>
                      </m.div>
                    </AnimatePresence>
                  </div>
                  <p className="text-white/40 text-xs font-mono">{imgIdx + 1}/{active.images.length}</p>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="mt-3 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}>
                <div className="flex gap-2.5 py-1 px-0.5" style={{ width: "max-content" }}>
                  {active.images.map((src, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        width: 72, height: 52,
                        opacity: i === imgIdx ? 1 : 0.45,
                        boxShadow: i === imgIdx ? "0 0 0 2px var(--fg)" : "none",
                      }}>
                      <Image src={src} alt="" fill className="object-cover" sizes="72px" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Product list (right) ── */}
            <div className="w-full lg:flex-1 flex flex-col gap-2">
              {products.map((p, i) => {
                const isActive = p.id === active.id;
                return (
                  <m.button
                    key={p.id}
                    onClick={() => selectProduct(p)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-200 w-full group"
                    style={{
                      background: isActive ? "var(--card)" : "transparent",
                      border: `1px solid ${isActive ? "var(--border)" : "transparent"}`,
                    }}
                  >
                    {/* Thumb */}
                    <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ width: 72, height: 56 }}>
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="72px" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted-fg)" }}>{p.tag}</p>
                      <p className="font-semibold text-sm leading-tight truncate" style={{ color: "var(--fg)" }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-fg)" }}>Mulai {p.price}</p>
                    </div>

                    {/* Arrow */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? "var(--fg)" : "transparent",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                      }}>
                      <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--bg)" }} />
                    </div>
                  </m.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox product={lightbox.product} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
