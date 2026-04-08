import { Inbox, Loader2 } from "lucide-react";
import PollListCard from "./PollListCard";
import { PollGridSkeleton } from "./PollListSkeleton";

/* ─── Empty State ────────────────────────────────────────────────────────── */

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 py-20 text-center">
    <div className="rounded-full bg-slate-50 p-4">
      <Inbox className="h-10 w-10 text-slate-300" />
    </div>
    <h3 className="mt-4 text-lg font-bold text-slate-900">No polls found</h3>
    <p className="mt-2 text-slate-500">
      Try adjusting your search terms or filters to find what you're looking
      for.
    </p>
  </div>
);

/* ─── Load More Button ───────────────────────────────────────────────────── */

const LoadMoreButton = ({ isLoadingMore, onClick }) => (
  <div className="mt-12 flex justify-center border-t border-slate-100 pt-10">
    <button
      onClick={onClick}
      disabled={isLoadingMore}
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-800 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50"
    >
      {isLoadingMore ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </>
      ) : (
        "Load More Polls"
      )}
    </button>
  </div>
);

/* ─── PollGrid ───────────────────────────────────────────────────────────── */

/**
 * PollGrid
 *
 * Props:
 *   polls          Poll[] | null
 *   visibleCount   number
 *   isLoading      boolean
 *   isLoadingMore  boolean
 *   onVote         (poll) => void
 *   onLoadMore     () => void
 *   onClearFilters () => void
 */
const PollGrid = ({
  polls = null,
  isLoading = false,
  onVote,
}) => {
  if (isLoading) return <PollGridSkeleton count={4} />;
  return (
    <section>
      {polls.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {polls.map((poll) => (
            <PollListCard
              key={poll?.id ?? Math.random()}
              poll={poll}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PollGrid;
