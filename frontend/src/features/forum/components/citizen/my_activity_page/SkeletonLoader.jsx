// Single shimmer card placeholder
const SkeletonCard = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
    {/* Top row: icon + label + badge */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-slate-200 rounded-md" />
        <div className="w-36 h-2.5 bg-slate-200 rounded" />
      </div>
      <div className="w-16 h-4 bg-slate-200 rounded-full" />
    </div>

    {/* Title lines */}
    <div className="w-full h-3 bg-slate-200 rounded mb-2" />
    <div className="w-3/5 h-3 bg-slate-200 rounded mb-4" />

    {/* Footer */}
    <div className="flex justify-between items-center border-t border-slate-100 pt-3">
      <div className="w-20 h-2.5 bg-slate-200 rounded" />
      <div className="w-4 h-4 bg-slate-200 rounded" />
    </div>
  </div>
);

// Grid of 4 skeleton cards shown during initial load
const SkeletonGrid = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonGrid };
