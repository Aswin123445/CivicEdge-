const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const VotingDistributionSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-full">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <SkeletonBlock className="w-5 h-5 rounded" />
        <SkeletonBlock className="h-3 w-40" />
      </div>

      {/* Distribution Items */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="space-y-3">
            
            {/* Top Row */}
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <SkeletonBlock className="h-3 w-32" />
                <SkeletonBlock className="h-2 w-20" />
              </div>
              <SkeletonBlock className="h-4 w-12" />
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <SkeletonBlock className="h-full w-2/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingDistributionSkeleton;