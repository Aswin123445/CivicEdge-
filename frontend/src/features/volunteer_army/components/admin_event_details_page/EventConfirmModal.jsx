// components/admin/events/detail/EventConfirmModal.jsx
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * @param {object}   modal     - { isOpen, type: "publish"|"cancel" }
 * @param {function} onClose
 * @param {function} onConfirm - (type: string) => void
 */
const EventConfirmModal = ({ modal, onClose, onConfirm }) => {
  if (!modal?.isOpen) return null;

  const isCancel = modal.type === "cancel";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/90 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6">

        <div className="text-center space-y-3">
          <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${
            isCancel ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
          }`}>
            {isCancel
              ? <AlertTriangle size={28} />
              : <CheckCircle2 size={28} />
            }
          </div>

          <h3 className="text-xl font-black italic">
            Confirm {isCancel ? "Termination" : "Publication"}
          </h3>

          <p className="text-sm text-slate-400 font-medium">
            {isCancel
              ? "Are you sure you want to cancel this event? This action will notify all participants and cannot be undone."
              : "Ready to push this event to the public feed? This will enable registrations for all eligible citizens."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-700 transition-colors"
          >
            Nevermind
          </button>
          <button
            onClick={() => { onConfirm?.(modal.type); onClose?.(); }}
            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
              isCancel
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            Yes, Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventConfirmModal;
