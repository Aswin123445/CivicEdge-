import React from "react";

const EntryWorkSpaceLoader = ({ isLoading }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
      {isLoading ? (
        <div className="space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Synchronizing Draft
            </h3>
            <p className="text-slate-500 text-sm">
              Checking previously saved progress...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Workspace Ready
            </h3>
            <p className="text-slate-500 text-sm">
              Redirecting to the next required step...
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default EntryWorkSpaceLoader;
