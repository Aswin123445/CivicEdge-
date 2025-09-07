import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
// Hook encapsulating landing logic
const useAuthLanding = () => {
  const {googleLogin,googleLoginStatus} = useAuth();
  const [mode, setMode] = useState("signIn"); // "signIn" | "signUp"
  const navigate = useNavigate();

  const handleGoogle = useCallback((access_token) => {
    // placeholder: trigger Google OAuth / popup / redirect
    async function handleGoogleLogin() {
      try {
        await googleLogin({ data:access_token });
        if (googleLoginStatus.isSuccess === true) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    }
    handleGoogleLogin();

    // e.g., navigate or open popup depending on mode
  }, [googleLogin,googleLoginStatus,navigate]);
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
