import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import PollRow from "./PollRow";
import Skeleton from "./Skeleton";

/* ─── Table Row Skeleton ─────────────────────────────────────────────────── */

const PollRowSkeleton = () => (
  <tr className="border-b border-slate-800">
    {/* Question col */}
    <td className="px-6 py-5 max-w-[400px]">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-4/5 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </td>
    {/* Status */}
    <td className="px-6 py-5">
      <Skeleton className="h-6 w-16 rounded-full" />
    </td>
    {/* Votes */}
    <td className="px-6 py-5">
      <Skeleton className="h-4 w-20 rounded" />
    </td>
    {/* Expires */}
    <td className="px-6 py-5">
      <Skeleton className="h-4 w-24 rounded" />
    </td>
    {/* Created */}
    <td className="px-6 py-5">
      <Skeleton className="h-4 w-24 rounded" />
    </td>
    {/* Actions */}
    <td className="px-6 py-5 text-right">
      <Skeleton className="h-6 w-6 rounded-lg ml-auto" />
    </td>
  </tr>
);

/* ─── Empty State ────────────────────────────────────────────────────────── */

const TableEmptyState = () => (
  <tr>
    <td colSpan="6" className="py-20 text-center">
      <div className="flex flex-col items-center">
        <div className="bg-slate-800 p-4 rounded-full mb-4">
          <AlertCircle size={32} className="text-slate-600" />
        </div>
        <p className="text-slate-400 font-medium">
          No polls found matching your criteria
        </p>
      </div>
    </td>
  </tr>
);

/* ─── Pagination ─────────────────────────────────────────────────────────── */

const PollPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPrev,
  onNext,
  isLoading = false,
}) => (
  <div className="px-6 py-4 bg-[#1e1e1e]/50 border-t border-slate-800 flex items-center justify-between">
    {isLoading ? (
      <>
        <Skeleton className="h-4 w-24 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <Skeleton className="w-9 h-9 rounded-lg" />
        </div>
      </>
    ) : (
      <>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentPage <= 1}
            className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-500 disabled:cursor-not-allowed hover:enabled:bg-slate-700 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNext}
            disabled={currentPage >= totalPages}
            className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 disabled:cursor-not-allowed hover:enabled:bg-slate-700 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </>
    )}
  </div>
);

/* ─── PollTable ──────────────────────────────────────────────────────────── */

/**
 * PollTable
 *
 * Props:
 *   polls          Poll[] | null
 *   currentPage    number
 *   totalPages     number
 *   isLoading      boolean
 *   skeletonCount  number  (rows to show while loading)
 *   onActionClose  (poll) => void
 *   onViewDetail   (poll) => void
 *   onClearFilters () => void
 *   onPrevPage     () => void
 *   onNextPage     () => void
 */
const PollTable = ({
  polls = null,
  isLoading = false,
  skeletonCount = 5,
  onActionClose,
  onViewDetail,

}) => {
  const safePolls = polls ?? [];

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700">
              {["Question", "Status", "Votes", "Expires", "Created", "Actions"].map(
                (col, i) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 ${
                      i === 5 ? "text-right" : ""
                    }`}
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {isLoading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <PollRowSkeleton key={i} />
              ))
            ) : safePolls.length > 0 ? (
              safePolls.map((poll) => (
                <PollRow
                  key={poll?.id ?? Math.random()}
                  poll={poll}
                  onActionClose={onActionClose}
                  onViewDetail={onViewDetail}
                />
              ))
            ) : (
              <TableEmptyState  />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PollTable;
