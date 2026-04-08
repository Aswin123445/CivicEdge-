/**
 * MyVotesSkeleton
 * All skeletons pulse bg-gray-600/50 as specified.
 *
 * Exports:
 *  - Sk                    → raw primitive
 *  - PageHeaderSkeleton    → header + stats bar
 *  - VoteCardSkeleton      → single vote card
 *  - VoteSectionSkeleton   → section title + grid of cards
 */

const base = "animate-pulse rounded-lg bg-gray-600/50";

export const Sk = ({ className = "" }) => (
  <div className={`${base} ${className}`} />
);

/* ─── Page Header + Stats Bar ─────────────────────────────────────────────── */

export const PageHeaderSkeleton = () => (
  <header className="bg-white border-b border-slate-200 pt-12 pb-8">
    <div className="max-w-5xl mx-auto px-6">
      {/* Title + subtitle */}
      <div className="space-y-3">
        <Sk className="h-9 w-36" />
        <Sk className="h-5 w-64 rounded" />
      </div>

      {/* Stats cards */}
      <div className="mt-8 flex flex-wrap gap-4">
        {/* Primary stat */}
        <div className="bg-blue-600/10 px-6 py-4 rounded-2xl flex flex-col gap-2">
          <Sk className="h-9 w-10" />
          <Sk className="h-3 w-36 rounded" />
        </div>
        {/* Secondary stats */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex flex-col gap-2"
          >
            <Sk className="h-9 w-8" />
            <Sk className="h-3 w-28 rounded" />
          </div>
        ))}
      </div>
    </div>
  </header>
);

/* ─── Single Vote Card ────────────────────────────────────────────────────── */

export const VoteCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
    {/* Top row: badge + ref */}
    <div className="flex justify-between items-start mb-4">
      <Sk className="h-5 w-16 rounded-lg" />
      <Sk className="h-3 w-20 rounded" />
    </div>

    {/* Question */}
    <div className="space-y-2 mb-3">
      <Sk className="h-5 w-full" />
      <Sk className="h-5 w-4/5" />
    </div>

    {/* Your choice box */}
    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 space-y-2">
      <Sk className="h-3 w-20 rounded" />
      <Sk className="h-4 w-3/5 rounded" />
    </div>

    {/* Footer meta */}
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <Sk className="h-3 w-32 rounded-full" />
        <Sk className="h-3 w-24 rounded-full" />
      </div>
      {/* CTA button */}
      <Sk className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

/* ─── Section (title + grid) ──────────────────────────────────────────────── */

export const VoteSectionSkeleton = ({ count = 2, withDivider = false }) => (
  <section>
    {withDivider && <div className="border-t border-slate-200 mb-10" />}

    {/* Section header */}
    <div className="flex items-center gap-3 mb-6">
      <Sk className="w-2 h-2 rounded-full" />
      <Sk className="h-5 w-40 rounded" />
    </div>

    {/* Cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <VoteCardSkeleton key={i} />
      ))}
    </div>
  </section>
);
