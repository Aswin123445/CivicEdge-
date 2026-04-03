// components/admin/memberships/MembershipRow.jsx
import { Users, Clock, Paperclip, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import MembershipTypeBadge from "./MembershipTypeBadge";
import { useNavigate } from "react-router-dom";

const formatRelativeTime = (dateString) => {
  if (!dateString) return "—";
  const diffMs    = new Date() - new Date(dateString);
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1)  return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

/**
 * @param {object}   req           - membership request object
 * @param {function} onApprove     - (id) => void
 * @param {function} onReject      - (req) => void
 * @param {boolean}  isProcessing  - spinner state for this row
 */
const MembershipRow = ({ req, onApprove, onReject, isProcessing }) => {
  const navigate = useNavigate();
  if (!req) return null;

  return (
    <tr onClick={()=>{navigate(`/admin/volunteer/memberships/${req.id}`)}} className="hover:bg-slate-800/40 transition-colors cursor-pointer">
      {/* Membership ID */}
      <td className="px-6 py-4">
        <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded">
          {req.reference_id}
        </span>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div
          className="text-sm font-medium text-slate-100 truncate max-w-[180px]"
          title={req.user_email}
        >
          {req.user_email ?? "—"}
        </div>
      </td>

      {/* Group */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {req.group_name ?? "—"}
        </div>
      </td>

      {/* Evidence */}
      <td className="px-6 py-4 text-center">
        {(req.evidence_count ?? 0) > 0 ? (
          <div className="flex items-center justify-center gap-1.5 text-blue-400 font-medium text-sm">
            <Paperclip className="w-3.5 h-3.5" />
            {req.evidence_count}
          </div>
        ) : (
          <span className="text-slate-600 text-xs">No evidence</span>
        )}
      </td>

      {/* Requested */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          {formatRelativeTime(req.created_at)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={isProcessing}
            onClick={() => onApprove?.(req.id)}
            className="flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            {isProcessing
              ? <Loader2 className="w-3 h-3 animate-spin" />
              : <CheckCircle2 className="w-3.5 h-3.5" />
            }
            Approve
          </button>
          <button
            disabled={isProcessing}
            onClick={() => onReject?.(req)}
            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MembershipRow;
