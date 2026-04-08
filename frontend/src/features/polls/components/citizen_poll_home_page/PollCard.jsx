import { Clock, ArrowRight } from "lucide-react";

/**
 * PollCard
 *
 * Props:
 *   poll {
 *     id, category, question, description,
 *     votes, timeLeft, status, has_voted
 *   }
 *   onViewDetails (poll) => void
 */
const PollCard = ({ poll = null, onViewDetails }) => {
  if (!poll) return null;

  const {
    category = "General",
    question = "",
    description = "",
    votes = 0,
    timeLeft = "",
    status = "Live",
    has_voted = false,
  } = poll;

  const isClosingSoon = status === "Closing Soon";
  const isExpired = status === "Expired";

  return (
    <div className="group bg-white border border-slate-200 p-5 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
            {category}
          </span>

          <div className="flex items-center gap-1.5">
            {has_voted && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Voted
              </span>
            )}
            {isClosingSoon && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                Closing Soon
              </span>
            )}
            {isExpired && (
              <span className="text-[10px] font-bold text-amber-600 bg-red-50 px-2 py-0.5 rounded-full border border-amber-100">
                Closed
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {question}
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-slate-200 border border-white"
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              +{Number(votes).toLocaleString()}
            </span>
          </div>

          {timeLeft && (
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <Clock size={10} /> {timeLeft}
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails?.(poll)}
          className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl text-xs font-bold border border-slate-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center gap-2"
        >
          View Details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PollCard;
