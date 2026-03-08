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

const UserManagementLayout = lazy(
  () => import("../features/auth/layout/RoleManagementLayout"),
); // UserManagementLayout

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
import SettingsPage from "../features/core/pages/citizen/SettingsPage"

/* ========== CORE PAGES ========== */
import CivicEdgeHome from "../features/core/pages/citizen/CitizenHome";

/* ========== ADMIN PAGES ========== */
const UserManagement = lazy(
  () => import("../features/auth/pages/admin/CitizenManagemnt"),
); // UserManagement
const SolverManagement = lazy(
  () => import("../features/auth/pages/admin/SolverManagement"),
); // SolverManagement
const AdminManagement = lazy(
  () => import("../features/auth/pages/admin/AdminManagement"),
); // AdminManagement

import Test from "../features/auth/pages/admin/Test";

import UserManagementSectionLoader from "../features/auth/components/skeltons/loaders_skelton/UserManagementSectionLoader";
import CitizenProfile from "../features/core/pages/citizen/CitizenProfile";
import SolverDashBoard from "../features/core/pages/solver/SolverDashBoard";
import SolverProfile from "../features/core/pages/solver/SolverProfile";
import AdminDashboardMain from "../features/core/pages/admin/AdminDashboardMain";
import AdminProfile from "../features/core/pages/admin/AdminProfile";
import AdminDashboardSkeleton from "../features/core/ui/skeltons/admin/AdminDashboardSkeleton";
import AdminFooterLayout from "../features/core/layouts/AdminFooterLayout";
import NotFound from "../pages/NotFound";
import IssueHome from "../features/issues/pages/IssueHome";
import DraftIssuesPage from "../features/issues/pages/DraftIssuesPage";
import DraftIssueDetails from "../features/issues/pages/DraftIssueDetails";
import IssueCreateStep1 from "../features/issues/pages/IssueCreateStep1";
import IssueCreateLocationStep from "../features/issues/pages/IssueCreateLocationStep";
import IssueCreateMediaStep from "../features/issues/pages/IssueCreateMediaStep";
import IssueCreateBehaviorStep from "../features/issues/pages/IssueCreateBehaviorStep";
import IssueReviewSubmitPage from "../features/issues/pages/IssueReviewSubmitPage";
import IssueSubmitSuccessPage from "../features/issues/pages/IssueSubmitSuccessPage";
import IssuesLayout from "../features/issues/layouts/IssuesLayout";
import ComplaintListPage from "../features/issues/pages/ComplaintListPage";
import ComplaintDetails from "../features/issues/pages/ComplaintDetails";
import ExecutionManagementLayout from "../features/issues_execution/layouts/ExecutionManagementLayout";
import PendingReviewPage from "../features/issues_execution/pages/PendingReviewPage";
import IssueDetailPage from "../features/issues_execution/pages/IssueDetailPage";
import SolverAssignmentQueuePage from "../features/issues_execution/pages/SolverAssignmentQueuePage";
import AdminIssueAssignmentPage from "../features/issues_execution/pages/AdminIssueAssignmentPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<CivicEdgeHome />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/complaints" element={<IssueHome />} />
      </Route>
      {/* ================== GUEST ROUTES ================== */}
      <Route element={<RequireNoAuth />}>
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

          <Route path="/auth/admin/login" element={<AuthAdminLogin />} />
          <Route path="/auth/solver/login" element={<Login />} />
        </Route>
      </Route>

      {/* ================== AUTHENTICATED ROUTES ================== */}
      <Route element={<RequireAuth />}>
        {/* citizen authenticated area */}
        <Route element={<RoleGuard roles={["citizen"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<CitizenProfile />} />
            <Route path="/settings" element={< SettingsPage/>} />
            <Route element={<IssuesLayout />}>
              <Route path="/drafts" element={<DraftIssuesPage />} />
              <Route path="/draft/:id" element={<DraftIssueDetails />} />
              <Route path="/issue/new" element={<IssueCreateStep1 />} />
              <Route
                path="/issue/:id/location"
                element={<IssueCreateLocationStep />}
              />
              <Route
                path="/issue/:id/evidence"
                element={<IssueCreateMediaStep />}
              />
              <Route
                path="/issue/:id/behavioral-prompts"
                element={<IssueCreateBehaviorStep />}
              />
              <Route
                path="/issue/:id/submit"
                element={<IssueReviewSubmitPage />}
              />
              <Route
                path="/successfull/:id"
                element={<IssueSubmitSuccessPage />}
              />
              <Route 
                path="/complaints/list"
                element ={<ComplaintListPage/>}
              />
              <Route 
                path="/complaints/:id"
                element={<ComplaintDetails/>}
              />
            </Route>
          </Route>
        </Route>
        <Route element={<RoleGuard roles={["solver"]} />}>
          <Route element={<SolverLayout />}>
            <Route path="solver/dashboard" element={<SolverDashBoard />} />
            <Route path="solver/profile" element={<SolverProfile />} />
            <Route path="/solver/settings" element={<SettingsPage />} />


          </Route>
        </Route>

        {/* ================== ADMIN ONLY ================== */}
        <Route element={<RoleGuard roles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route element={<AdminFooterLayout />}>
              {/* User Management Section */}
              <Route path="/admin/management" element={<UserManagementLayout />}>
                <Route
                  path="citizens"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <UserManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="solvers"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <SolverManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="admins"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <AdminManagement />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/admin/execution" element={<ExecutionManagementLayout />}>
                <Route path="in-review/issues" element={<PendingReviewPage/>} />
                <Route path="in-review/issues/:id/details" element={<IssueDetailPage/>} />
                <Route path="solver-assignment" element={<SolverAssignmentQueuePage/>} />
                <Route path="solver-assignment/:id/decision" element={<AdminIssueAssignmentPage/>} />
                <Route path="verification-reports" element={<div>Verification Reports</div>} />
                <Route path="solver-tasks" element={<div>Solver Tasks</div>} />
                <Route path="execution-proofs" element={<div>Execution Proofs</div>} />
              </Route>
              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<AdminDashboardSkeleton />}>
                    <AdminDashboardMain />
                  </Suspense>
                }
              />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/settings" element={<SettingsPage />} />

              <Route path="/admin/test" element={<Test />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* ================== SYSTEM ================== */}
      <Route path="/not-found" element={<NotFound />} />
      {/* ================== FALLBACK ================== */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}
