import React from "react";

const TaskMetrics = ({ metrics }) => {
  const {
    completed_count,
    in_progress_count,
    pending_submission_count,
    pending_verification_count,
    new_assignments_count,
    postponed_count,
  } = metrics || {};

  const Card = ({ label, count, color, bg }) => (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>

      <div className="flex items-end justify-between">
        <span className={`text-2xl font-bold ${color}`}>{count ?? 0}</span>

        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full ${bg} ${color}`}
        >
          Active
        </span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      <Card
        label="New Assignments"
        count={new_assignments_count}
        color="text-blue-600"
        bg="bg-blue-50"
      />

      <Card
        label="In Execution"
        count={in_progress_count}
        color="text-amber-600"
        bg="bg-amber-50"
      />

      <Card
        label="Submitted for Completion"
        count={pending_submission_count}
        color="text-indigo-600"
        bg="bg-indigo-50"
      />

      <Card
        label="Waiting for Admin Approval"
        count={pending_verification_count}
        color="text-purple-600"
        bg="bg-purple-50"
      />

      <Card
        label="Completed"
        count={completed_count}
        color="text-green-600"
        bg="bg-green-50"
      />
      <Card
        label="Postponed"
        count={postponed_count}
        color="text-yellow-600"
        bg="bg-yellow-50"
      />
    </div>
  );
};

export default TaskMetrics;
