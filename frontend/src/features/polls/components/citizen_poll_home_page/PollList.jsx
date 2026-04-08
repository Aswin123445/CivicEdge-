import { Vote, BarChart3, ArrowRight } from "lucide-react";
import PollCard from "./PollCard";
import { PollCardSkeleton } from "./PollSkeleton";

const PollList = ({
  polls = null,
  isLoading = false,
  activePolls = null,
  onViewDetails,
  onSeeAll,
}) => {
  const visiblePolls = polls?.slice(0, 2) ?? [];
  const remainingCount = (polls?.length ?? 0) - 2;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Active Polls
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Be the change you want to see in your neighborhood.
          </p>
        </div>

        {activePolls != null && (
          <div className="hidden sm:block text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              {activePolls} Open Polls
            </span>
          </div>
        )}
      </div>

      {/* Grid: 2 cards + see-more */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {isLoading ? (
          /* Skeleton state: show 2 card skeletons + placeholder for 3rd */
          <>
            <PollCardSkeleton />
            <PollCardSkeleton />
            <div className="hidden md:block">
              <PollCardSkeleton />
            </div>
          </>
        ) : (
          <>
            {visiblePolls.map((poll) => (
              <PollCard
                key={poll?.id ?? Math.random()}
                poll={poll}
                onViewDetails={onViewDetails}
              />
            ))}

            {/* "See More" card — always shown in 3rd slot */}
            <button
              onClick={onSeeAll}
              className="group relative overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-[1.5rem] hover:border-blue-400 hover:bg-blue-50/50 transition-all flex flex-col items-center justify-center text-center min-h-[280px]"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Vote className="w-6 h-6 text-blue-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Explore More
              </h3>
              <p className="text-xs text-slate-500 max-w-[150px] mb-5">
                {remainingCount > 0
                  ? `Join ${remainingCount} other active community discussions.`
                  : "Browse all community discussions."}
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                See All
                <div className="p-1 bg-blue-600 text-white rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={12} />
                </div>
              </div>

              <BarChart3
                size={80}
                className="absolute -bottom-2 -right-2 opacity-[0.03] text-slate-900 rotate-12"
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default PollList;
