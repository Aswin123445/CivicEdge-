import { Link, Outlet } from "react-router-dom";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo192.png" alt="CivicEdge" className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-600">CivicEdge</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/login"
              className="px-4 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet/>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} CivicEdge. All rights reserved.
      </footer>
    </div>
  );
}
