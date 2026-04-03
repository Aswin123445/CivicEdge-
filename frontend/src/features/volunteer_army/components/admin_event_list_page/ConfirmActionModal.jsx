// components/admin/events/ConfirmActionModal.jsx
import { Send, XCircle } from "lucide-react";

/**
 * @param {object}   modal       - { isOpen, type: "publish"|"cancel", eventTitle }
 * @param {function} onClose     - () => void
 * @param {function} onConfirm   - (type: string) => void
 */
const ConfirmActionModal = ({ modal, onClose, onConfirm }) => {
  if (!modal?.isOpen) return null;

  const isCancel = modal.type === "cancel";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center  bg-[#1e1e1e]/20 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-6">

        {/* Icon + text */}
        <div className="space-y-2 text-center">
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            isCancel ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
          }`}>
            {isCancel ? <XCircle size={24} /> : <Send size={24} />}
          </div>

          <h3 className="text-lg font-black text-slate-100">
            {isCancel ? "Cancel Event" : "Publish Event"}
          </h3>

          <p className="text-slate-400 text-sm font-medium">
            {isCancel
              ? `Are you sure you want to cancel "${modal.eventTitle ?? "this event"}"? This action cannot be undone.`
              : `Are you sure you want to publish "${modal.eventTitle ?? "this event"}"? Members will be notified.`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => { onConfirm?.(modal.type); onClose?.(); }}
            className={`flex-1 px-4 py-3 rounded-xl font-black transition-all active:scale-95 ${
              isCancel
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            Confirm {isCancel ? "Cancellation" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
