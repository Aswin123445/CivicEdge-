import React from "react";

export default function ActionCard({ icon, title, desc, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left
        bg-blue-50
        border border-blue-100
        rounded-2xl
        p-5
        flex items-center gap-4
        transition-all
        hover:bg-blue-100
        hover:border-blue-200
        hover:shadow-md
        group
      "
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200">
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-semibold text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>

      {/* Badge */}
      {badge && (
        <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-1 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}
