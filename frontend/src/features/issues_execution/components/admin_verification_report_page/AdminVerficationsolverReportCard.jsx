import React from "react";
import { formatDate } from "../../../../utils/datenormalize";
import {
  AlertTriangle,
  MapPin,
  Users,
  Clock,
  IndianRupee,
  ShieldAlert,
} from "lucide-react";

const AdminVerificationSolverReportCard = ({ reportData }) => {
  const date = formatDate(reportData?.submitted_at);

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-100">
          Field Verification Report
        </h2>
        <span className="text-xs text-slate-500">{date}</span>
      </div>

      <div className="space-y-6 text-sm">

        {/* Ground Situation */}
        <div>
          <h4 className="text-slate-400 font-medium mb-2 uppercase text-[10px] tracking-widest">
            Ground Situation
          </h4>

          <div className="flex items-start gap-2 text-slate-200">
            <MapPin className="w-4 h-4 mt-[2px] text-slate-400" />
            <p>{reportData?.affected_area_description}</p>
          </div>

          <div className="flex items-center gap-2 mt-2 text-slate-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>
              Severity:{" "}
              <span className="font-medium">
                {reportData?.severity_level}
              </span>
            </span>
          </div>
        </div>

        {/* Impact Assessment */}
        <div>
          <h4 className="text-slate-400 font-medium mb-2 uppercase text-[10px] tracking-widest">
            Impact Assessment
          </h4>

          <p className="text-slate-200 mb-2">
            {reportData?.public_impact_summary}
          </p>

          {reportData?.estimated_people_affected && (
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-4 h-4 text-blue-400" />
              <span>
                Estimated People Affected:{" "}
                <span className="font-medium">
                  {reportData?.estimated_people_affected}
                </span>
              </span>
            </div>
          )}

          {reportData?.local_feedback_summary && (
            <p className="text-slate-300 mt-2">
              Local Feedback: {reportData?.local_feedback_summary}
            </p>
          )}
        </div>

        {/* Execution Estimation */}
        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2 uppercase text-[10px] tracking-widest">
            Execution Estimation
          </h4>

          <div className="flex items-center gap-2 text-blue-100">
            <IndianRupee className="w-4 h-4" />
            <span>Estimated Budget: ₹{reportData?.estimated_budget}</span>
          </div>

          <div className="flex items-center gap-2 text-blue-100 mt-1">
            <Clock className="w-4 h-4" />
            <span>
              Estimated Duration: {reportData?.estimated_duration_days} days
            </span>
          </div>

          {reportData?.work_nature && (
            <p className="text-blue-100 mt-2 underline decoration-blue-500/30">
              Work Nature: {reportData?.work_nature}
            </p>
          )}
        </div>

        {/* Risks & Constraints */}
        {(reportData?.site_constraints || reportData?.execution_risks) && (
          <div>
            <h4 className="text-slate-400 font-medium mb-2 uppercase text-[10px] tracking-widest">
              Constraints & Risks
            </h4>

            {reportData?.site_constraints && (
              <div className="flex items-start gap-2 text-slate-300">
                <ShieldAlert className="w-4 h-4 mt-[2px] text-red-400" />
                <p>Site Constraints: {reportData?.site_constraints}</p>
              </div>
            )}

            {reportData?.execution_risks && (
              <p className="text-slate-300 mt-2">
                Execution Risks: {reportData?.execution_risks}
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default AdminVerificationSolverReportCard;