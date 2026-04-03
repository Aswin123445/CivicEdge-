// components/admin/attendance/RejectAttendanceModal.jsx
import { AlertTriangle } from "lucide-react";

/**
 * @param {object}   target    - the attendance row being rejected
 * @param {function} onConfirm
 * @param {function} onClose
 */
const RejectAttendanceModal = ({ target, onConfirm, onClose }) => {
  if (!target) return null;
  console.log("Rejecting attendance:", target); // Debug log
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-700 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={32} />
        </div>

        <h3 className="text-xl font-black italic mb-2 text-slate-100">
          Reject Attendance?
        </h3>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Are you sure you want to reject this submission
          {target.user_name ? ` from ${target.user_name}` : ""}? The user will
          be notified that their attendance was invalid.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-slate-400 font-bold text-xs uppercase hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(target?.id)}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black text-xs uppercase transition-all shadow-lg shadow-red-500/20"
          >
            Reject Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectAttendanceModal;
