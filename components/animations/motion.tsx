"use client";

import { m, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/animations";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);

export function FadeUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
