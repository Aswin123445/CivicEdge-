import React from "react";

const AdminExecutionDecisionBanner = ({ latestExecutionProof }) => {
  if (!latestExecutionProof) return null;

  const isRejected = latestExecutionProof?.review_status === "rejected";
  const isApproved = latestExecutionProof?.review_status === "approved";

  const styles = isRejected
    ? "border-red-500 bg-red-50 text-red-700"
    : isApproved
    ? "border-green-500 bg-green-50 text-green-700"
    : "border-slate-300 bg-slate-50 text-slate-700";

  const title = isRejected
    ? "Submission has been Rejected by Admin"
    : isApproved
    ? "Submission has been Approved"
    : "Admin Decision";

  return (
    <div className={`mb-6 border-l-4 rounded-xl p-5 shadow-sm ${styles}`}>
      <div className="flex items-start gap-3">

        {/* ICON */}
        <div className="text-lg font-bold">
          {isRejected ? "⚠" : "✓"}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-2">
            {title}
          </h3>

          {/* Admin Message */}
          <p className="text-sm leading-relaxed mb-3">
            {latestExecutionProof.admin_message || "No message provided by admin."}
          </p>

          {/* Friendly Guidance for Rework */}
          {isRejected && (
            <div className="text-sm bg-white/60 border border-red-200 rounded-lg p-3">
              <p className="font-medium mb-1">What you should do next:</p>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                <li>Review the admin feedback carefully.</li>
                <li>Ensure the issue is fully resolved according to the requirements.</li>
                <li>Upload clearer evidence if necessary.</li>
                <li>Submit the completion report again once the task meets the criteria.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminExecutionDecisionBanner;