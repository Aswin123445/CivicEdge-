import React from "react";
import SidebarItem from "../../ui/admin_verification_report_page/SidebarItem";

const AdminVerificationSolverInfoCard = ({ reportData }) => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Solver Details
      </h3>
      <div className="space-y-3">
        <SidebarItem label="EMAIL" value={reportData?.solver_email} />
      </div>
    </div>
  );
};

export default AdminVerificationSolverInfoCard;
