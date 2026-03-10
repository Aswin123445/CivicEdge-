import React from "react";

const SolverIssuePresence = ({ formData, handleInputChange }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
        Issue Confirmation
      </h3>
      <div className="space-y-3">
        <p className="text-slate-600 text-sm">
          Is the issue present at the location?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.is_issue_present ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:border-slate-300"}`}
          >
            <input
              type="radio"
              name="is_issue_present"
              value="true"
              checked={formData.is_issue_present === true}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600"
            />
            <div className="ml-3">
              <p className="text-sm font-bold text-slate-900">Yes</p>
              <p className="text-xs text-slate-500">Issue confirmed on-site</p>
            </div>
          </label>
          <label
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${!formData.is_issue_present ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:border-slate-300"}`}
          >
            <input
              type="radio"
              name="is_issue_present"
              value="false"
              checked={formData.is_issue_present === false}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600"
            />
            <div className="ml-3">
              <p className="text-sm font-bold text-slate-900">No</p>
              <p className="text-xs text-slate-500">Issue not found</p>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
};

export default SolverIssuePresence;
