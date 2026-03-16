import React from "react";
import SectionTitle from "../../ui/admin_solver_task_detail_page/SectionTitle";

const TaskDetalVerificationReport = ({ task, setActiveImage }) => {
  const report = task?.latest_report;
  if (!report) return null;

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      <SectionTitle title="Verification Report" />

      <div className="space-y-6">

        {/* Report Reference */}
        <div className="text-xs font-mono text-blue-400 bg-blue-500/10 inline-block px-2 py-1 rounded border border-blue-500/20">
          {report.reference_id}
        </div>

        {/* Issue Presence */}
        <div className="text-sm">
          <span className="font-semibold text-slate-300">
            Issue Present:
          </span>{" "}
          <span
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
              report.is_issue_present
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {report.is_issue_present ? "YES" : "NO"}
          </span>
        </div>

        {/* Severity */}
        <div className="text-sm">
          <span className="font-semibold text-slate-300">
            Severity Level:
          </span>{" "}
          <span className="ml-2 text-slate-200">{report.severity_level}</span>
        </div>

        {/* Public Impact */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Public Impact
          </p>
          <p className="text-slate-300">{report.public_impact_summary}</p>
        </div>

        {/* Affected Area */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Affected Area
          </p>
          <p className="text-slate-300">{report.affected_area_description}</p>
        </div>

        {/* Local Feedback */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Local Feedback
          </p>
          <p className="text-slate-300">{report.local_feedback_summary}</p>
        </div>

        {/* Site Constraints */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Site Constraints
          </p>
          <p className="text-slate-300">{report.site_constraints}</p>
        </div>

        {/* Execution Risks */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Execution Risks
          </p>
          <p className="text-slate-300">{report.execution_risks}</p>
        </div>

        {/* Estimates */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Estimated Budget</p>
            <p className="text-slate-200 font-semibold">
              ₹{report.estimated_budget}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Duration</p>
            <p className="text-slate-200 font-semibold">
              {report.estimated_duration_days} days
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">People Affected</p>
            <p className="text-slate-200 font-semibold">
              {report.estimated_people_affected}
            </p>
          </div>
        </div>

        {/* Evidence Gallery */}
        {report?.evidence?.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Evidence
            </p>

            <div className="flex gap-4 flex-wrap">
              {report?.evidence?.map((img) => (
                <div
                  key={img.secure_url}
                  className="w-32 h-20 rounded-lg overflow-hidden border border-slate-700 cursor-pointer"
                  onClick={() => setActiveImage(img.secure_url)}
                >
                  <img
                    src={img?.secure_url}
                    alt={img.secure_url}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted At */}
        <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
          Submitted: {new Date(report.submitted_at).toLocaleString()}
        </div>
      </div>
    </section>
  );
};

export default TaskDetalVerificationReport;