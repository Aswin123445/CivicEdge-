const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const AdminDetailsHeaderSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] text-slate-100 font-sans pb-20">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#1e1e1e] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          
          {/* Back Button */}
          <div className="mb-4">
            <SkeletonBlock className="h-4 w-40" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* LEFT */}
            <div className="flex-1 space-y-3">
              
              {/* Status + Ref */}
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-5 w-20 rounded-full" />
                <SkeletonBlock className="h-3 w-24" />
              </div>

              {/* Title */}
              <SkeletonBlock className="h-6 w-full md:w-5/6" />
              <SkeletonBlock className="h-6 w-3/4 md:w-2/3" />

              {/* Meta */}
              <div className="flex items-center gap-4">
                <SkeletonBlock className="h-3 w-32" />
                <SkeletonBlock className="h-3 w-28" />
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-10 w-28 rounded-xl" />
              <SkeletonBlock className="h-10 w-10 rounded-xl" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 mt-8">
        
        {/* TABS */}
        <div className="flex gap-8 border-b border-slate-800 mb-8">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-24" />
        </div>

        {/* OPTIONAL: content placeholder */}
        <div className="space-y-4">
          <SkeletonBlock className="h-40 w-full rounded-xl" />
        </div>
      </main>
    </div>
  );
};

export default AdminDetailsHeaderSkeleton;