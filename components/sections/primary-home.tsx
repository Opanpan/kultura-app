"use client";

import Image from "next/image";
import { useState } from "react";
import { m, LazyMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

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

export default function PrimaryHome({ dict }: { dict: Dictionary }) {
  const t = dict.primary;
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIdx((i) => (i + 1) % projects.length);

  const left = projects[idx];
  const center = projects[(idx + 1) % projects.length];
  const right = projects[(idx + 2) % projects.length];

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row justify-between gap-6 mb-10"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-[42px] max-w-md leading-[1.15]" style={{ color: "var(--fg)" }}>
              <span className="font-normal">{t.title}</span>{" "}
              <span className="font-bold">{t.title_bold}</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-sm lg:self-start leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.subtitle}
            </m.p>
          </m.div>

          {/* Carousel — 3 column layout */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr_0.6fr] gap-5 mb-4 items-start"
          >
            {/* Left — large image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={left.src}
                alt={left.label}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Left arrow on the image */}
              <button
                onClick={prev}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md"
                style={{ background: "var(--bg)", color: "var(--fg)" }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Center — image + card */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={center.src}
                  alt={center.label}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div>
                <p className="text-lg font-bold mb-1" style={{ color: "var(--fg)" }}>{t.price_label}</p>
                <p className="text-sm mb-4 line-clamp-1" style={{ color: "var(--muted-fg)" }}>{t.description}</p>
                <button
                  className="w-full py-2.5 rounded-full text-sm font-medium border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                >
                  {t.details_cta}
                </button>
              </div>
            </div>

            {/* Right — partially visible image + arrows */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={right.src}
                  alt={right.label}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
              {/* Nav arrows */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg)" }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg)" }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </m.div>

          {/* Mobile nav arrows */}
          <div className="flex gap-2 mb-6 lg:hidden">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom description */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <m.p variants={fadeUp} className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
            <m.p variants={fadeUp} className="text-sm font-medium" style={{ color: "var(--fg)" }}>
              {t.sub_description}
            </m.p>
          </m.div>

          {/* Nearby landmarks */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <m.h3 variants={fadeUp} className="text-xl md:text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
              {t.nearby ?? "Nearby Landmarks"}
            </m.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {nearby.map((n) => (
                <m.div key={n.label} variants={fadeUp} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <Image
                    src={n.src}
                    alt={n.label}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
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
