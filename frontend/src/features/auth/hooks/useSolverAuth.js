import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast } from "../../../utils/Toaster";
import { useLoginMutation } from "../services/solverAuthApi";
import { useNavigate } from "react-router-dom";

export default function useSolverAuth() {
  const navigate = useNavigate();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const onSubmit = async (data) => {
    try {
      await login(data).unwrap(); // result contains your API response
      // Navigate based on role
      navigate("/solver/dashboard", { replace: true });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Login failed",
        description: `${message || "An error occurred during login."}`,
      });
    }
  };

  return {
    login,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    onSubmit,
  };
}
