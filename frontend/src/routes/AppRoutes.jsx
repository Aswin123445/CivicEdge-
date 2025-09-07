import { Routes, Route, Navigate } from "react-router-dom";
import LandingLayout from "../layout/LandingLayout";   
import Landing from "../pages/Landing";
import AuthLayout from "../layout/AuthLayout";
import AuthLanding from "../features/auth/pages/AuthLanding"; 
import AuthLogin from "../features/auth/pages/AuthLogin";
import AuthRegister from "../features/auth/pages/AuthRegister";
import VerifyEmailInfo from "../features/auth/pages/VerifyEmailInfo";
import VerifyEmailResult from "../features/auth/pages/VerifyEmailResult";
import RequireAuth from "./RequireAuth";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import AuthForgotPassword from "../features/auth/pages/AuthForgotPassword";
import  AuthResetPassword  from "../features/auth/pages/AuthResetPassword";
import AuthResetPasswordInfo from "../features/auth/pages/AuthResetPasswordInfo";
import ResetPasswordConfirmation from "../features/auth/pages/AuthResetConfirmation";
import { useAuthInit } from "../hooks/refreshHook";
import RequireNoAuth from "./RequireNoAuth";
export default function AppRoutes() {
  useAuthInit();
  return(
    <Routes>
      {/* Public routes */}
      <Route element={<RequireNoAuth/>}>
      <Route element={<AuthLayout />}>
        <Route path="/landing" element={<AuthLanding />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/verify-email-info" element={<VerifyEmailInfo />} />
        <Route path="/verify-email" element={<VerifyEmailResult />} />
        <Route path="/forgot-password" element={<AuthForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<AuthResetPassword />} />
        <Route path="/reset-password" element={<AuthResetPasswordInfo />} />
        <Route path="/reset-confirmation" element={<ResetPasswordConfirmation />} />
      </Route>
      </Route>
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
