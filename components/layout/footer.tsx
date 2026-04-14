import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/app/[locale]/dictionaries";

const footerNav = [
  { key: "home", href: "#hero" },
  { key: "testimonials", href: "#testimonials" },
  { key: "projects", href: "#products" },
  { key: "location", href: "#explore" },
  { key: "about", href: "#about" },
  { key: "reviews", href: "#reviews" },
  { key: "contact", href: "#cta" },
] as const;

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/kulturaproperties?igsh=ZWd1enc3dWtiaTdn&utm_source=qr", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "TikTok", href: "https://www.tiktok.com/@kulturaproperties?_r=1&_t=ZS-95UhPuevm7h", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" },
  { label: "YouTube", href: "https://youtube.com/@kulturaproperties?si=f5dVNSnMCCXYXNdH", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--fg)", color: "var(--bg)" }}>

      {/* ── Decorative pattern ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">

        {/* Topographic contour lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="footer-fade">
              <rect width="100%" height="100%" fill="url(#footer-grad-mask)" />
            </mask>
            <radialGradient id="footer-grad-mask" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g mask="url(#footer-fade)" fill="none" stroke="white" strokeWidth="0.8">
            <ellipse cx="75%" cy="110%" rx="55%" ry="50%" />
            <ellipse cx="75%" cy="110%" rx="44%" ry="40%" />
            <ellipse cx="75%" cy="110%" rx="33%" ry="30%" />
            <ellipse cx="75%" cy="110%" rx="22%" ry="20%" />
            <ellipse cx="75%" cy="110%" rx="11%" ry="10%" />
            <ellipse cx="15%" cy="-10%" rx="40%" ry="35%" />
            <ellipse cx="15%" cy="-10%" rx="30%" ry="26%" />
            <ellipse cx="15%" cy="-10%" rx="20%" ry="17%" />
            <ellipse cx="15%" cy="-10%" rx="10%" ry="9%" />
          </g>
        </svg>

        {/* Fine architectural grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>

        {/* Crossing diagonal accent lines — top left */}
        <svg className="absolute top-0 left-0 w-[480px] h-[480px] opacity-[0.03]" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" strokeWidth="0.6" fill="none">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 26} x2={i * 26} y2="0" />
            ))}
          </g>
        </svg>

        {/* Crossing diagonal accent lines — bottom right */}
        <svg className="absolute bottom-0 right-0 w-[400px] h-[300px] opacity-[0.03]" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" strokeWidth="0.6" fill="none">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="400" y1={i * 32} x2={400 - i * 32} y2="300" />
            ))}
          </g>
        </svg>

        {/* Glowing orb bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[700px] h-[200px] opacity-[0.07] blur-3xl rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)" }} />
      </div>

      {/* ── Big background wordmark ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[clamp(60px,15vw,180px)] font-black leading-none opacity-[0.025] whitespace-nowrap select-none pointer-events-none tracking-[0.15em]" aria-hidden="true">
        KULTURA
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-8">

        {/* Top: tagline + description */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
          <div className="max-w-md">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
              <Image src="/images/logo-white.png" alt="Kultura Properties" width={28} height={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{t.tagline}</h2>
            <p className="text-sm leading-relaxed opacity-60">{t.description}</p>

            {/* Social icons below tagline */}
            <div className="flex gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-50 hover:opacity-100 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  aria-label={s.label}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Grid: nav + contact */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-10 lg:gap-20">
            {/* Nav */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-30 mb-5">{t.nav_label}</p>
              <ul className="space-y-3">
                {footerNav.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                      {dict.nav[link.key as keyof typeof dict.nav]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-30 mb-5">{t.contact_label}</p>
              <ul className="space-y-3">
                <li>
                  <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                    <Phone className="w-3.5 h-3.5 shrink-0" /> {t.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                    <Mail className="w-3.5 h-3.5 shrink-0" /> {t.email}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2 text-sm opacity-60">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {t.address}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px mb-8" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-30">{t.rights.replace("{year}", String(year))}</p>
          <div className="flex items-center gap-6 text-xs opacity-30">
            <span>{t.terms}</span>
            <span>{t.privacy}</span>
            <Link
              href={`/${locale === "en" ? "id" : "en"}`}
              className="uppercase font-medium hover:opacity-100 transition-opacity"
            >
              {locale === "en" ? "ID" : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
