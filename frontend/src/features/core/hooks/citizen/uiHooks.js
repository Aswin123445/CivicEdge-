import { useState, useEffect } from "react";
import { AWARENESS_FACTS } from "../../../../constants/citizen_home";
export default function useCitizenUi() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [phoneMenuOpne, setPhoneMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        setPhoneMenuOpen(false); // force close on large screens
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
        setUserMenuOpen(false); // close when entering mobile
      }
    };

    // Run once on mount
    if (mediaQuery.matches) {
      setUserMenuOpen(false);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phoneMenuOpne ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [phoneMenuOpne]);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 3500);
    const next = setTimeout(() => {
      setIndex((prev) => (prev + 1) % AWARENESS_FACTS.length);
      setVisible(true);
    }, 4500);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [index]);

  return {
    index,
    visible,
    phoneMenuOpne,
    setPhoneMenuOpen,
    userMenuOpen,
    setUserMenuOpen,
  };
}
