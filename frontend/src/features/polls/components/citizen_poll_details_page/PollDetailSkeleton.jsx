/**
 * PollDetailSkeleton
 * All skeletons pulse bg-gray-600/50 as specified.
 *
 * Exports:
 *  - Sk            → raw primitive
 *  - PollHeaderSkeleton
 *  - PollContextSkeleton
 *  - PollDidYouKnowSkeleton
 *  - PollOptionsSkeleton
 *  - PollResultsSkeleton
 */

const base = "animate-pulse rounded-lg bg-gray-600/50";

export const Sk = ({ className = "" }) => (
  <div className={`${base} ${className}`} />
);

/* ─── Header ──────────────────────────────────────────────────────────────── */

export const PollHeaderSkeleton = () => (
  <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
    {/* Image placeholder */}
    <Sk className="h-48 w-full rounded-none" />

    <div className="p-8 space-y-5">
      {/* Badge row */}
      <div className="flex items-center gap-3">
        <Sk className="h-6 w-20 rounded-full" />
        <Sk className="h-4 w-28 rounded" />
      </div>
      {/* Title */}
      <div className="space-y-2">
        <Sk className="h-7 w-full" />
        <Sk className="h-7 w-5/6" />
        <Sk className="h-7 w-3/5" />
      </div>
      {/* Meta row */}
      <div className="flex items-center gap-6">
        <Sk className="h-4 w-24 rounded-full" />
        <Sk className="h-4 w-28 rounded-full" />
      </div>
    </div>
  </section>
);

/* ─── Context ─────────────────────────────────────────────────────────────── */

export const PollContextSkeleton = () => (
  <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-6 space-y-4">
    <Sk className="h-4 w-40 rounded" />
    <div className="space-y-2">
      <Sk className="h-5 w-full" />
      <Sk className="h-5 w-full" />
      <Sk className="h-5 w-5/6" />
      <Sk className="h-5 w-4/6" />
    </div>
  </section>
);

/* ─── Did You Know ────────────────────────────────────────────────────────── */

export const PollDidYouKnowSkeleton = () => (
  <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex gap-4 items-start">
    <Sk className="w-10 h-10 rounded-lg shrink-0" />
    <div className="flex-1 space-y-2">
      <Sk className="h-4 w-24 rounded" />
      <Sk className="h-3.5 w-full rounded" />
      <Sk className="h-3.5 w-4/5 rounded" />
    </div>
  </section>
);

/* ─── Options (voting state) ──────────────────────────────────────────────── */

export const PollOptionsSkeleton = ({ count = 3 }) => (
  <section className="space-y-6">
    <div className="space-y-1">
      <Sk className="h-6 w-44" />
      <Sk className="h-4 w-72 rounded" />
    </div>
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Sk key={i} className="h-20 w-full rounded-2xl" />
      ))}
    </div>
    <Sk className="h-14 w-full rounded-xl" />
  </section>
);

/* ─── Results (post-vote state) ───────────────────────────────────────────── */

export const PollResultsSkeleton = ({ count = 3 }) => (
  <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
    {/* Success header */}
    <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100">
      <Sk className="w-16 h-16 rounded-full" />
      <Sk className="h-6 w-52" />
      <Sk className="h-4 w-64 rounded" />
    </div>

    {/* Result bars */}
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Sk className="h-4 w-48 rounded" />
            <Sk className="h-4 w-10 rounded" />
          </div>
          <Sk className="h-3 w-full rounded-full" />
          <Sk className="h-3 w-20 rounded" />
        </div>
      ))}
    </div>

    {/* Footer notice */}
    <div className="pt-6 border-t border-slate-100">
      <Sk className="h-14 w-full rounded-xl" />
    </div>
  </section>
);
