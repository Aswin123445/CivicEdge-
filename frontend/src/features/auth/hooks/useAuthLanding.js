import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { errorToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

// Hook encapsulating landing logic
const useAuthLanding = () => {
  const { googleLogin } = useAuth();
  const [mode, setMode] = useState("signIn"); // "signIn" | "signUp"
  const navigate = useNavigate();

  const handleGoogle = useCallback(
    (access_token) => {
      // placeholder: trigger Google OAuth / popup / redirect
      async function handleGoogleLogin() {
        try {
          await googleLogin({ data: access_token }).unwrap();
          navigate("/dashboard");
        } catch (err) {
          const message = extractErrorMessage(err);
          errorToast({
            title: "Login failed",
            description: `${message || "An error occurred during login."}`,
          });
          throw err; 
        }
      }
      handleGoogleLogin();

      // e.g., navigate or open popup depending on mode
    },
    [googleLogin, navigate],
  );
  const handleEmail = useCallback(() => {
    if (mode === "signIn") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  }, [mode, navigate]);

  const switchTo = useCallback((newMode) => setMode(newMode), []);

  return {
    mode,
    switchTo,
    handleGoogle,
    handleEmail,
  };
};
export default useAuthLanding;
