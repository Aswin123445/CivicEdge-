import { ExternalLink, MoreHorizontal, Users, Calendar } from "lucide-react";

/**
 * Formats ISO date string to "Apr 1, 2026".
 * Returns "—" if invalid.
 */
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Returns countdown text for active polls; "Closed" for others.
 */
const getExpiresText = (isActive, expiresAt) => {
  if (!isActive) return "Closed";
  if (!expiresAt) return "—";
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return "Closing Today";
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `Closes in ${days} day${days === 1 ? "" : "s"}`;
};

/**
 * PollRow
 *
 * Props:
 *   poll            { id, reference_id, question, status,
 *                     total_votes, created_at, expires_at }
 *   onActionClose   (poll) => void
 *   onViewDetail    (poll) => void
 */
const PollRow = ({ poll = null, onActionClose, onViewDetail }) => {
  if (!poll) return null;

  const {
    reference_id = "",
    question = "",
    status = "active",
    total_votes = 0,
    created_at = null,
    expires_at = null,
  } = poll;

  const isActive = status === "active";
  const votesDisplay =
    total_votes >= 1000
      ? `${(total_votes / 1000).toFixed(1)}k`
      : String(total_votes);

  return (
    <tr className="hover:bg-slate-800/50 transition-colors group cursor-default">
      {/* Question */}
      <td className="px-6 py-5 max-w-[400px]">
        <div className="flex flex-col">
          <span
            onClick={() => onViewDetail?.(poll)}
            className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
          >
            {question}
          </span>
          {reference_id && (
            <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">
              REF: {reference_id}
            </span>
          )}
        </div>
      </td>

      {/* Status badge */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            isActive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          <span
            className={`w-1 h-1 rounded-full ${
              isActive ? "bg-emerald-400 animate-pulse" : "bg-red-400"
            }`}
          />
          {status}
        </span>
      </td>

      {/* Votes */}
      <td className="px-6 py-5">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <Users size={14} className="text-slate-500" />
          {votesDisplay} votes
        </span>
      </td>

      {/* Expires */}
      <td className="px-6 py-5">
        <span
          className={`text-[11px] font-bold ${
            isActive ? "text-blue-400" : "text-slate-500"
          }`}
        >
          {getExpiresText(isActive, expires_at)}
        </span>
      </td>

      {/* Created */}
      <td className="px-6 py-5">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
          <Calendar size={14} />
          {formatDate(created_at)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onViewDetail?.(poll)}
            className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all shadow-sm"
            title="View Detail"
          >
            <ExternalLink size={14} />
          </button>

          {isActive ? (
            <button
              onClick={() => onActionClose?.(poll)}
              className="px-3 py-1.5 bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
            >
              Close Poll
            </button>
          ) : (
            <button
              disabled
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-not-allowed"
            >
              Archived
            </button>
          )}
        </div>

        {/* Idle icon */}
        <div className="group-hover:hidden flex items-center justify-end">
          <MoreHorizontal size={18} className="text-slate-600" />
        </div>
      </td>
    </tr>
  );
};

export default PollRow;
