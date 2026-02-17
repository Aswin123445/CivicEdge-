export default function AdminDashboardSkeleton() {
  return (
    <main className="flex-1 px-6 py-6 bg-[#1e1e1e] text-slate-100 overflow-y-auto animate-pulse">
      
      {/* ============================= */}
      {/* SYSTEM SNAPSHOT */}
      {/* ============================= */}
      <section className="mb-8">
        <div className="h-5 w-40 bg-neutral-700 rounded mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-neutral-800 border border-neutral-700"
            />
          ))}
        </div>
      </section>

      {/* ============================= */}
      {/* ATTENTION + ACTIVITY */}
      {/* ============================= */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        
        {/* ATTENTION REQUIRED */}
        <section className="col-span-12 xl:col-span-7">
          <div className="h-5 w-48 bg-neutral-700 rounded mb-4" />

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-lg bg-neutral-800 border border-neutral-700"
              />
            ))}
          </div>
        </section>

        {/* LIVE ACTIVITY */}
        <section className="col-span-12 xl:col-span-5">
          <div className="h-5 w-32 bg-neutral-700 rounded mb-4" />

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-3/4 bg-neutral-700 rounded" />
                <div className="h-3 w-12 bg-neutral-700 rounded" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============================= */}
      {/* PERFORMANCE & TRENDS */}
      {/* ============================= */}
      <section>
        <div className="h-5 w-56 bg-neutral-700 rounded mb-4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl bg-neutral-800 border border-neutral-700"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
