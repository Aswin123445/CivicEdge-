import { CheckCircle2, ChevronRight, Users } from "lucide-react";

/**
 * Formats an ISO date string to "Apr 5, 2026" style.
 * Returns null if invalid.
 */
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * VoteCard
 *
 * Props:
 *   vote {
 *     id, reference_id, question,
 *     selected_option: { option_id, label },
 *     voted_at, total_votes, is_expired
 *   }
 *   onViewPoll (vote) => void
 */
const VoteCard = ({ vote = null, onViewPoll }) => {
  if (!vote) return null;

  const {
    reference_id = "",
    question = "",
    selected_option = null,
    voted_at = null,
    total_vote = 0,
    is_expired = false,
    status = null
  } = vote;
  const isActive = !is_expired && status === "active";
  const votedAtFormatted = formatDate(voted_at);
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
      <div>
        {/* Badge + reference */}
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {isActive ? "Active" : "Closed"}
          </span>

          {reference_id && (
            <span className="text-[10px] font-bold text-slate-300">
              #{reference_id}
            </span>
          )}
        </div>

        {/* Question */}
        {question && (
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
            {question}
          </h3>
        )}

        {/* Selected option */}
        {selected_option?.label && (
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Your Choice
            </p>
            <p className="text-sm font-extrabold text-blue-700">
              {selected_option.label}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-b border-slate-50 pb-4">
          {votedAtFormatted && (
            <span className="flex items-center gap-1.5 italic">
              <CheckCircle2 size={14} className="text-blue-500" />
              Voted on {votedAtFormatted}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users size={14} />
            {Number(total_vote).toLocaleString()} Total Votes
          </span>
        </div>

        <button
          onClick={() => onViewPoll?.(vote)}
          className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            isActive
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-200 text-slate-800 hover:bg-slate-300"
          }`}
        >
          {isActive ? "View Live Poll": "View Final Results" }
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
