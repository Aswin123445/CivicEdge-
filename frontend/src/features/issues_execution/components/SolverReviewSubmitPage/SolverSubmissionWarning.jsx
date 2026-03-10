import React from "react";

const SolverSubmissionWarning = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
      <div className="text-amber-500 shrink-0">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-bold text-amber-900">
          Final Submission Notice
        </h4>
        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
          By submitting this report, you confirm that all field data provided is
          accurate. This report will be sent to the CivicEdge Administrator for
          final execution approval.{" "}
        </p>
      </div>
    </div>
  );
};

export default SolverSubmissionWarning;
