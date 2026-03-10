import React from "react";

const SolverTaskListSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFF] animate-pulse px-4 md:px-6 lg:px-16 py-4">

      {/* 1️⃣ Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[1,2,3,4,5].map((i)=>(
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="h-3 w-28 bg-slate-200 rounded"/>
            <div className="h-7 w-10 bg-slate-300 rounded"/>
            <div className="h-6 w-16 bg-slate-100 rounded-full"/>
          </div>
        ))}
      </div>

      {/* 2️⃣ Search + Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          {/* search */}
          <div className="h-10 w-full lg:w-80 bg-slate-200 rounded-lg"/>

          {/* filters */}
          <div className="flex flex-wrap gap-3">
            {[1,2,3,4,5,6,7].map((i)=>(
              <div
                key={i}
                className="h-9 w-32 bg-slate-100 rounded-full"
              />
            ))}
          </div>

        </div>
      </div>

      {/* 3️⃣ Task Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {[1,2,3,4].map((card)=>(
          <div
            key={card}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">

              <div className="space-y-3 w-full">
                <div className="h-5 w-48 bg-slate-200 rounded"/>
                <div className="h-3 w-32 bg-slate-100 rounded"/>
              </div>

              <div className="h-6 w-20 bg-slate-100 rounded-full"/>
            </div>

            <div className="h-6 w-3/4 bg-slate-300 rounded mb-3"/>
            <div className="h-3 w-40 bg-slate-100 rounded mb-6"/>

            <div className="flex items-center justify-between">
              <div className="h-3 w-44 bg-slate-100 rounded"/>
              <div className="h-10 w-32 bg-slate-200 rounded-lg"/>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SolverTaskListSkeleton;