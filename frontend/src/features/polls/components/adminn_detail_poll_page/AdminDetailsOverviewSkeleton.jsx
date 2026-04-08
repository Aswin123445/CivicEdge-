const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const AdminDetailsOverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT SIDE */}
      <div className="col-span-12 lg:col-span-7 space-y-8">
        
        {/* Context Section */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6 space-y-4">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
          <SkeletonBlock className="h-3 w-4/6" />
        </section>

        {/* Results Section */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6 space-y-6">
          <SkeletonBlock className="h-4 w-48" />

          {[1, 2, 3].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <SkeletonBlock className="h-3 w-32" />
                <SkeletonBlock className="h-3 w-20" />
              </div>
              <SkeletonBlock className="h-3 w-full rounded-full" />
            </div>
          ))}
        </section>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-12 lg:col-span-5 space-y-8">
        
        {/* Did You Know */}
        <section className="bg-[#1e1e1e] border border-blue-500/20 rounded-2xl p-6 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
        </section>

        {/* Image Skeleton */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-2">
          <SkeletonBlock className="w-full h-48 rounded-xl" />
        </section>

        {/* Meta Stats */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6 space-y-4">
          <SkeletonBlock className="h-3 w-24" />

          {[1, 2].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonBlock className="w-8 h-8 rounded-lg" />
              <div className="space-y-2 w-full">
                <SkeletonBlock className="h-2 w-20" />
                <SkeletonBlock className="h-3 w-32" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminDetailsOverviewSkeleton;