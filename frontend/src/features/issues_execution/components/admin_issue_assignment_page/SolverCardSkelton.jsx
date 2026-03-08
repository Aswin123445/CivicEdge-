import React from "react";
import Skeleton from "../../../../components/common/skelton";

const SolverCardSkelton = () => {
  return (
    <>
      {[1, 2, 3].map((card) => (
        <div
          key={card}
          className="bg-[#lelele]/50 border border-[#1f2937] rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 rounded bg-slate-800" />
          </div>
          <Skeleton className="h-10 w-full rounded-md opacity-60" />
        </div>
      ))}
    </>
  );
};

export default SolverCardSkelton;
