"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp, stagger } from "@/lib/animations";
import type { Dictionary } from "@/app/[locale]/dictionaries";

function AnimatedNumber({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/\d/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats({ dict }: { dict: Dictionary }) {
  const t = dict.stats;
  const items = [
    { label: t.rent, value: t.rent_count },
    { label: t.buy, value: t.buy_count },
    { label: t.cities, value: t.cities_count },
  ].filter((i) => i.value);

  return (
    <section className="py-16" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
      >
        {items.map((item) => (
          <motion.div key={item.label} variants={fadeUp}>
            <p className="text-xs mb-2 tracking-wide" style={{ color: "var(--muted-fg)" }}>{item.label}</p>
            <p className="text-4xl md:text-5xl font-bold" style={{ color: "var(--fg)" }}>
              <AnimatedNumber target={item.value} />
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
