import React from "react";
import ReportCard from "../../ui/admin_execution_proof_details_page/ReportCard";

const AdminCompletionReportSection = ({ proofData }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <div className="w-1.5 h-5 bg-[#1e1e1e] rounded-full"></div>
        Completion Report
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <ReportCard
          title="Completion Summary"
          content={proofData?.completion_summary}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReportCard
            title="Deviations"
            content={proofData?.deviations_from_plan || "None reported"}
          />
          <ReportCard
            title="Remaining Issues"
            content={proofData?.remaining_issues || "None reported"}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminCompletionReportSection;
