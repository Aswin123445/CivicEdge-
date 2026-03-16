import React from "react";
import SidebarItem from "../../ui/admin_verification_report_page/SidebarItem";
  // Mock Data for UI Rendering

const AdminVerificationTaskInfoCard = () => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Task Overview
      </h3>
      <div className="space-y-3">
        <SidebarItem label="Status" value="Verification Submitted" highlight />
        <SidebarItem label="Contractor" value="Pending Assignment" />
      </div>
    </div>
  );
};

export default AdminVerificationTaskInfoCard;
