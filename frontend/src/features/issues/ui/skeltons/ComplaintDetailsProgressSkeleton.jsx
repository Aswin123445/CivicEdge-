import React from "react";

const ComplaintDetailsProgressSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-20 animate-pulse">
      {/* 1️⃣ Header Skeleton */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-8 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-4 w-40 bg-slate-200 rounded" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 w-64 bg-slate-200 rounded" />
              <div className="h-4 w-80 bg-slate-100 rounded" />
            </div>

            <div className="h-10 w-32 bg-blue-100 rounded-full" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-8 space-y-6">

        {/* 2️⃣ Reassurance Skeleton */}
        <section className="bg-white rounded-[24px] p-8 border border-blue-100 shadow-sm">
          <div className="space-y-4">
            <div className="h-3 w-32 bg-blue-200 rounded" />
            <div className="h-6 w-full bg-slate-200 rounded" />
            <div className="h-6 w-5/6 bg-slate-200 rounded" />
          </div>
        </section>

        {/* 3️⃣ Admin Decision Skeleton */}
        <section className="bg-white rounded-[24px] p-8 space-y-4">
          <div className="h-3 w-40 bg-slate-200 rounded" />
          <div className="h-7 w-2/3 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 rounded" />
          <div className="h-3 w-48 bg-slate-200 rounded pt-4" />
        </section>

        {/* 4️⃣ Timeline Skeleton */}
        <section className="py-8">
          <div className="h-3 w-40 bg-slate-200 rounded mb-8" />
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-300 rounded-full border-4 border-[#F8FAFF]" />
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-slate-200 rounded" />
                  <div className="h-3 w-32 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5️⃣ Original Submission Skeleton */}
        <section className="bg-white rounded-[24px] p-8 border border-slate-200 space-y-6">
          <div className="h-3 w-48 bg-slate-200 rounded" />

          <div className="space-y-3">
            <div className="h-4 w-24 bg-slate-100 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
          </div>

          <div className="h-4 w-64 bg-slate-100 rounded" />

          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-slate-100 rounded-lg border border-slate-200"
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ComplaintDetailsProgressSkeleton;