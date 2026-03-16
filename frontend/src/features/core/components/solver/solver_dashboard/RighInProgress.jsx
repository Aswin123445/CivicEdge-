import React from "react";
import { AlertCircle } from "lucide-react";

const RightInProgress = ({ IN_PROGRESS = [] }) => {
  if (!IN_PROGRESS.length) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">In Progress Tasks</h3>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="text-slate-400 mb-2" size={22} />
          <p className="text-sm text-slate-500 font-medium">
            No tasks currently in progress
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-4">In Progress Tasks</h3>

      <div className="space-y-6">
        {IN_PROGRESS.map((task) => {
          const progress =
            task?.latest_progress_summary?.progress_percentage ??
            task?.progress ??
            0;

          const safeProgress = Math.min(Math.max(progress, 0), 100);

          return (
            <div key={task.id} className="space-y-2">
              {/* Title + Percentage */}
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 truncate max-w-[70%]">
                  {task.issue_title}
                </span>

                <span className="text-blue-600 font-bold">
                  {safeProgress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${safeProgress}%` }}
                  className="h-full bg-blue-600 transition-all duration-300"
                />
              </div>

              {/* Optional Summary */}
              {task?.latest_progress_summary?.progress_summary && (
                <p className="text-[11px] text-slate-400">
                  {task.latest_progress_summary.progress_summary}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightInProgress;