import { useDispatch, useSelector } from "react-redux";
import {
  commonApi,
  useChangePasswordMutation,
  useLogoutMutation,
  useRoleQuery,
} from "../services/commonApi";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../authSlice";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../utils/Toaster";
import { authApi } from "../services/authApi";
import { adminAuthApi } from "../services/adminAuthApi";
import { solverAuthApi } from "../services/solverAuthApi";
import { set } from "react-hook-form";

export default function useCommon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = useSelector((s) => s.auth);

  const { data, isFetching, isSuccess } = useRoleQuery(undefined, {
    skip: !access_token,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [logout] = useLogoutMutation();
  const handleRtkCacheReset = () => {
    dispatch(authApi.util.resetApiState());
    dispatch(solverAuthApi.util.resetApiState());
    dispatch(adminAuthApi.util.resetApiState());
    dispatch(commonApi.util.resetApiState());
  };
  const handleLogoutAdmin = async () => {
    try {
      await logout().unwrap();
      dispatch(logout_user());
      handleRtkCacheReset();
      setTimeout(() => {
        navigate("/auth/admin/login", { replace: true });
      }, 0);
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Logout failed",
        description: `${message || "An error occurred during logout."}`,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // fresh response from backend
      dispatch(logout_user()); // clear redux state
      handleRtkCacheReset();
      setTimeout(() => {
        navigate("/auth/solver/login");
      }, [0]);
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Logout failed",
        description: `${message || "An error occurred during logout."}`,
      });
    }
  };
  const handleLogoutCitizen = async () => {
    try {
      await logout().unwrap(); // fresh response from backend
      dispatch(logout_user()); // clear redux state
      handleRtkCacheReset();
      setTimeout(() => {
        navigate("/landing");
      }, [0]);
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Logout failed",
        description: `${message || "An error occurred during logout."}`,
      });
    }
  };
  const handleChangePassword = async (data, onClose, setStatus) => {
    const normalized = {
      current_password: data.currentPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    };
    try {
      await changePassword(normalized).unwrap();
      onClose();
      setStatus('success');
      successToast({
        title: "Password changed successfully",
        description: "Password has been changed successfully.",
      });
    } catch (e) {
      const message = extractErrorMessage(e);
      errorToast({
        title: "Change password failed",
        description: `${message || "An error occurred during change password."}`,
      });
      setStatus("idle");
    }
  };

  return {
    data,
    isFetching,
    isSuccess,
    logout,
    handleLogoutAdmin,
    handleLogout,
    handleLogoutCitizen,
    handleChangePassword,
    isLoading,
  };
}
