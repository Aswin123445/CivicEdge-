// src/routes/guards/RoleGuard.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard({ roles }) {
  const { role, loading } = useSelector((s) => s.auth);

  // Wait for auth bootstrap
  if (loading) return null;

  return roles.includes(role)
    ? <Outlet />
    : <Navigate to="/unautdhorized" replace />;
}
