import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthInit } from '../hooks/refreshHook';

export default function RequireAuth({ redirectTo = '/landing' }) {
  const { access_token,role,loading } = useSelector((s) => s.auth);
  const location = useLocation();
  const { isLoading } = useAuthInit();
  // Decide redirect target based on path
  let finalRedirect = redirectTo;
  if (role === 'admin') {
    finalRedirect = '/auth/admin/login';
  } else if (role === 'solver') {
    finalRedirect = '/auth/solver/login';
  }

  console.log('isLoading', isLoading, access_token);

  // Still initializing (refresh in progress or store loading)
  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to={finalRedirect} state={{ from: location }} replace />
  );
}
