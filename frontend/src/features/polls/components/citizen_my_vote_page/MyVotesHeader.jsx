import { PageHeaderSkeleton } from "./MyVotesSkeleton";

/**
 * MyVotesHeader
 *
 * Props:
 *   totalCount    number | null
 *   activeCount   number | null
 *   closedCount   number | null
 *   isLoading     boolean
 */
const MyVotesHeader = ({
  totalCount = null,
  activeCount = null,
  closedCount = null,
  isLoading = false,
}) => {
  if (isLoading) return <PageHeaderSkeleton />;

  return (
    <header className="bg-white border-b border-slate-200 pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">My Votes</h1>
        <p className="text-slate-500 mt-2 text-lg">
          Track your participation in community decisions
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {/* Primary stat */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-md shadow-blue-100 flex flex-col">
            <span className="text-3xl font-black">{totalCount ?? 0}</span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              Decisions Participated
            </span>
          </div>

          {/* Active */}
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex flex-col">
            <span className="text-3xl font-black text-slate-900">
              {activeCount ?? 0}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Polls
            </span>
          </div>

          {/* Closed */}
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex flex-col">
            <span className="text-3xl font-black text-slate-900">
              {closedCount ?? 0}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Closed Decisions
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyVotesHeader;
