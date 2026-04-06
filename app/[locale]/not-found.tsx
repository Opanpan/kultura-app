import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4" style={{ color: "var(--fg)" }}>404</h1>
        <p className="mb-8" style={{ color: "var(--muted-fg)" }}>Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full text-sm font-medium transition-colors"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
