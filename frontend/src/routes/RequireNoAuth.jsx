import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
export default function RequireNoAuth({ redirectTo = "/dashboard" }) {
  const { access_token,loading } = useSelector((s) => s.auth);
  if(loading){
    return <Spinner/>
  }

  if (access_token) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
