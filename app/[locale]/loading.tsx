export default function Loading() {
  return (
    <div className="min-h-screen bg-cream animate-pulse">
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="h-6 w-48 bg-cream-dark rounded mb-6" />
        <div className="h-16 w-96 bg-cream-dark rounded mb-4" />
        <div className="h-16 w-80 bg-cream-dark rounded mb-6" />
        <div className="h-4 w-64 bg-cream-dark rounded mb-12" />
        <div className="h-48 w-full max-w-4xl bg-cream-dark rounded-2xl" />
      </div>
    </div>
  );
}
