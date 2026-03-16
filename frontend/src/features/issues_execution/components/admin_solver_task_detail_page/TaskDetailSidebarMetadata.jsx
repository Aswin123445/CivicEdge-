import React from "react";
import SidebarCard from "../../ui/admin_solver_task_detail_page/SidebarCard";
import SidebarRow from "../../ui/admin_solver_task_detail_page/SidebarRow";
import { formatDate } from "../../../../utils/datenormalize";

const TaskDetailSidebarMetadata = ({ task }) => {
  const date = formatDate(task?.created_at)
  const issue_created_at = formatDate(task?.issue_created_at)
  return (
    <aside className="col-span-12 lg:col-span-4">
      <div className="sticky top-8 space-y-6">
        <SidebarCard title="Task Information">
          <SidebarRow label="Task Ref" value={task?.reference_id} />
          <SidebarRow label="Issue Ref" value={task?.issue_reference} />
          <SidebarRow label="Zone" value={task?.zone} />
          <SidebarRow
            label="Assigned"
            value={date}
          />
          <SidebarRow label="Current Status" value={task?.status} highlight />
        </SidebarCard>

        <SidebarCard title="Reporter Details">
          <SidebarRow label="Citizen Email" value={task?.reporter} />
          <SidebarRow
            label="Reported Date"
            value={issue_created_at}
          />
        </SidebarCard>

        {task.contractor_email && <SidebarCard title="Contractor Assignment">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center font-bold text-white">
              {task?.contractor_name[0]}
            </div>
            <div>
              <div className="text-sm font-semibold">
                {task?.contractor_name}
              </div>
              <div className="text-xs text-slate-500">Service Provider</div>
            </div>
          </div>
          <SidebarRow label="Email" value={task?.contractor_email} />
        </SidebarCard>}

        <div className="p-4 bg-[#lelele] border border-slate-700 rounded-xl">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
            Location
          </h4>
          <a
            href={task?.navigation_url}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center py-2 bg-[#lelele] hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors border border-slate-700"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </aside>
  );
};

export default TaskDetailSidebarMetadata;
