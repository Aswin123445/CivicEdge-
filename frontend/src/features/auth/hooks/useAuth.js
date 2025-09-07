import { useSelector, useDispatch } from 'react-redux';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation,useForgotPasswordMutation,useResetPasswordMutation } from '../services/authApi';
import { logout as logoutAction } from '../authSlice';
export function useAuth() {
  const dispatch = useDispatch();
  const { user, access_token } = useSelector((s) => s.auth);
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [googleLogin, googleLoginResult] = useGoogleLoginMutation();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

  const logout = () => dispatch(logoutAction());

  return {
    user,
    access_token,
    signup: signup,
    signupStatus: signupResult,
    login: login,
    loginStatus: loginResult,
    logout,
    googleLogin: googleLogin,
    googleLoginStatus: googleLoginResult,
    forgotPassword,
    forgotPasswordResult,
    resetPassword,
    resetPasswordResult
  };
}
