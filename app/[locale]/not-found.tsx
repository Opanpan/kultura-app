import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
        <p className="text-gray-text mb-8">Page not found</p>
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
