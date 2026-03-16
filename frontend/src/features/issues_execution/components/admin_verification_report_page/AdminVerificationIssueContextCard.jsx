import React from "react";
import DetailItem from "../../ui/admin_verification_report_page/DetailItem";

const AdminVerificationIssueContextCard = ({ reportData }) => {
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
        Issue Context
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <DetailItem label="Title" value={reportData?.issue_title} />
        <DetailItem label="Category" value={reportData?.issue_category} />
        <DetailItem label="Location" value={reportData?.location} />
        <DetailItem label="Priority" value={reportData?.severity_level} isAlert />
      </div>
      <div className="mt-6 p-4 bg-[#1e1e1e] rounded-lg border border-slate-800">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Description
        </span>
        <p className="mt-1 text-slate-300 leading-relaxed">
          {reportData?.description}
        </p>
      </div>
    </section>
  );
};

export default AdminVerificationIssueContextCard;
