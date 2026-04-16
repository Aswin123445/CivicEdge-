import React from "react";

/**
 * PostCardSkeleton
 * Pulse skeleton that mirrors PostCard layout.
 * Uses gray-600/50 (slate-600 at 50% opacity) for skeleton blocks —
 * subtle on white/light backgrounds, no harsh flash.
 *
 * Props:
 *   hasImage {boolean} - Whether to include the image skeleton block
 */
const PostCardSkeleton = ({ hasImage = false }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <div className="flex flex-col gap-4 animate-pulse">
      {hasImage && (
        <div className="w-full h-48 rounded-lg bg-slate-600/20" />
      )}

      <div className="space-y-3">
        {/* Category + date row */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-24 rounded bg-slate-600/25" />
          <div className="h-4 w-16 rounded bg-slate-600/20" />
        </div>

        {/* Title lines */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-slate-600/25" />
          <div className="h-5 w-3/4 rounded bg-slate-600/20" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * PostFeedSkeleton
 * Renders `count` skeleton cards (alternates image presence for variety).
 *
 * Props:
 *   count {number} - How many skeleton cards to show (default 3)
 */
export const PostFeedSkeleton = ({ count = 3 }) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} hasImage={i === 0} />
    ))}
  </div>
);

export default PostCardSkeleton;
