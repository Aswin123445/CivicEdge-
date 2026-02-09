import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import useCommon from "../features/auth/hooks/useCommon";
import ROLE_REDIRECT_MAP from  "../utils/role_mapper";
export default function PostLoginRedirect() {
  const { isFetching } = useCommon();
  const { access_token,role } = useSelector((s) => s.auth);
  if (!access_token) {
    return <Navigate to="/auth/solver/login" replace />;
  }
  if (isFetching) {
    return <Spinner />;
  }


  return <Navigate to={ROLE_REDIRECT_MAP[role]} replace />;
}
