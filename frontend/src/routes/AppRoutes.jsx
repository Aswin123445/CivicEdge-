import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { useAuthInit } from "../hooks/refreshHook";
import RequireNoAuth from "./RequireNoAuth";
import MainLayout from "../features/core/layouts/MainLayout";
import Dashboard from "../features/core/pages/Dashboard";
import AuthRouter from "../features/auth/router/AuthRouter";
import AdminLayout from "../features/auth/layout/adminLayout";
import UserManagement from "../features/auth/pages/admin/CitizenManagemnt";
import SolverManagement from "../features/auth/pages/admin/SolverManagement";
import Test from "../features/auth/pages/admin/Test";
import UserManagementLayout from "../features/auth/layout/RoleManagementLayout";

import AdminManagement from "../features/auth/pages/admin/AdminManagement";

export default function AppRoutes() {
  useAuthInit();
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<RequireNoAuth />}>{AuthRouter()}</Route>
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route element={<UserManagementLayout />}>
            <Route
              path="/admin/management/citizens"
              element={<UserManagement />}
            />
            <Route
              path="/admin/management/solvers"
              element={<SolverManagement />}
            />
            <Route
              path="/admin/management/admins"
              element={<AdminManagement />}
            />
          </Route>
          <Route path="/admin/test" element={<Test />} />
        </Route>
      </Route>
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
