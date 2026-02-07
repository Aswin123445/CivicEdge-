// src/routes/guards/RoleGuard.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard({ roles }) {
  const { role, loading } = useSelector((s) => s.auth);
  console.log(role,loading,'tried from there')

  // Wait for auth bootstrap
  if (loading) return null;

  return roles.includes(role)
    ? <Outlet />
    : <Navigate to="/unautdhorized" replace />;
}
