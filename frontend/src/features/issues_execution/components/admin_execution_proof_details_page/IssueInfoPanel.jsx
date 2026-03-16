import React from "react";
import SidebarItem from "../../ui/admin_execution_proof_details_page/SidebarItem";

const IssueInfoPanel = ({ proofData }) => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Issue Context
      </h3>
      <div className="space-y-4">
        <SidebarItem label="Reference" value={proofData?.issue.reference_id} />
        <SidebarItem label="Status" value={proofData?.issue.status} isStatus />
        <SidebarItem label="Location" value={proofData?.issue.location} />
      </div>
    </div>
  );
};

export default IssueInfoPanel;
