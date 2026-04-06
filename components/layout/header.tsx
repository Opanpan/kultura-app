"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import type { Dictionary, Locale } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);
const navLinks = ["home", "about", "property", "service", "faq", "blog", "contact"] as const;

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 pt-4 flex items-center justify-between">
          <Link href={`/${locale}`} className={`text-sm whitespace-nowrap transition-colors duration-300 ${scrolled && !open ? "text-[var(--fg)]" : "text-white/80"}`}>
            Logo Here
          </Link>

          <nav
            className={`hidden lg:flex items-center gap-0.5 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "bg-[var(--card)]/80 border-[var(--border)] shadow-sm"
                : "bg-white/10 border-white/15"
            }`}
          >
            {navLinks.map((key) => (
              <Link
                key={key}
                href={`/${locale}`}
                className={`px-5 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  key === "home"
                    ? scrolled ? "bg-[var(--fg)] text-[var(--bg)] font-medium" : "bg-white text-neutral-900 font-medium"
                    : scrolled ? "text-[var(--muted-fg)] hover:text-[var(--fg)]" : "text-white/70 hover:text-white"
                }`}
              >
                {dict.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />
            <Link
              href={`/${locale === "en" ? "id" : "en"}`}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium uppercase transition-colors duration-300 ${
                scrolled ? "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--fg)]" : "bg-white/15 text-white/70 hover:text-white"
              }`}
              aria-label="Switch language"
            >
              {locale === "en" ? "ID" : "EN"}
            </Link>
          </div>

          <button
            className={`lg:hidden relative z-[60] p-2 transition-colors duration-300 ${open ? "text-[var(--fg)]" : scrolled ? "text-[var(--fg)]" : "text-white"}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex items-center justify-between px-6 pt-4">
              <Link href={`/${locale}`} className="text-sm" style={{ color: "var(--fg)" }} onClick={() => setOpen(false)}>
                Logo Here
              </Link>
              <button className="p-2" style={{ color: "var(--fg)" }} onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((key, i) => (
                <m.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`/${locale}`}
                    className="block py-4 text-3xl font-bold transition-colors border-b"
                    style={{
                      color: key === "home" ? "var(--fg)" : "var(--muted-fg)",
                      borderColor: "var(--border)",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {dict.nav[key]}
                  </Link>
                </m.div>
              ))}
            </nav>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="px-8 pb-10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ThemeToggle scrolled={true} />
                <Link
                  href={`/${locale === "en" ? "id" : "en"}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-xs font-medium uppercase"
                  style={{ background: "var(--muted)", color: "var(--muted-fg)" }}
                  onClick={() => setOpen(false)}
                >
                  {locale === "en" ? "ID" : "EN"}
                </Link>
              </div>
              <p className="text-xs" style={{ color: "var(--muted-fg)" }}>© Kultura</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
