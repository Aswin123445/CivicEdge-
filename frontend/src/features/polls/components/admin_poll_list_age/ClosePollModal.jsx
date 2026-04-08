import { AlertCircle, X } from "lucide-react";

/**
 * ClosePollModal
 *
 * Props:
 *   poll       { question } | null
 *   isOpen     boolean
 *   onConfirm  () => void
 *   onCancel   () => void
 */
const ClosePollModal = ({
  poll = null,
  isOpen = false,
  onConfirm,
  onCancel,
  closePollLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1e1e1e]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-red-500/10 p-3 rounded-xl">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <h3 className="text-xl font-bold text-slate-100 mb-2">
          Close this poll?
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Are you sure you want to close{" "}
          {poll?.question ? (
            <>
              <span className="text-slate-100 font-bold">
                "{poll.question}"
              </span>
              ?{" "}
            </>
          ) : (
            "this poll? "
          )}
          This will immediately stop new participants from voting.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-900/20"
          >
            {closePollLoading ? "Closing..." : "Confirm Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClosePollModal;
