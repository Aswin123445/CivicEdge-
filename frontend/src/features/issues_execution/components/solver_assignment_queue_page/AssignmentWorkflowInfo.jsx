import React from "react";

const AssignmentWorkflowInfo = () => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-100 mb-4">
        Assignment Workflow
      </h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs flex items-center justify-center font-bold text-slate-300">
            1
          </div>
          <p className="text-sm text-slate-400">
            <strong className="text-slate-200 block">Review Issue</strong>{" "}
            Verify data, images, and geolocation for accuracy.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs flex items-center justify-center font-bold text-slate-300">
            2
          </div>
          <p className="text-sm text-slate-400">
            <strong className="text-slate-200 block">Choose Solver</strong>{" "}
            Filter by category expertise and current workload.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs flex items-center justify-center font-bold text-slate-300">
            3
          </div>
          <p className="text-sm text-slate-400">
            <strong className="text-slate-200 block">Confirm</strong> Dispatch
            task to the solver's execution mobile app.
          </p>
        </div>
      </div>
      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-300 leading-relaxed">
          <strong>Pro Tip:</strong> Check zone coverage maps to minimize travel
          time for civic solvers.
        </p>
      </div>
    </div>
  );
};

export default AssignmentWorkflowInfo;
