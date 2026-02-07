import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import useCommon from "../features/auth/hooks/useCommon";
import { useEffect, useState } from "react";

export default function PostLoginRedirect() {
  const { fetchRole, status } = useCommon();
  const { access_token } = useSelector((s) => s.auth);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!access_token) return;

    fetchRole()
      .unwrap()
      .then((res) => {
        if (res.role === "admin") {
          setTarget("/admin/management/citizens");
        } else if (res.role === "solver") {
          setTarget("/unauthorized");
          
        } else {
          setTarget("/dashboard");
        }
      })
      .catch(() => {
        setTarget("/dashboard");
      });
  }, [access_token, fetchRole]);

  if (status.isLoading || !target) {
    return <Spinner />;
  }

  return <Navigate to={target} replace />;
}
