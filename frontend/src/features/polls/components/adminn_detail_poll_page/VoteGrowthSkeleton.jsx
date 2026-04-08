const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const VoteGrowthSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-full">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <SkeletonBlock className="w-5 h-5 rounded" />
        <SkeletonBlock className="h-3 w-28" />
      </div>

      {/* Timeline Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-800"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <SkeletonBlock className="w-8 h-8 rounded-lg" />
              <SkeletonBlock className="h-3 w-24" />
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-4 w-10" />
              <SkeletonBlock className="h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteGrowthSkeleton;