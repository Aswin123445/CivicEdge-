import React from "react";
import SectionTitle from "../../ui/admin_solver_task_detail_page/SectionTitle";
import InfoBlock from "../../ui/admin_solver_task_detail_page/InfoBlock";
import { formatDate } from "../../../../utils/datenormalize";

const TaskDetailIssueOverview = ({ task }) => {
  const date = formatDate(task?.issue_created_at)
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      <SectionTitle title="Issue Overview" />
      <div className="space-y-4">
        <p className="text-slate-300 leading-relaxed">
          {task?.issue_description}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <InfoBlock label="Reported By" value={task?.reporter} />
          <InfoBlock label="Status" value={task?.issue_status} />
          <InfoBlock
            label="Date"
            value={date}
          />
        </div>
      </div>
    </section>
  );
};

export default TaskDetailIssueOverview;
