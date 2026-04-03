// components/volunteer/skeletons/GroupDetailSkeleton.jsx

const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

// Header skeleton
const HeaderSkeleton = () => (
  <>
    {/* Back nav */}
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Pulse className="h-4 w-32" />
    </nav>

    {/* Title area */}
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-3">
      <div className="flex gap-2">
        <Pulse className="h-5 w-20 rounded-full" />
        <Pulse className="h-5 w-24 rounded-full" />
        <Pulse className="h-4 w-28 ml-2" />
      </div>
      <Pulse className="h-10 w-2/3" />
    </header>
  </>
);

// About + requirements cards skeleton
const AboutSkeleton = () => (
  <div className="space-y-6">
    {/* Description card */}
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-3">
      <Pulse className="h-6 w-40 mb-4" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-5/6" />
      <Pulse className="h-4 w-4/6" />
      <Pulse className="h-4 w-full mt-2" />
      <Pulse className="h-4 w-3/4" />
    </div>

    {/* Requirements card */}
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4">
      <Pulse className="h-6 w-32 mb-4" />
      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
        <Pulse className="w-9 h-9 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </div>
);

// Sidebar skeleton
const SidebarSkeleton = () => (
  <aside className="lg:sticky lg:top-8">
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Pulse className="w-5 h-5 rounded" />
        <Pulse className="h-5 w-40" />
      </div>

      {/* Info rows */}
      <div className="space-y-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Pulse className="h-4 w-20" />
            <Pulse className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="pt-6 border-t border-slate-100 space-y-4">
        <div className="flex items-start gap-3">
          <Pulse className="w-5 h-5 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-4/5" />
          </div>
        </div>
        {/* CTA button */}
        <Pulse className="h-12 w-full rounded-xl" />
      </div>
    </div>
  </aside>
);

// Full page skeleton
const GroupDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    <HeaderSkeleton />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <AboutSkeleton />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SidebarSkeleton />
        </div>
      </div>
    </main>
  </div>
);

export default GroupDetailSkeleton;
