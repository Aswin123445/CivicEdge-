import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
// Hook encapsulating landing logic
const useAuthLanding = () => {
  const [mode, setMode] = useState("signIn"); // "signIn" | "signUp"
  const navigate = useNavigate();

  const handleGoogle = useCallback(() => {
    // placeholder: trigger Google OAuth / popup / redirect
    console.log("Google flow for", mode);
    // e.g., navigate or open popup depending on mode
  }, [mode]);

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
