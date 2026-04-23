"use client";

import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

export default function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="relative min-h-screen overflow-hidden flex flex-col justify-center lg:justify-end pb-0 lg:pb-12" id="hero">
        <Image
          src="/images/hero-bg.webp"
          alt="Kultura Properties — Perumahan modern di Cisauk, Tangerang dekat Stasiun Cisauk dan BSD"
          fill
          priority
          fetchPriority="high"
          quality={75}
          className="object-cover"
          style={{ transform: "scale(1.17)" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        <div className="relative max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center lg:items-start">
          <m.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mb-8 text-center lg:text-left items-center lg:items-start flex flex-col"
          >
            <m.div variants={fadeUp} className="flex flex-wrap gap-2 mb-7">
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] text-white leading-[1.08] mb-4 sm:mb-5"
            >
              <span className="font-normal">{t.title_1}</span>
              <br />
              <span className="font-bold">{t.title_2}</span>
            </m.h1>

            <m.p variants={fadeUp} className="text-white/80 text-base leading-relaxed max-w-lg mb-3">
              {t.description}
            </m.p>

            <m.p variants={fadeUp} className="text-white/60 text-sm mb-6">
              {t.sub_description}
            </m.p>

            <m.a
              variants={fadeUp}
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
            </m.a>
          </m.div>
        </div>

        {/* Big logo */}
        <Image
          src="/images/logo-white.png"
          alt=""
          width={320}
          height={320}
          className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 w-36 h-36 sm:w-48 sm:h-48 lg:w-80 lg:h-80 select-none pointer-events-none"
          aria-hidden="true"
        />
      </section>
    </LazyMotion>
  );
}
