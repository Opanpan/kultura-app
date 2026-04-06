"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--fg)" }}>Something went wrong</h1>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full text-sm font-medium transition-colors"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
