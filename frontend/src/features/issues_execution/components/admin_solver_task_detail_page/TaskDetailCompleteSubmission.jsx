import React from "react";
import SectionTitle from "../../ui/admin_solver_task_detail_page/SectionTitle";
import ReportSubBlock from "../../ui/admin_solver_task_detail_page/ReportSubBlock";
import EvidenceThumb from "../../ui/admin_solver_task_detail_page/EvidenceThumb";

const TaskDetailCompleteSubmission = ({ task, setActiveImage }) => {
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm ring-1 ring-emerald-500/20">
      <div className="flex justify-between items-start mb-4">
        <SectionTitle title="Completion Submission" />
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold">
          Latest Proof
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportSubBlock
              label="Summary"
              value={task.latest_execution_proofs.completion_summary}
            />
            <ReportSubBlock
              label="Deviations"
              value={task.latest_execution_proofs.deviations_from_plan}
            />
            <ReportSubBlock
              label="Remaining Issues"
              value={task.latest_execution_proofs.remaining_issues}
            />
            <ReportSubBlock
              label="Admin Feedback"
              value={task.latest_execution_proofs.admin_message}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {task.latest_execution_proofs.evidences.map((img, idx) => (
              <EvidenceThumb
                key={idx}
                url={img.url}
                onClick={() => setActiveImage(img.url)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskDetailCompleteSubmission;
