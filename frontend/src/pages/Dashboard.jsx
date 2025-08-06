
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-gray-600">Hello, {user.email}</span>}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        <p className="text-gray-700">
          Welcome to your protected dashboard. You are logged in and can now
          access user-specific content.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            Go back to Landing
          </Link>
        </div>
      </main>
    </div>
  );
}
