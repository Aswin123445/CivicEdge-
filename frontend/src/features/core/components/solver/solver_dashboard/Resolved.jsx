import React from "react";
import { formatDate } from "../../../../../utils/datenormalize";

const Resolved = ({ completedTask }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-4">Recently Resolved</h3>
      <div className="space-y-3">
        {completedTask?.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0"
          >
            <span className="text-slate-600 font-medium truncate block">{task.issue_title}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs max-w-[120px] truncate block">{formatDate(task?.assigned_at)}</span>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                Resolved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resolved;
