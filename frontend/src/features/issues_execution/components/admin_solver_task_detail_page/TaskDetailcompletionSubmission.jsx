import React from "react";
import ProgressUpdateCard from "./ProgressUpdateCard";
import SectionTitle from "../../ui/admin_solver_task_detail_page/SectionTitle";

const TaskDetailcompletionSubmission = ({ task }) => {
  const progress_update = task?.progress_update;
  if (!progress_update || progress_update.length === 0) return null
  return (
    <section className="space-y-4">
      <SectionTitle title="Execution Progress Timeline" />
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-z-10 before:h-full before:w-0.5 before:bg-slate-800">
        {task?.progress_update?.map((update) => (
          <ProgressUpdateCard key={update?.reference_id} update={update} />
        ))}
      </div>
    </section>
  );
};

export default TaskDetailcompletionSubmission;
