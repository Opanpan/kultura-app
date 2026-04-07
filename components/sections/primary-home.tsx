"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
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
            className="flex flex-col lg:flex-row justify-between gap-6 mb-8"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl max-w-md leading-tight" style={{ color: "var(--fg)" }}>
              <span className="font-normal">{t.title}</span>{" "}
              <span className="font-bold">{t.title_bold}</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-md lg:self-end leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.subtitle}
            </m.p>
          </m.div>

          {/* Project images */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
          >
            {projects.map((p) => (
              <m.div key={p.label} variants={fadeUp} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src={p.src}
                  alt={p.label}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs sm:text-sm font-medium">{p.label}</span>
              </m.div>
            ))}
          </m.div>

          {/* Description */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
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
