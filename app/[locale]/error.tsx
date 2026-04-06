"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-dark mb-4">Something went wrong</h1>
        <button
          onClick={reset}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
