import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast } from "../../../utils/Toaster";
import { useAdminLoginMutation as  useLoginMutation } from "../services/adminAuthApi";
import { useNavigate } from 'react-router-dom';

export function useAdminAuth() {
  const [login, loginResult] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await login(data).unwrap(); // result contains your API response
      // Navigate based on role
      navigate("/dashboard/dashboard", { replace: true });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"Login failed",description:`${message || 'An error occurred during login.'}`});
    }
  };

  return {
    login,
    loginStatus: loginResult,
    onSubmit
  };
}
