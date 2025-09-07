import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthInit } from '../hooks/refreshHook';
export default function  RequireAuth ({ redirectTo = '/login' }) {
  const {access_token,loading} = useSelector((s) => s.auth);
  const {isloading} =  useAuthInit();
  console.log('isloading',isloading,access_token);
    if (loading) {
      return <div>Loading...</div>;
    }

  return access_token ? <Outlet /> : <Navigate to={redirectTo} replace />;
}