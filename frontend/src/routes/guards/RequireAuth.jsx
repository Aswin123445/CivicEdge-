import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ redirectTo = "/landing" }) {
  const { access_token, loading } = useSelector((s) => s.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
