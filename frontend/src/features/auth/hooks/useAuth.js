import { useSelector } from 'react-redux';
import { useSignupMutation,
   useLoginMutation,
   useLogoutMutation,
   useGoogleLoginMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation } from '../services/authApi';
export function useAuth() {
  const { user, access_token } = useSelector((s) => s.auth);
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [googleLogin, googleLoginResult] = useGoogleLoginMutation();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
  const [logout, logoutResult] = useLogoutMutation();


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
    resetPasswordResult,
    logoutResult
  };
}
