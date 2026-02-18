import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";
import ROLE_REDIRECT_MAP from "../../utils/role_mapper";
import CivicEdgeLoader from "../../components/Loaders/CivicEdgeLoaders";


export default function RequireNoAuth() {
  const { access_token, loading,role,status } = useSelector((s) => s.auth);
  if (status === "loading") return <CivicEdgeLoader/>;
  if (loading) {
    return <Spinner />;
  }

  return ( access_token && role )
    ? <Navigate to={ROLE_REDIRECT_MAP[role]} replace />
    : <Outlet />;
}
