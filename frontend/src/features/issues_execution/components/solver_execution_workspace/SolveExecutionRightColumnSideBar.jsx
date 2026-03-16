import React from "react";
import InfoRow from "../../ui/solver_execution_workspace/InfroRow";
import { formatDate } from "../../../../utils/datenormalize";

const SolveExecutionRightColumnSideBar = ({
  taskDetails,
  setIsCompletionModalOpen,
  setIsProgressModalOpen,
}) => {
  const date = formatDate(taskDetails?.created_at);
  const submitDate = formatDate(taskDetails?.latest_report?.submitted_at);
  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="sticky top-28 space-y-6">
        {/* Task Information Panel */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            Task Information
          </h3>
          <div className="space-y-4">
            <InfoRow label="Task Ref" value={taskDetails?.reference_id} />
            <InfoRow label="Issue Ref" value={taskDetails?.issue_reference} />
            <InfoRow label="Zone" value={taskDetails?.zone} />
            <InfoRow label="Assigned" value={date} />
            <InfoRow label="Submitted On" value={submitDate} />
          </div>
        </section>

        {/* Contractor Information Panel */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className=" mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            <div>
              <div>Contractor</div>
              <div className="text-sm lowercase">{taskDetails?.contractor_email}</div>
            </div>
          </h3>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">
              {taskDetails?.contractor_email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900">
                {taskDetails?.contractor_name}
              </p>
              <p className="text-xs text-slate-500">Verified Partner</p>
            </div>
          </div>
        </section>

        {/* Execution Actions Panel */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            Actions
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsProgressModalOpen(true)}
              className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-700 shadow-sm"
            >
              + Add Progress Update
            </button>
            <button
              onClick={() => setIsCompletionModalOpen(true)}
              className="w-full rounded-lg bg-slate-100 py-3 font-bold text-slate-800 transition-colors hover:bg-slate-200"
            >
              Submit Completion
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SolveExecutionRightColumnSideBar;
