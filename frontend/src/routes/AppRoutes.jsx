import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import RequireAuth from "./guards/RequireAuth";
import RequireNoAuth from "./guards/RequireNoAuth";
import RoleGuard from "./guards/RoleGuard";
/* ========== LAYOUTS ========== */
import AuthLayout from "../features/auth/layout/AuthLayout";
import MainLayout from "../features/core/layouts/MainLayout";
import AdminLayout from "../features/auth/layout/adminLayout";
import SolverLayout from "../features/core/layouts/SolverLayout";

const UserManagementLayout = lazy(() => import("../features/auth/layout/RoleManagementLayout")); // UserManagementLayout

/* ========== AUTH PAGES (GUEST) ========== */
import AuthLanding from "../features/auth/pages/user/AuthLanding";
import AuthLogin from "../features/auth/pages/user/AuthLogin";
import AuthRegister from "../features/auth/pages/user/AuthRegister";
import VerifyEmailInfo from "../features/auth/pages/user/VerifyEmailInfo";
import VerifyEmailResult from "../features/auth/pages/user/VerifyEmailResult";
import AuthForgotPassword from "../features/auth/pages/user/AuthForgotPassword";
import AuthResetPassword from "../features/auth/pages/user/AuthResetPassword";
import AuthResetPasswordInfo from "../features/auth/pages/user/AuthResetPasswordInfo";
import ResetPasswordConfirmation from "../features/auth/pages/user/AuthResetConfirmation";
import AuthAdminLogin from "../features/auth/pages/admin/AdminLogin";
import Login from "../features/auth/pages/solver/Login";

/* ========== CORE PAGES ========== */
import SolverDashboard from '../features/core/pages/solver/Dashboard'
import Dashboard from "../features/core/pages/Dashboard";
import PostLoginRedirect from "../pages/PostLoginRedirect";
import Unauthorized from "../pages/Unauthorized";

/* ========== ADMIN PAGES ========== */
const UserManagement = lazy(() => import("../features/auth/pages/admin/CitizenManagemnt")); // UserManagement
const SolverManagement = lazy(() => import("../features/auth/pages/admin/SolverManagement")); // SolverManagement
const  AdminManagement = lazy(() => import("../features/auth/pages/admin/AdminManagement")); // AdminManagement

import Test from "../features/auth/pages/admin/Test";

import UserManagementSectionLoader from "../features/auth/components/skeltons/loaders_skelton/UserManagementSectionLoader";
export default function AppRoutes() {
  return (
    <Routes>
      {/* ================== GUEST ROUTES ================== */}
      <Route element={<RequireNoAuth redirectTo="/post-login" />}>
        <Route element={<AuthLayout />}>
          <Route path="/landing" element={<AuthLanding />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />

          <Route path="/verify-email-info" element={<VerifyEmailInfo />} />
          <Route path="/verify-email" element={<VerifyEmailResult />} />

          <Route path="/forgot-password" element={<AuthForgotPassword />} />
          <Route path="/reset-password" element={<AuthResetPasswordInfo />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<AuthResetPassword />}
          />
          <Route
            path="/reset-confirmation"
            element={<ResetPasswordConfirmation />}
          />

      {/* ================== SYSTEM ================== */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* ================== FALLBACK ================== */}
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />

          <Route path="/auth/admin/login" element={<AuthAdminLogin />} />
          <Route path = "/auth/solver/login" element={<Login/>} />
        </Route>
      </Route>

      {/* ================== AUTHENTICATED ROUTES ================== */}
      <Route element={<RequireAuth />}>
        {/* 🔀 post-login navigation policy */}
        <Route path="/post-login" element={<PostLoginRedirect />} />

        {/* citizen authenticated area */}
        <Route element={<RoleGuard roles={["citizen"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route element={<RoleGuard roles={["solver"]} />}>
          <Route element={<SolverLayout />}>
            <Route path="solver/dashboard" element={<SolverDashboard />} />
          </Route>
        </Route>

        {/* ================== ADMIN ONLY ================== */}
        <Route element={<RoleGuard roles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            {/* User Management Section */}
            <Route
              element={
                <Suspense fallback={<UserManagementSectionLoader />}>
                  <UserManagementLayout />
                </Suspense>
              }
            >
              <Route
                path="/admin/management/citizens"
                element={
                  <Suspense fallback={<UserManagementSectionLoader />}>
                    <UserManagement />
                  </Suspense>
                }
              />
              <Route
                path="/admin/management/solvers"
                element={
                  <Suspense fallback={<UserManagementSectionLoader />}>
                    <SolverManagement />
                  </Suspense>
                }
              />
              <Route
                path="/admin/management/admins"
                element={
                  <Suspense fallback={<UserManagementSectionLoader />}>
                    <AdminManagement />
                  </Suspense>
                }
              />
            </Route>

            <Route path="/admin/test" element={<Test />} />
          </Route>
        </Route>
      </Route>



    </Routes>
  );
}
