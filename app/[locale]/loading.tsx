export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="h-6 w-48 rounded mb-6" style={{ background: "var(--muted)" }} />
        <div className="h-16 w-96 rounded mb-4" style={{ background: "var(--muted)" }} />
        <div className="h-16 w-80 rounded mb-6" style={{ background: "var(--muted)" }} />
        <div className="h-4 w-64 rounded mb-12" style={{ background: "var(--muted)" }} />
        <div className="h-48 w-full max-w-4xl rounded-2xl" style={{ background: "var(--muted)" }} />
      </div>
    </div>
  );
}
