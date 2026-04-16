import React from "react";

const SORT_OPTIONS = ["Latest", "Oldest"];

const SortBar = ({ postCount = 0, sortValue = "Latest", onSort }) => {
  return (
    <section className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-sm font-medium">Sort:</span>

        <div className="flex items-center bg-slate-100 rounded-full p-1">
          {SORT_OPTIONS.map((opt) => {
            const isActive = sortValue === opt;

            return (
              <button
                key={opt}
                onClick={() => onSort?.(opt)}
                className={`
                  px-4 py-1.5 text-sm font-medium rounded-full transition-all
                  ${isActive 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"}
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="text-slate-400 text-sm">
        Showing {postCount} {postCount === 1 ? "post" : "posts"}
      </div>
    </section>
  );
};

export default SortBar;