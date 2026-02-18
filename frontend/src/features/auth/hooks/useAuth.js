import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../../utils/Toaster';
import { useParams } from "react-router-dom";
import { useSignupMutation,
   useLoginMutation,
   useGoogleLoginMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation } from '../services/authApi';
import { useLogoutMutation } from '../services/commonApi';
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { logout_user } from '../authSlice';
export function useAuth() {
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { user, access_token } = useSelector((s) => s.auth);
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [googleLogin, googleLoginResult] = useGoogleLoginMutation();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
  const [logout, logoutResult] = useLogoutMutation();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap(); // result contains your API response
      // Navigate based on role
      navigate("/home", { replace: true });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"Login failed",description:`${message || 'An error occurred during login.'}`});
    }
  };
  const onSignUpSubmit = async (data) => {
    try {
      await signup(data).unwrap();
      navigate('/verify-email-info');
    } catch (e) {
      const message = extractErrorMessage(e);
      errorToast({title:"Signup failed",description:`${message || 'An error occurred during signup.'}`});
    }
  };
  const resetPasswordOnSubmit = async (data) => {
  try {
    const credentials = {
      new_password: data.password,
      confirm_password: data.confirm_password
    }
    await resetPassword({uid,token,credentials}).unwrap(); 
    navigate('/reset-confirmation');
  } catch (err) {
    const message = extractErrorMessage(err);
    errorToast({title:"Reset password failed",description:`${message || 'An error occurred during reset password.'}`});
  }
};

const forgotPasswordOnSubmit = async (data) => {
  try {
    await forgotPassword(data).unwrap(); // unwrap returns the actual response
    navigate('/reset-password');
  } catch (err) {
    const message = extractErrorMessage(err);
    errorToast({title:"Forgot password failed",description:`${message || 'An error occurred during forgot password.'}`});
  }
};
  const handleLogout = async () => {
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
    logoutResult,
    onSubmit,
    onSignUpSubmit,
    resetPasswordOnSubmit,
    forgotPasswordOnSubmit,
    handleLogout
  };
}
