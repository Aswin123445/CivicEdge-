import { useState } from "react";

const ApproveIssueModal = ({
  open,
  handleDecision,
  setIsApproveModalOpen,
}) => {
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validate = ({ reason, public_message }) => {
    const newErrors = {};

    //  Reason (required)
    if (!reason || !reason.trim()) {
      newErrors.reason = "Reason is required";
    } else if (reason.trim().length < 5) {
      newErrors.reason = "Minimum 5 characters required";
    }

    //  Public message (optional but validated if exists)
    if (public_message && public_message.trim()) {
      const msg = public_message.trim();

      if (msg.length < 3) {
        newErrors.public_message = "Too short";
      } else if (msg.length > 300) {
        newErrors.public_message = "Max 300 characters allowed";
      } else if (!/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(msg)) {
        newErrors.public_message = "Invalid characters detected";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      reason: e.target.reason.value,
      public_message: e.target.public_message.value,
    };

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleDecision({
      decision_type: "APPROVED",
      ...formData,
    });

    setErrors({});
    setIsApproveModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/10 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-2">Confirm Approval</h3>
        <p className="text-slate-400 text-sm mb-6">
          This will move the issue to the public roadmap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Reason (Internal) *
            </label>
            <textarea
              name="reason"
              className={`w-full bg-[#1e1e1e] border rounded-lg p-2.5 text-sm outline-none
                ${
                  errors.reason
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-700 focus:ring-emerald-500"
                }`}
              rows="3"
              placeholder="Explain the approval..."
            ></textarea>

            {errors.reason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reason}
              </p>
            )}
          </div>

          {/* Public Message */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Public Message (Optional)
            </label>
            <input
              name="public_message"
              className={`w-full bg-[#1e1e1e] border rounded-lg p-2.5 text-sm outline-none
                ${
                  errors.public_message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-700 focus:ring-emerald-500"
                }`}
              placeholder="Seen by the citizen"
            />

            {errors.public_message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.public_message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsApproveModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
            >
              Confirm Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveIssueModal;