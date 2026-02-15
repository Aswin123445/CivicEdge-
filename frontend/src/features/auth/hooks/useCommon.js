import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation, useRoleQuery } from "../services/commonApi";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../authSlice";
import {extractErrorMessage} from "../../../utils/extractErrorMessage";
import {errorToast} from "../../../utils/Toaster";


export default function useCommon() {
const navigate = useNavigate();
const dispatch = useDispatch();
  const { access_token } = useSelector((s) => s.auth);
  const { data, isFetching, isSucess } = useRoleQuery(undefined, {
    skip: !access_token,
  });
  const [logout] = useLogoutMutation();

  const handleLogoutAdmin = async () => {
    try {
      await logout().unwrap();
      dispatch(logout_user());
      setTimeout(() => {
        navigate("/auth/admin/login", { replace: true });
      }, 0);
    } catch (err) {
      const message = extractErrorMessage(err); 
      errorToast({title:"Logout failed",description:`${message || 'An error occurred during logout.'}`});
    }
  };
  const handleLogout = async () => {
    try { 
      await logout().unwrap(); // fresh response from backend
      dispatch(logout_user()); // clear redux state
      setTimeout(()=>{
        navigate("/auth/solver/login");
      },[0])
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({title:"Logout failed",description:`${message || 'An error occurred during logout.'}`});
    }
  };
    const handleLogoutCitizen = async () => {
    try { 
      await logout().unwrap(); // fresh response from backend
      dispatch(logout_user()); // clear redux state
      setTimeout(()=>{
        navigate("/landing");
      },[0])
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({title:"Logout failed",description:`${message || 'An error occurred during logout.'}`});
    }
  };

  return {
    data,
    isFetching,
    isSucess,
    logout,
    handleLogoutAdmin,
    handleLogout,
    handleLogoutCitizen
  };
}
