import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth({ redirectTo = '/login' }) {
  const token = useSelector((s) => s.auth.token);
  return token ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
