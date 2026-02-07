import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";

export default function RequireNoAuth({ redirectTo = "/post-login" }) {
  const { access_token, loading } = useSelector((s) => s.auth);

  if (loading) {
    return <Spinner />;
  }

  return access_token
    ? <Navigate to={redirectTo} replace />
    : <Outlet />;
}
