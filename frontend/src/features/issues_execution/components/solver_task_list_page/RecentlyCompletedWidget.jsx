import React from "react";

const RecentlyCompletedWidget = ({ tasks }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="font-bold text-slate-900 mb-4">Recently Completed</h2>
      <div className="space-y-4">
        {[
          { title: "Broken Water Pipe", time: "2h ago" },
          { title: "Pothole Filling", time: "5h ago" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div>
              <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition">
                {item.title}
              </h4>
              <span className="text-[10px] text-slate-400">{item.time}</span>
            </div>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Resolved
            </span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center justify-center gap-1">
        View All History
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
};

export default RecentlyCompletedWidget;
