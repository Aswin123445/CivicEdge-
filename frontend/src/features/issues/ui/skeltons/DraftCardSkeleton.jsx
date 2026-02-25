import React from "react";

const DraftCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="
            bg-white rounded-2xl border border-slate-200
            p-6 flex flex-col md:flex-row gap-6
            animate-pulse
          "
        >
          {/* ───────────────
             Basic Info Skeleton
          ─────────────── */}
          <div className="flex-1 min-w-0">
            {/* Category + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-lg bg-slate-200" />
              <div className="h-4 w-48 bg-slate-200 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-3/4 bg-slate-200 rounded" />
            </div>
          </div>

          {/* ───────────────
             Progress Skeleton
          ─────────────── */}
          <div className="md:w-32 shrink-0">
            <div className="flex justify-between mb-2">
              <div className="h-2 w-16 bg-slate-200 rounded" />
              <div className="h-2 w-6 bg-slate-200 rounded" />
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full" />
            <div className="h-2 w-20 bg-slate-200 rounded mt-2" />
          </div>

          {/* ───────────────
             Actions Skeleton
          ─────────────── */}
          <div className="flex items-center gap-2 pt-4 md:pt-0">
            <div className="w-10 h-10 bg-slate-200 rounded-xl" />
            <div className="w-28 h-10 bg-slate-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftCardSkeleton;