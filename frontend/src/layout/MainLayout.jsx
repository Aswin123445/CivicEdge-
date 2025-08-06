// src/layout/MainLayout.jsx
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-2 text-sm">
        &copy; {new Date().getFullYear()} CivicEdge
      </footer>
    </div>
  );
}
