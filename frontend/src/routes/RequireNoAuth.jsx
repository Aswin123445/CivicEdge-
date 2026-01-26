import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import useCommon from "../features/auth/hooks/useCommon";
import { useEffect, useState } from "react";

export default function RequireNoAuth({ redirectTo = "/dashboard" }) {
  const { fetchRole, status } = useCommon();
  const { access_token, loading } = useSelector((s) => s.auth);
  const [resolvedRedirect, setResolvedRedirect] = useState(null);

  useEffect(() => {
    if (access_token) {
      fetchRole()
        .unwrap()
        .then((res) => {
          if (res.role === "admin") {
            setResolvedRedirect("/admin/management/citizens");
          } else if (res.role === "solver") {
            setResolvedRedirect("/solver-dashboard");
          } else {
            setResolvedRedirect(redirectTo); // fallback
          }
        })
        .catch(() => {
          setResolvedRedirect(redirectTo); // fallback on error
        });
    }
  }, [access_token, fetchRole, redirectTo]);


  if (loading || status.isLoading) {
    return <Spinner />;
  }

  if (access_token) {
    if (resolvedRedirect) {
      console.log(resolvedRedirect,'inside')
      return <Navigate to={resolvedRedirect} replace />;
    }
    return <Spinner />; 
  }
  return <Outlet />;
}
