/**
 * PollListSkeleton
 * All skeletons pulse from bg-gray-700/50 as specified.
 * Exports: SkeletonBase, PollCardSkeleton, SearchBarSkeleton, PollGridSkeleton
 */

const base = "animate-pulse rounded-lg bg-gray-600/40";

/* ─── Primitives ─────────────────────────────────────────────────────────── */

export const SkeletonBase = ({ className = "" }) => (
  <div className={`${base} ${className}`} />
);

/* ─── Search + Sort Bar Skeleton ─────────────────────────────────────────── */

export const SearchBarSkeleton = () => (
  <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
    <SkeletonBase className="h-11 w-full sm:max-w-md rounded-xl" />
    <SkeletonBase className="h-11 w-full sm:w-48 rounded-xl" />
  </div>
);

/* ─── Single Poll Card Skeleton ──────────────────────────────────────────── */

export const PollCardSkeleton = () => (
  <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 min-h-[280px]">
    <div className="space-y-4">
      {/* Badge row */}
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-6 w-32 rounded-full" />
        <SkeletonBase className="h-4 w-20 rounded" />
      </div>
      {/* Title */}
      <div className="space-y-2">
        <SkeletonBase className="h-5 w-full" />
        <SkeletonBase className="h-5 w-4/5" />
      </div>
      {/* Context */}
      <div className="space-y-1.5">
        <SkeletonBase className="h-3.5 w-full" />
        <SkeletonBase className="h-3.5 w-5/6" />
      </div>
    </div>

    <div className="mt-8 space-y-4">
      {/* Meta row */}
      <div className="flex items-center gap-4 border-t border-slate-50 pt-5">
        <SkeletonBase className="h-4 w-24 rounded-full" />
        <SkeletonBase className="h-4 w-28 rounded-full" />
      </div>
      {/* CTA */}
      <SkeletonBase className="h-11 w-full rounded-xl" />
    </div>
  </div>
);

/* ─── Full Grid Skeleton (n cards) ───────────────────────────────────────── */

export const PollGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    {Array.from({ length: count }).map((_, i) => (
      <PollCardSkeleton key={i} />
    ))}
  </div>
);
