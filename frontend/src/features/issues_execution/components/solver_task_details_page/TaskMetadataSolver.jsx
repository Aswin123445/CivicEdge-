import React from "react";
import MetadataRow from "../../ui/SolverTaskDetailsPage.jsx/MetadataRow";
import { formatDate } from "../../../../utils/datenormalize";

const TaskMetadataSolver = ({ taskData }) => {
  const date = formatDate(taskData?.created_at);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-900 mb-6">
        Task Information
      </h3>
      <div className="space-y-4">
        <MetadataRow label="Task ID" value={taskData?.reference_id} />
        <MetadataRow label="Issue ID" value={taskData?.issue_reference} />
        <MetadataRow label="Zone" value={taskData?.zone} />
        <MetadataRow label="Assigned Date" value={date} />
        <MetadataRow label="Reporter" value={taskData?.reporter} />
      </div>
    </div>
  );
};

export default TaskMetadataSolver;
