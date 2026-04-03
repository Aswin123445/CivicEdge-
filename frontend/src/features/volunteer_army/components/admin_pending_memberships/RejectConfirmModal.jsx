import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const RejectConfirmModal = ({
  activeRequest,
  onClose,
  onConfirm,
  rejectMembershipLoading,
}) => {
  const [reason, setReason] = useState("");

  if (!activeRequest) return null;

  const handleConfirm = () => {
    onConfirm(reason); // 🔥 pass reason
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1e1e1e] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 text-red-400">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <h3 className="text-xl font-bold text-slate-100">
            Reject Request
          </h3>
        </div>

        {/* Message */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Are you sure you want to reject the membership request from{" "}
          <span className="text-slate-200 font-semibold">
            {activeRequest.email ?? "this user"}
          </span>
          ? This action cannot be undone.
        </p>

        {/* 🔥 Reason Input */}
        <div className="mb-6">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
            Reason (optional)
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            className="w-full bg-[#151515] border border-slate-700 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-red-500 transition-all resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={rejectMembershipLoading}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-red-500 hover:bg-red-600 text-white transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50"
          >
            {rejectMembershipLoading ? "Please wait..." : "Confirm Rejection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectConfirmModal;