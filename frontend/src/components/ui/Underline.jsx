import React, { useState, useEffect } from "react";
const Underline = ({ active, width = "w-16" }) => {
  const [render, setRender] = useState(active);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (active) {
      setRender(true);
      setLeaving(false);
    } else if (render) {
      setLeaving(true);
      const t = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(t);
    }
  }, [active, render]);

  if (!render) return null;

  return (
    <div
      className={`
        ${width} h-1 bg-sky-400 rounded-t-lg
        transition-all duration-200
        origin-left
        ${leaving ? "opacity-0 scale-x-75" : "opacity-100 scale-x-100"}
      `}
    />
  );
};

export default Underline;