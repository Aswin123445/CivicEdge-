// components/admin/memberships/detail/DecisionActionsPanel.jsx
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import Skeleton from "./Skeleton";
// ─── Confirm reject modal ──────────────────────────────
import { useState } from "react";
// ─── Skeleton ─────────────────────────────────────────
export const DecisionActionsPanelSkeleton = () => (
  <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 space-y-4">
    <Skeleton className="h-3 w-28 mb-4" />
    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);



const ConfirmModal = ({ onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason); // 🔥 pass reason
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1e1e1e] border border-slate-700 p-8 rounded-3xl max-w-sm w-full shadow-2xl">

        {/* Icon */}
        <div className="bg-red-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle className="text-red-500" size={24} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black tracking-tight italic text-slate-100 mb-2">
          Reject Membership?
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          Are you sure you want to reject this request? This action will notify
          the user and cannot be easily undone.
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
            rows={3}
            className="w-full bg-[#151515] border border-slate-700 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-red-500 transition-all resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all disabled:opacity-60"
          >
            {loading ? "Processing..." : "Confirm Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};


// ─── Main Component ────────────────────────────────────
/**
 * @param {string}   status         - membership.status
 * @param {boolean}  actionLoading  - mutation in flight
 * @param {boolean}  showModal      - reject modal open
 * @param {function} onApprove
 * @param {function} onOpenReject   - opens modal
 * @param {function} onCloseReject  - closes modal
 * @param {function} onConfirmReject
 */
const DecisionActionsPanel = ({
  membership,
  showModal,
  onApprove,
  onOpenReject,
  onCloseReject,
  onConfirmReject,
  approveMembershipLoading,
  rejectMembershipLoading
}) => {
  const {status} = membership || {};
  if (status !== "SUBMITTED") return null;

  return (
    <>
      <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
          Decision Actions
        </h3>

        <button
          disabled={approveMembershipLoading}
          onClick={onApprove}
          className="w-full py-4 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {approveMembershipLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <CheckCircle2 size={16} />
          )}
          Approve Membership
        </button>

        <button
          disabled={rejectMembershipLoading}
          onClick={onOpenReject}
          className="w-full py-4 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <XCircle size={16} />
          Reject Membership
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          onClose={onCloseReject}
          onConfirm={onConfirmReject}
          loading={rejectMembershipLoading}
        />
      )}
    </>
  );
};

export default DecisionActionsPanel;
