import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CivicEdgeLoader from "../../components/Loaders/CivicEdgeLoaders";

export default function RequireAuth({ redirectTo = "/landing" }) {
  const { access_token, loading ,status} = useSelector((s) => s.auth);
  const location = useLocation();
  if (status === "loading") return <CivicEdgeLoader/>;
  if (loading) {
    return <div>Loading...</div>;
  }

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
