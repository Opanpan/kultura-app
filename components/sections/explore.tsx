"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

const landmarks = [
  { key: "1", image: "/images/nearby/stasiun-cisauk.webp" },
  { key: "2", image: "/images/nearby/gerbang-toll-serbaraja.webp" },
  { key: "3", image: "/images/nearby/aeon-mall-bsd.webp" },
  { key: "4", image: "/images/nearby/universitas-prasetya-mulya.webp" },
  { key: "5", image: "/images/nearby/ice-bsd.webp" },
] as const;

export default function Explore({ dict }: { dict: Dictionary }) {
  const t = dict.explore;

  const items = landmarks.map((l) => ({
    ...l,
    name: t[`landmark_${l.key}` as keyof typeof t],
    distance: t[`landmark_${l.key}_distance` as keyof typeof t],
    time: t[`landmark_${l.key}_time` as keyof typeof t],
  }));

  return (
    <LazyMotion features={loadFeatures} strict>
      <section id="explore" className="py-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Header */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl mb-16"
          >
            <m.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5" style={{ background: "var(--muted)", color: "var(--muted-fg)" }}>
              <Navigation className="w-3.5 h-3.5" />
              {t.radius}
            </m.div>
            <m.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.12] mb-4" style={{ color: "var(--fg)" }}>
              {t.title}
            </m.h2>
            <m.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              {t.description}
            </m.p>
          </m.div>

          {/* Map embed + landmarks */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-[55%] shrink-0"
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.6280742!3d-6.3536272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e36236a1832d:0xa636e9532b3f5430!2sKultura+Properties+(Marketing+Gallery+%2F+Office)!5e0!3m2!1sen!2sid!4v1"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kultura Properties Location"
                />
              </div>
            </m.div>

            {/* Landmark cards */}
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex-1 flex flex-col gap-3"
            >
              {items.map((l) => (
                <m.div
                  key={l.key}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-3 rounded-2xl transition-colors group"
                  style={{ background: "var(--muted)" }}
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={l.image} alt={l.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate" style={{ color: "var(--fg)" }}>{l.name}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <MapPin className="w-3 h-3" /> {l.distance}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <Clock className="w-3 h-3" /> {l.time}
                      </span>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>

          {/* Sub description */}
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm max-w-xl leading-relaxed mt-12"
            style={{ color: "var(--muted-fg)" }}
          >
            {t.sub_description}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
