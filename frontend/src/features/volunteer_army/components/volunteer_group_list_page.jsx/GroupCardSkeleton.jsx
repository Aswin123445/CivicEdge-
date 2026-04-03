// components/volunteer/skeletons/GroupCardSkeleton.jsx

const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

const GroupCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
    {/* Header row: title + badge */}
    <div className="flex justify-between items-start gap-3">
      <Pulse className="h-6 w-3/4" />
      <Pulse className="h-5 w-20 rounded-full flex-shrink-0" />
    </div>

    {/* Description lines */}
    <div className="space-y-2 flex-grow">
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-5/6" />
      <Pulse className="h-3 w-4/6" />
    </div>

    {/* Footer row */}
    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
      <Pulse className="h-4 w-28" />
      <Pulse className="h-4 w-20" />
    </div>
  </div>
);

/**
 * Renders N skeleton cards in the same grid as the real list.
 * @param {number} count - number of skeletons to show (default 6)
 */
export const GroupGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <GroupCardSkeleton key={i} />
    ))}
  </div>
);

export default GroupCardSkeleton;
