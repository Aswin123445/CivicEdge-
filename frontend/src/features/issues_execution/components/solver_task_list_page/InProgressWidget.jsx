import React from "react";

const InProgressWidget = ({ tasks }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
        In Progress Tasks
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 truncate mr-2">
              Street light flickering
            </span>
            <span className="text-slate-400">65%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Due in 4 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default InProgressWidget;
