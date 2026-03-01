import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // PUSH | POP | REPLACE

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // civic-safe
      });
    }
  }, [location.pathname, navigationType]);

  return null;
};

export default ScrollManager;