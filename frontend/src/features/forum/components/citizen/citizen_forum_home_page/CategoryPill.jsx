import React from "react";

/**
 * CategoryPill
 * Props:
 *   name     {string}   - Label to display
 *   isActive {boolean}  - Whether this pill is selected
 *   onClick  {function} - Click handler
 */
const CategoryPill = ({ name = "", isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap border
      ${
        isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
      }`}
  >
    {name}
  </button>
);

export default CategoryPill;
