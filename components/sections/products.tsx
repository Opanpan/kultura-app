"use client";

import Image from "next/image";
import { useState } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useSwipe } from "@/lib/utils";
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
    images: ["/images/products/innari-2lt/14.webp", ...Array.from({ length: 13 }, (_, i) => `/images/products/innari-2lt/${i + 1}.webp`)],
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
    images: ["/images/products/matano/11.webp", ...Array.from({ length: 10 }, (_, i) => `/images/products/matano/${i + 1}.webp`)],
  },
  {
    id: "abaya",
    name: "New Abaya Village",
    price: "Rp 900Jt-an",
    tag: "Village",
    images: ["/images/products/abaya/12.webp", ...Array.from({ length: 11 }, (_, i) => `/images/products/abaya/${i + 1}.webp`)],
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
        <button onClick={onClose} className="absolute -top-12 right-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }} aria-label="Close">
          <X className="w-4 h-4 text-white" aria-hidden="true" />
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

        <button onClick={prev} className="absolute left-0 top-[45%] -translate-x-14 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} aria-label="Previous image">
          <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
        </button>
        <button onClick={next} className="absolute right-0 top-[45%] translate-x-14 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} aria-label="Next image">
          <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
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

  const prevImg = () => setImgIdx((i) => (i - 1 + active.images.length) % active.images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % active.images.length);
  const swipe = useSwipe(nextImg, prevImg);

  return (
    <LazyMotion features={loadFeatures} strict>
      <section id="products" className="py-24" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <m.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <m.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted-fg)" }}>
                {dict.products.label}
              </m.p>
              <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
                {dict.products.title}
              </m.h2>
            </div>
            <m.p variants={fadeUp} className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {dict.products.subtitle}
            </m.p>
          </m.div>

          {/* Main layout: featured left + list right */}
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ── Featured (left) ── */}
            <div className="w-full lg:w-[62%] shrink-0">
              {/* Big image */}
              <div className="swipe-target relative rounded-3xl overflow-hidden cursor-zoom-in" style={{ aspectRatio: "4/3" }}
                onClick={() => setLightbox({ product: active, idx: imgIdx })} {...swipe}>
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
                <div className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                  aria-hidden="true">
                  <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <AnimatePresence mode="wait">
                      <m.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                        <p className="text-white font-bold text-2xl leading-tight">{active.name}</p>
                        <p className="text-white/60 text-sm mt-1">{dict.products.price_prefix} {active.price}</p>
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
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-fg)" }}>{dict.products.price_prefix} {p.price}</p>
                    </div>

                    {/* Arrow */}
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
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

          {/* WhatsApp CTA */}
          <div className="pt-14 text-center">
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
              {dict.products.whatsapp_cta}
            </a>
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
