import React from "react";

const DecisionModal = ({
  onClose,
  handleSubmit,
  formData,
  contractors,
  setFormData,
  handleContractorSelection,
  adminDecisionTaskLoading,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/40 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {formData.decision_type === "APPROVED"
              ? "Approve & Proceed"
              : `${formData.decision_type} Task`}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="p-6 space-y-4">

            {/* Contractor Selection */}
            {formData.decision_type === "APPROVED" && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Assign Contractor
                </label>

                <select
                  value={formData.contractor_id || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contractor_id: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select a verified contractor...</option>

                  {contractors?.map((contractor) => (
                    <option key={contractor.id} value={contractor.id}>
                      {contractor.contact_email}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Internal Reason */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Internal Reason
              </label>

              <textarea
                name="internal_reason"
                value={formData.reason || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-2.5 text-slate-200 h-24 outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Explain the decision for internal records..."
                required
              />
            </div>

            {/* Public Message */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Public Message (Citizen Feedback)
              </label>

              <textarea
                name="public_message"
                value={formData.public_message || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    public_message: e.target.value,
                  }))
                }
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-2.5 text-slate-200 h-20 outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="What should the citizen see in their app?"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#1e1e1e]/40 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                formData.decision_type === "APPROVED"
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : formData.decision_type === "BLOCKED"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-blue-600 hover:bg-blue-500"
              } ${adminDecisionTaskLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {adminDecisionTaskLoading ? "Loading..." : "Submit"} 
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DecisionModal;