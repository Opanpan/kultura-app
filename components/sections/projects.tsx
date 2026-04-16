"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const projects = [
  { src: "/images/projects/cluster-fontana-new.webp", name: "Cluster Fontana", price: "Rp 500Jt-an", tag: "Cluster" },
  { src: "/images/projects/innari-2lt.webp", name: "Innari 2 Lantai", price: "Rp 650Jt-an", tag: "Cluster" },
  { src: "/images/projects/innari-1lt.webp", name: "Innari 1 Lantai", price: "Rp 650Jt-an", tag: "Cluster" },
  { src: "/images/projects/cluster-new-maninjau.webp", name: "Cluster New Maninjau", price: "Rp 800Jt-an", tag: "Cluster" },
  { src: "/images/projects/matano-boulevard-new.webp", name: "Matano Boulevard", price: "Rp 800Jt-an", tag: "Boulevard" },
  { src: "/images/projects/new-abaya-village-new.webp", name: "New Abaya Village", price: "Rp 900Jt-an", tag: "Village" },
];

export default function Projects({ dict }: { dict: Dictionary }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="py-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Header */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12"
          >
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
              <span className="md:block md:whitespace-nowrap">{dict.primary.title}</span>{" "}
              <span className="md:block md:whitespace-nowrap" style={{ color: "var(--muted-fg)", fontWeight: 400 }}>{dict.primary.title_bold}</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-sm max-w-xs leading-relaxed md:text-right" style={{ color: "var(--muted-fg)" }}>
              {dict.primary.subtitle}
            </m.p>
          </m.div>

          {/* Grid */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((p, i) => (
              <m.div
                key={p.name}
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: i === 0 || i === 4 ? "3/4" : "4/3" }}
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                    {p.tag}
                  </span>
                </div>

                {/* Arrow button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" style={{ background: "rgba(255,255,255,0.9)" }}>
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold text-lg leading-tight">{p.name}</p>
                  <p className="text-white/60 text-sm mt-1">Mulai dari {p.price}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
