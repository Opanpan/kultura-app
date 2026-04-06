import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[locale]/dictionaries";

const footerNav = ["home", "about", "property", "service", "faq", "blog", "contact"] as const;

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer style={{ background: "var(--muted)" }}>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold max-w-sm leading-tight" style={{ color: "var(--fg)" }}>
            {dict.footer.discover}
          </h2>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: "var(--muted-fg)" }}>{dict.footer.description}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-wrap items-center gap-6">
            {footerNav.map((key) => (
              <Link key={key} href={`/${locale}`} className="text-sm transition-colors hover:opacity-70" style={{ color: "var(--muted-fg)" }}>
                {dict.nav[key]}
              </Link>
            ))}
            <span className="text-sm" style={{ color: "var(--muted-fg)" }}>Logo Here</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--muted-fg)" }}>
            <span>{dict.footer.terms}</span>
            <span>{dict.footer.privacy}</span>
          </div>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "var(--muted-fg)" }}>{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
