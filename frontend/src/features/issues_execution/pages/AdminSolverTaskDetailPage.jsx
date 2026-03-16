import React, { useState, useEffect } from "react";
import TaskDetailPageHeader from "../components/admin_solver_task_detail_page/TaskDetailPageHeader";
import TaskDetailIssueOverview from "../components/admin_solver_task_detail_page/TaskDetailIssueOverview";
import TaskDetailCitizenOverview from "../components/admin_solver_task_detail_page/TaskDetailCitizenOverview";
import TaskDetalVerificationReport from "../components/admin_solver_task_detail_page/TaskDetalVerificationReport";
import TaskDetailcompletionSubmission from "../components/admin_solver_task_detail_page/TaskDetailcompletionSubmission";
import TaskDetailSidebarMetadata from "../components/admin_solver_task_detail_page/TaskDetailSidebarMetadata";
import useAdminTaskDetailsHook from "../hooks/admin/admin_task_details/AdminTaskDetailsHook";
import { useParams } from "react-router-dom";
import IssueDetailSkeleton from "../components/issue_details_page/IssueDetailSkeleton";

const AdminSolverTaskDetailPage = () => {
  const { id } = useParams();
  const { task: taskO, isLoading, isFetching } = useAdminTaskDetailsHook(id);
  const [activeImage, setActiveImage] = useState(null);
  if (isFetching || isLoading) return <IssueDetailSkeleton />;
  return (
    <div className="min-h-screen bg-[#lelele] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* COMPONENT: PageHeader 
            Move to: components/admin/task_details/PageHeader.jsx 
        */}
        <TaskDetailPageHeader task={taskO} />

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDE: Task Content & History */}
          <main className="col-span-12 lg:col-span-8 space-y-8">
            {/* SECTION: Issue Overview */}
            <TaskDetailIssueOverview task={taskO} />

            {/* SECTION: Citizen Evidence */}
            <TaskDetailCitizenOverview
              task={taskO}
              setActiveImage={setActiveImage}
            />

            {/* SECTION: Verification Report */}
            <TaskDetalVerificationReport
              task={taskO}
              setActiveImage={setActiveImage}
            />

            {/* SECTION: Execution Timeline */}
            <TaskDetailcompletionSubmission task={taskO} />
          </main>

          {/* RIGHT SIDE: Sidebar Metadata */}
          <TaskDetailSidebarMetadata task={taskO} />
        </div>
      </div>

      {/* MODAL: Image Preview */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            alt="Fullscreen preview"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};


export default AdminSolverTaskDetailPage;
