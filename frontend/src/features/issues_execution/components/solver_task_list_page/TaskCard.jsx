import React from "react";
import StatusBadge from "../../ui/solver_task_list_page/StatusBadge";
import { formatDate } from "../../../../utils/datenormalize";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const date = formatDate(task?.created_at)
  const navigate = useNavigate();
  return (
    <div
      key={task.id}
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
          {task.category_name}
        </span>
        <StatusBadge status={task.status} />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
        {task.issue_title}
      </h3>
      <p className="text-xs font-mono text-slate-400 mb-4">{task.reference_id}</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Assigned
          </span>
          <span className="text-xs text-slate-600 font-medium">
            {date}
          </span>
        </div>
        <button onClick={() => {navigate(`/solver/task/${task?.id}`)}} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition shadow-sm active:scale-95">
          Review Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
