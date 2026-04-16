import React from "react";

// Shared pulse block helper
const Block = ({ className }) => (
  <div className={`rounded bg-gray-700/[0.12] animate-pulse ${className}`} />
);

/**
 * PostDetailSkeleton
 * Mimics the full post section: header, body paragraphs, media grid, reaction bar.
 */
export const PostDetailSkeleton = () => (
  <section className="space-y-6">
    {/* Back button */}
    <Block className="h-4 w-36" />

    {/* Category badge + title + date */}
    <div className="space-y-3">
      <Block className="h-5 w-24 rounded-full" />
      <Block className="h-8 w-full" />
      <Block className="h-8 w-4/5" />
      <Block className="h-4 w-40 mt-1" />
    </div>

    {/* Body paragraphs */}
    <div className="space-y-2.5">
      {[1, 0.95, 0.9, 0.75, 0.85].map((w, i) => (
        <Block key={i} className="h-4" style={{ width: `${w * 100}%` }} />
      ))}
    </div>

    {/* Media grid — two cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Block className="h-64 rounded-xl" />
      <Block className="h-64 rounded-xl" />
    </div>

    {/* Reaction bar */}
    <div className="flex gap-2 py-4 border-y border-slate-100">
      <Block className="h-9 w-24 rounded-full" />
      <Block className="h-9 w-28 rounded-full" />
      <Block className="h-9 w-28 rounded-full" />
    </div>
  </section>
);

/**
 * CommentItemSkeleton
 * Mirrors the CommentItem layout: avatar + name/date row + two text lines.
 */
export const CommentItemSkeleton = () => (
  <div className="flex gap-4 py-4 first:pt-0">
    {/* Avatar */}
    <div className="w-9 h-9 rounded-full bg-gray-700/[0.12] animate-pulse shrink-0" />

    <div className="flex-1 space-y-2">
      {/* Name + date */}
      <div className="flex items-center justify-between gap-2">
        <Block className="h-3.5 w-28" />
        <Block className="h-3 w-16" />
      </div>
      {/* Comment lines */}
      <Block className="h-3.5 w-full" />
      <Block className="h-3.5 w-3/4" />
    </div>
  </div>
);

/**
 * CommentListSkeleton
 * Props:
 *   count {number} - number of skeleton comment rows (default 3)
 */
export const CommentListSkeleton = ({ count = 3 }) => (
  <div className="space-y-0 divide-y divide-slate-100">
    {Array.from({ length: count }).map((_, i) => (
      <CommentItemSkeleton key={i} />
    ))}
  </div>
);

/**
 * CommentCountSkeleton — inline count placeholder next to section title
 */
export const CommentCountSkeleton = () => (
  <Block className="h-4 w-10 inline-block align-middle ml-1" />
);
