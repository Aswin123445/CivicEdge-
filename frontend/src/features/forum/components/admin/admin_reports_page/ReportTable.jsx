import React from "react";
import ReportRow from "./ReportRow";

const ReportTable = ({ reports, handleViewDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
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
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onView={handleViewDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
