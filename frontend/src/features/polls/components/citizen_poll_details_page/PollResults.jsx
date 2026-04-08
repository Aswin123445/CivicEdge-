import { CheckCircle2, AlertCircle } from "lucide-react";
import { PollResultsSkeleton } from "./PollDetailSkeleton";

/**
 * ResultBar - single option result row
 */
const ResultBar = ({ result = null, isUserChoice = false }) => {
  if (!result) return null;

  const { label = "", votes = 0, percent = 0 } = result;
let resultPercent = percent.toFixed(2);
// or 
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span
          className={`text-sm font-bold flex items-center gap-2 ${
            isUserChoice ? "text-blue-700" : "text-slate-700"
          }`}
        >
          {label}
          {isUserChoice && (
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md uppercase font-black tracking-tighter">
              Your Choice
            </span>
          )}
        </span>
        <span className="text-sm font-black text-slate-900">{resultPercent}%</span>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-out rounded-full ${
            isUserChoice ? "bg-blue-600" : "bg-slate-400"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {Number(votes).toLocaleString()} Votes
      </div>
    </div>
  );
};

/**
 * PollResults
 *
 * Props:
 *   results       { id, label, votes, percentage }[] | null
 *   totalVotes    number
 *   userChoice    number | null  (option id the user voted for)
 *   isLoading     boolean
 */
const PollResults = ({
  results = null,
  totalVotes = 0,
  userChoice = null,
  isLoading = false,
}) => {
  if (isLoading) return <PollResultsSkeleton count={results?.length ?? 3} />;
  const safeResults = results ?? [];
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Success header */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Your vote has been recorded
        </h2>
        <p className="text-slate-500 mt-2">
          You are part of{" "}
          <span className="text-slate-900 font-bold">
            {Number(totalVotes).toLocaleString()}
          </span>{" "}
          citizens contributing to this decision.
        </p>
      </div>

      {/* Result bars */}
      {safeResults.length > 0 && (
        <div className="space-y-6">
          {safeResults.map((result) => (
            <ResultBar
              key={result?.option_id}
              result={result}
              isUserChoice={userChoice === result?.option_id}
            />
          ))}
        </div>
      )}

      {/* Footer notice */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
          <AlertCircle size={18} className="text-slate-400 shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Results are updated in real-time. Final decision outcomes will be
            communicated via the{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              CivicEdge Transparency Portal
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PollResults;
