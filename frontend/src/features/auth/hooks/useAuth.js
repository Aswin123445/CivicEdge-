import { useSelector, useDispatch } from 'react-redux';
import { useSignupMutation, useLoginMutation } from '../services/authApi';
import { logout as logoutAction } from '../authSlice';
export function useAuth() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth);
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();

  const logout = () => dispatch(logoutAction());

  return {
    user,
    token,
    signup: signup,
    signupStatus: signupResult,
    login: login,
    loginStatus: loginResult,
    logout,
  };
}
