import React from "react";

const LocationCardSolver = ({ taskData }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Location Details</h2>
        <a
          href={taskData?.navigation_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Open Navigation
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              ></path>
            </svg>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Current Zone
            </label>
            <p className="text-sm font-bold text-slate-700">{taskData?.zone}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
            </svg>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              GPS Coordinates
            </label>
            <p className="text-sm font-bold text-slate-700 font-mono">
              {taskData?.latitude}, {taskData?.longitude}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationCardSolver;
