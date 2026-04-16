"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { m, LazyMotion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import type { Dictionary, Locale } from "@/app/[locale]/dictionaries";

const loadFeatures = () => import("@/lib/framer-features").then((r) => r.default);
const navLinks = [
  { key: "home", href: "#hero" },
  { key: "testimonials", href: "#testimonials" },
  { key: "projects", href: "#products" },
  { key: "location", href: "#explore" },
  { key: "about", href: "#about" },
  { key: "reviews", href: "#reviews" },
  { key: "contact", href: "#cta" },
] as const;

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeKey = navLinks.find((l) => l.href === `#${active}`)?.key ?? "home";

  return (
    <LazyMotion features={loadFeatures} strict>
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 pt-4 flex items-center justify-between">
          <Link href={`/${locale}`} className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${scrolled ? "bg-[var(--muted)]" : "bg-white/15"}`}>
            <Image src={scrolled ? "/images/logo-black.png" : "/images/logo-white.png"} alt="Kultura Properties" width={28} height={28} className="dark:hidden" />
            <Image src="/images/logo-white.png" alt="Kultura Properties" width={28} height={28} className="hidden dark:block" />
          </Link>

          <nav
            className={`hidden lg:flex items-center gap-0.5 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "bg-[var(--card)]/80 border-[var(--border)] shadow-sm"
                : "bg-white/10 border-white/15"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = link.key === activeKey;
              return (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-5 py-1.5 rounded-full text-sm transition-colors duration-300"
                  style={{
                    color: isActive
                      ? scrolled ? "var(--bg)" : "#0a0a0a"
                      : scrolled ? "var(--muted-fg)" : "rgba(255,255,255,0.7)",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: scrolled ? "var(--fg)" : "white" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{dict.nav[link.key as keyof typeof dict.nav]}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />
            <Link
              href={`/${locale === "en" ? "id" : "en"}`}
              className={`flex items-center justify-center w-11 h-11 rounded-full text-xs font-medium uppercase transition-colors duration-300 ${
                scrolled ? "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--fg)]" : "bg-white/15 text-white/70 hover:text-white"
              }`}
              aria-label={`Switch to ${locale === "en" ? "Indonesian" : "English"}`}
            >
              {locale === "en" ? "ID" : "EN"}
            </Link>
          </div>

          <button
            className={`lg:hidden relative z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-[var(--muted)] text-[var(--fg)]" : scrolled ? "bg-[var(--muted)] text-[var(--fg)]" : "bg-white/15 text-white"}`}
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
              <Link href={`/${locale}`} onClick={() => setOpen(false)} className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--muted)" }}>
                <Image src="/images/logo-black.png" alt="Kultura Properties" width={28} height={28} className="dark:hidden" />
                <Image src="/images/logo-white.png" alt="Kultura Properties" width={28} height={28} className="hidden dark:block" />
              </Link>
              <button className="p-2" style={{ color: "var(--fg)" }} onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <button
                    className="block w-full text-left py-4 text-3xl font-bold transition-colors border-b"
                    style={{
                      color: link.key === activeKey ? "var(--fg)" : "var(--muted-fg)",
                      borderColor: "var(--border)",
                    }}
                    onClick={() => { setOpen(false); setTimeout(() => scrollTo(link.href), 300); }}
                  >
                    {dict.nav[link.key as keyof typeof dict.nav]}
                  </button>
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
