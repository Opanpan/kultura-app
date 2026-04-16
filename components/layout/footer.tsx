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
      {/* Background pattern text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -left-[10%] top-[5%] -rotate-12 flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[12vw] lg:text-[10vw] font-black uppercase tracking-[0.15em] whitespace-nowrap opacity-[0.03] leading-none" style={{ transform: `translateX(${i % 2 === 0 ? 0 : -120}px)` }}>
              KULTURA · KULTURA · KULTURA · KULTURA
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        {/* Logo + tagline */}
        <div className="mb-10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
            <Image src="/images/logo-white.png" alt="Kultura Properties" width={28} height={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{t.tagline}</h2>
          <p className="text-sm leading-relaxed opacity-60 max-w-md">{t.description}</p>
          <a
            href="https://wa.me/6281112004007?text=%5BKPWA%20WEB%5D%20Hi%20Kultura%E2%9C%A8%2C%20Saya%20mau%20informasi%20tentang%20rumah%20%E2%80%A6%20%2C%20Nama%20saya%20%E2%80%A6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full transition-colors text-sm mt-6"
            style={{ background: "var(--bg)", color: "var(--fg)" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {dict.cta.whatsapp_cta}
          </a>
        </div>

        {/* Nav + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
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
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-30 mb-5">{t.contact_label}</p>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> {t.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> {t.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-xs sm:text-sm opacity-60">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {t.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-2 mb-10">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-50 hover:opacity-100 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label={s.label}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="h-px mb-6" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.12), transparent)" }} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs opacity-30">{t.rights.replace("{year}", String(year))}</p>
          <div className="flex items-center gap-6 text-xs opacity-30">
            <span>{t.terms}</span>
            <span>{t.privacy}</span>
            <Link href={`/${locale === "en" ? "id" : "en"}`} className="uppercase font-medium hover:opacity-100 transition-opacity">
              {locale === "en" ? "ID" : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
