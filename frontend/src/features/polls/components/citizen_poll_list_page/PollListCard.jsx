import { CheckCircle2, Users, Clock, ArrowRight } from "lucide-react";
import getTimeRemaining from "../../utils";

/**
 * PollListCard
 *
 * Props:
 *   poll {
 *     id, reference_id, question, context,
 *     total_votes, has_voted, expires_at, status
 *   }
 *   onVote  (poll) => void
 */
const PollListCard = ({ poll = null, onVote }) => {
  if (!poll) return null;

  const {
    reference_id = "",
    question = "",
    context = "",
    total_votes = 0,
    has_voted = false,
    expires_at = null,
    status = null
  } = poll;
  const timeRemaining = getTimeRemaining(expires_at,status);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-md">
      <div>
        {/* Badge row */}
        <div className="mb-4 flex items-center justify-between">
          {has_voted ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> You have participated
            </span>
          ) : timeRemaining === "Poll Closed" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
              Poll Closed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              Live Poll
            </span>
          )}

          {reference_id && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {reference_id}
            </span>
          )}
        </div>

        {/* Question */}
        {question && (
          <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
            {question}
          </h3>
        )}

        {/* Context */}
        {context && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {context}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8">
        <div className="flex items-center gap-4 border-t border-slate-50 pt-5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="h-4 w-4 text-slate-400" />
            {Number(total_votes).toLocaleString()} votes
          </span>

          {timeRemaining && (
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-slate-400" />
              {timeRemaining}
            </span>
          )}
        </div>

        <button
          onClick={() => onVote?.(poll)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 active:bg-blue-800"
        >
          View & Vote <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PollListCard;
