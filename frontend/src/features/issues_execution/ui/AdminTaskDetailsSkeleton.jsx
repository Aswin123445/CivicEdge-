import Skeleton from "../../../components/common/Skelton";

const SolverTaskDetailsSkeleton = () => {
  return (
    <div className="space-y-6 mx-20 my-20">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="space-y-3">
          <Skeleton className="h-3 w-40 bg-slate-300" />
          <Skeleton className="h-6 w-72 bg-slate-300" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-36 rounded-lg bg-slate-300" />
          <Skeleton className="h-8 w-32 rounded-lg bg-slate-300" />
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">

        {/* LEFT COLUMN */}
        <div className="col-span-2 space-y-4">

          {/* FIELD ASSESSMENT */}
          <div className="bg-white  rounded-xl overflow-hidden">

            {/* Header */}
            <div className="px-6 py-4">
              <Skeleton className="h-4 w-40 bg-slate-300" />
            </div>

            <div className="">

              {/* Row */}
              <div className="px-6 py-5 grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Skeleton className="h-3 w-32 bg-slate-300" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full bg-slate-300" />
                    <Skeleton className="h-4 w-28 bg-slate-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-28 bg-slate-300" />
                  <Skeleton className="h-4 w-16 bg-slate-300" />
                </div>

              </div>

              {/* Public Impact */}
              <div className="px-6 py-5 space-y-2">
                <Skeleton className="h-3 w-40 bg-slate-300" />
                <Skeleton className="h-4 w-72 bg-slate-300" />
              </div>

            </div>
          </div>

          {/* WORK & BUDGET */}
          <div className="bg-white  rounded-xl overflow-hidden">

            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center">
              <Skeleton className="h-4 w-56 bg-slate-300" />
              <Skeleton className="h-3 w-36 bg-slate-300" />
            </div>

            <div className="px-6 py-5">

              {/* Budget Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 bg-slate-300" />
                  <Skeleton className="h-4 w-24 bg-slate-300" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-4 w-20 bg-slate-300" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 bg-slate-300" />
                  <Skeleton className="h-4 w-16 bg-slate-300" />
                </div>

              </div>

              {/* Site Constraints */}
              <div className="space-y-2">

                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full bg-slate-300" />
                  <Skeleton className="h-3 w-36 bg-slate-300" />
                </div>

                <Skeleton className="h-4 w-96 bg-slate-300" />

              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">

          {/* TASK INFO */}
          <div className="bg-white  rounded-xl overflow-hidden">

            <div className="px-6 py-4">
              <Skeleton className="h-4 w-32 bg-slate-300" />
            </div>

            <div className="">

              <div className="px-6 py-5 space-y-2">
                <Skeleton className="h-3 w-28 bg-slate-300" />
                <Skeleton className="h-4 w-44 bg-slate-300" />
              </div>

              <div className="px-6 py-5 grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-4 w-28 bg-slate-300" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-4 w-28 bg-slate-300" />
                </div>

              </div>

              <div className="px-6 py-5 space-y-2">
                <Skeleton className="h-3 w-24 bg-slate-300" />
                <Skeleton className="h-4 w-40 bg-slate-300" />
              </div>

              <div className="px-6 py-5 space-y-2">
                <Skeleton className="h-3 w-16 bg-slate-300" />
                <Skeleton className="h-4 w-24 bg-slate-300" />
              </div>

            </div>
          </div>

          {/* NOTE CARD */}
          <div className="bg-white rounded-xl overflow-hidden">

            <div className="px-6 py-5 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full bg-slate-300" />
                <Skeleton className="h-3 w-24 bg-slate-300" />
              </div>

              <Skeleton className="h-3 w-full bg-slate-300" />
              <Skeleton className="h-3 w-5/6 bg-slate-300" />
              <Skeleton className="h-3 w-4/6 bg-slate-300" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SolverTaskDetailsSkeleton;