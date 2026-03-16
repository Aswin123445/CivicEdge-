import React from "react";

const SummaryStrip = ({ metrics }) => {
  const newTasks = metrics?.new_tasks ?? 0;
  const inProgress = metrics?.in_progress ?? 0;
  const waitingApproval = metrics?.waiting_admin_approval ?? 0;
  const resolved = metrics?.resolved ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      {/* New Tasks */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
            New Tasks
          </p>
          <p className="text-3xl font-black text-blue-600">
            {newTasks}
          </p>
        </div>

        <div className="text-blue-600 opacity-40 text-xl">
          📩
        </div>
      </div>

      {/* In Progress */}
      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
            In Progress
          </p>
          <p className="text-3xl font-black text-amber-600">
            {inProgress}
          </p>
        </div>

        <div className="text-amber-600 opacity-40 text-xl">
          ⚙️
        </div>
      </div>

      {/* Waiting Approval */}
      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
            Waiting Approval
          </p>
          <p className="text-3xl font-black text-purple-600">
            {waitingApproval}
          </p>
        </div>

        <div className="text-purple-600 opacity-40 text-xl">
          ⏳
        </div>
      </div>

      {/* Resolved */}
      <div className="p-4 rounded-xl border border-green-200 bg-green-50 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
            Resolved
          </p>
          <p className="text-3xl font-black text-green-600">
            {resolved}
          </p>
        </div>

        <div className="text-green-600 opacity-40 text-xl">
          ✅
        </div>
      </div>

    </div>
  );
};

export default SummaryStrip;