import { useEffect, useState } from "react";

export default function useSolverUi() {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
  
      const handleChange = () => {
        if (mediaQuery.matches) {
          setMenuOpen(false); // force close on large screens
        }
      };
  
      handleChange(); // run once on mount
      mediaQuery.addEventListener("change", handleChange);
  
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);
      useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 769px)");

    const handleChange = (e) => {
      if (e.matches) {
        setMenuOpen(false); // close when entering mobile
      }
    };

    // Run once on mount
    if (mediaQuery.matches) {
      setMenuOpen(false);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
    useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);
    return { 
        menuOpen,
        setMenuOpen
     };
}