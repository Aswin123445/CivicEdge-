import React from "react";
import Skeleton from "../../../../components/common/Skelton";



// PAGE SKELETON
// Move later to: components/admin/execution/AdminExecutionProofDetailSkeleton.jsx
const AdminProofDetailsSkelton = () => {
  return (
    <div className="bg-[#lelele] min-h-screen p-6 text-slate-100">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-700 pb-6">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-10 w-96" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="flex gap-4 mt-2">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-44 rounded-lg" />
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          {/* COMPLETION REPORT */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-56" />

            <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6">
              <Skeleton className="h-4 w-40 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          </div>

          {/* EVIDENCE GALLERY */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-44" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>

          {/* PROGRESS TIMELINE */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-52" />

            {[1,2].map((i) => (
              <div
                key={i}
                className="bg-[#lelele] border border-slate-700 rounded-xl p-6 space-y-3"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-16 rounded-lg" />
                </div>

                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />

                <Skeleton className="h-4 w-24 mt-3" />
                <Skeleton className="h-4 w-3/4" />

                <Skeleton className="h-4 w-32 mt-3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* ISSUE CONTEXT */}
          <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6 space-y-4">
            <Skeleton className="h-5 w-32" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* SOLVER DETAILS */}
          <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6 space-y-4">
            <Skeleton className="h-5 w-36" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <Skeleton className="h-4 w-32" />
          </div>

          {/* ACTION PANEL */}
          <div className="bg-[#lelele] border border-slate-700 rounded-xl p-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProofDetailsSkelton;