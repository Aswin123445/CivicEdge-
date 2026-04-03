// components/admin/attendance/AttendanceRow.jsx
import { Clock, Eye, Camera, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

// ─── Helpers ──────────────────────────────────────────
const formatRelativeTime = (dateStr) => {
  if (!dateStr) return "Not submitted";
  const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60));
  if (diff < 60)   return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return new Date(dateStr).toLocaleDateString();
};

const getInitial = (name) => (name ?? "?").charAt(0).toUpperCase();

// ─── Component ────────────────────────────────────────
/**
 * @param {object}   row          - attendance record
 * @param {function} onPreview    - (imageUrl: string) => void
 * @param {function} onVerify     - (id) => void
 * @param {function} onReject     - (row) => void
 * @param {boolean}  isProcessing
 */
const AttendanceRow = ({ row, onPreview, onVerify, onReject, isProcessing }) => {
  if (!row) return null;

  return (
    <tr className="hover:bg-slate-800/40 transition-colors cursor-pointer ">

      {/* Participant */}
      <td className="px-6 py-4 ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700 font-bold text-xs shrink-0 ">
            {getInitial(row.user_email)}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-200">
              {row.user_email ?? "—"}
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">
              {row.membership_reference_id ?? "—"}
            </div>
          </div>
        </div>
      </td>

      {/* Submitted time */}
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Clock size={12} />
          {formatRelativeTime(row.attendance_submitted_at)}
        </div>
      </td>
          {/* Selfie thumbnail */}
      <td className="px-6 py-4">
        <div className="flex justify-center">
          {row.attendance_evidence_url ? (
            <div
              onClick={() => onPreview?.(row.attendance_evidence_url)}
              className="relative w-12 h-12 rounded-full border-2 border-slate-700 overflow-hidden cursor-pointer hover:border-blue-500 transition-all group/img"
            >
              <img
                src={row.attendance_evidence_url}
                className="w-full h-full object-cover"
                alt="Selfie evidence"
              />
              <div className="absolute inset-0 bg-blue-500/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                <Eye size={16} className="text-white" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-[10px] text-slate-600 gap-0.5">
              <Camera size={14} />
              <span>None</span>
            </div>
          )}
        </div>
      </td>
      {/* event */}
      <td className="px-6 py-4 text-sm text-slate-400 font-medium items-center text-center">
        {row.event_title ?? "—"}
      </td>


      {/* Actions */}
      <td className="px-6 py-4 text-right items-center justify-end">
        {row.status === "ATTENDANCE_SUBMITTED" ? (
          <div className="flex justify-end gap-2">
            <button
              disabled={isProcessing}
              onClick={() => onVerify?.(row.id)}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {isProcessing
                ? <Loader2 size={12} className="animate-spin" />
                : <CheckCircle2 size={12} />
              }
              Verify
            </button>
            <button
              disabled={isProcessing}
              onClick={() => onReject?.(row)}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <XCircle size={12} />
              Reject
            </button>
          </div>
        ) : (
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">
            —
          </span>
        )}
      </td>
    </tr>
  );
};

export default AttendanceRow;
