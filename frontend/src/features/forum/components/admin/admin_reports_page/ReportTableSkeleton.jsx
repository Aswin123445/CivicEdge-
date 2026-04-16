import React from "react";

const SkeletonCell = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-700/60 rounded ${className}`}
  />
);

const ReportTableSkeleton = ({ rows = 6 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        
        {/* Header stays same (no skeleton needed) */}
        <thead>
          <tr className="bg-[#1e1e1e]/50 border-b border-slate-800">
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Type
            </th>
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reference
            </th>
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reported By
            </th>
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Date
            </th>
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr
              key={i}
              className="border-b border-slate-800"
            >
              {/* Type */}
              <td className="py-4 px-6">
                <SkeletonCell className="h-5 w-16" />
              </td>

              {/* Reference */}
              <td className="py-4 px-6">
                <SkeletonCell className="h-5 w-40" />
              </td>

              {/* Reported By */}
              <td className="py-4 px-6">
                <SkeletonCell className="h-5 w-24" />
              </td>

              {/* Date */}
              <td className="py-4 px-6">
                <SkeletonCell className="h-5 w-28" />
              </td>

              {/* Status */}
              <td className="py-4 px-6">
                <SkeletonCell className="h-5 w-20 rounded-full" />
              </td>

              {/* Action */}
              <td className="py-4 px-6 text-right">
                <SkeletonCell className="h-8 w-16 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ReportTableSkeleton;