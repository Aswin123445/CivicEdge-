/**
 * PollSkeleton
 * Shared pulse skeleton primitives. All pulse from bg-gray-700/20 → bg-gray-700/40.
 * Used by: HeroSkeleton, PollCardSkeleton, SidebarSkeleton
 */

const pulse = "animate-pulse rounded-lg bg-gray-700/20";

/* ─── Primitives ──────────────────────────────────────────────────────────── */

export const SkeletonLine = ({ className = "" }) => (
  <div className={`${pulse} h-3 ${className}`} />
);

export const SkeletonBlock = ({ className = "" }) => (
  <div className={`${pulse} ${className}`} />
);

/* ─── Hero Skeleton ────────────────────────────────────────────────────────── */

export const HeroSkeleton = () => (
  <section className="relative overflow-hidden bg-white border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-10 grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div className="space-y-5">
        <SkeletonBlock className="h-6 w-48 rounded-full" />
        <div className="space-y-3">
          <SkeletonLine className="h-10 w-4/5" />
          <SkeletonLine className="h-10 w-3/5" />
        </div>
        <div className="space-y-2 pt-1">
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-5/6" />
          <SkeletonLine className="w-4/6" />
        </div>
        <div className="flex gap-4 pt-2">
          <SkeletonBlock className="h-12 w-44 rounded-xl" />
          <SkeletonBlock className="h-12 w-36 rounded-xl" />
        </div>
        <div className="flex gap-6 pt-1">
          <SkeletonBlock className="h-4 w-32 rounded-full" />
          <SkeletonBlock className="h-4 w-28 rounded-full" />
        </div>
      </div>

      {/* Right – image area */}
      <div className="hidden lg:block">
        <SkeletonBlock className="w-full aspect-[4/3] rounded-[2rem]" />
      </div>
    </div>
  </section>
);

/* ─── Poll Card Skeleton ───────────────────────────────────────────────────── */

export const PollCardSkeleton = () => (
  <div className="bg-white border border-slate-200 p-5 rounded-[1.5rem] shadow-sm flex flex-col justify-between min-h-[280px]">
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-5 w-20 rounded-lg" />
        <SkeletonBlock className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2 pt-1">
        <SkeletonLine className="w-full h-4" />
        <SkeletonLine className="w-4/5 h-4" />
      </div>
      <div className="space-y-1.5">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-5/6" />
      </div>
    </div>
    <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-4 w-24 rounded-full" />
        <SkeletonBlock className="h-4 w-20 rounded-full" />
      </div>
      <SkeletonBlock className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

/* ─── Sidebar Skeleton ─────────────────────────────────────────────────────── */

export const SidebarSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-5">
    <SkeletonBlock className="w-12 h-12 rounded-2xl" />
    <SkeletonLine className="h-5 w-3/5" />
    <div className="space-y-2">
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-4/5" />
    </div>
    <div className="space-y-3 pt-2">
      <SkeletonBlock className="h-4 w-44 rounded-full" />
      <SkeletonBlock className="h-4 w-40 rounded-full" />
    </div>
  </div>
);
