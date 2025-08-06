
// export default App
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthRegister from './features/auth/pages/AuthRegister';
import Landing from './pages/Landing';
import Dashboard from './pages/dashboard';
import RequireAuth from './routes/RequireAuth';
import LandingLayout from './layout/LandingLayout';
import MainLayout from './layout/mainLayout';
import AuthLanding from './features/auth/pages/AuthLanding';
import AuthLayout from './layout/AuthLayout';
import AuthLogin from './features/auth/pages/AuthLogin';
import VerifyEmailInfo from './features/auth/pages/VerifyEmailInfo';
import VerifyEmailResult from './features/auth/pages/VerifyEmailResult';
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<LandingLayout />}>
        <Route path="/home" element={<Landing />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/landing" element={<AuthLanding />} />
        <Route path="/login" element={<AuthLogin />}/>
        <Route path="/register" element={<AuthRegister/>}/>
        <Route path="/verify-email-info" element={<VerifyEmailInfo/>}/>
        <Route path="/verify-email" element={<VerifyEmailResult />} />


      </Route>
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
