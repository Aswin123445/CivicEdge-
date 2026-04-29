import React, { useState } from "react";
import TaskDetailsHeaderSolver from "../components/solver_task_details_page/TaskDetailsHeaderSolver";
import ComplaintOverviewCardSolver from "../components/solver_task_details_page/ComplaintOverviewCardSolver";
import EvidenceGallerySolver from "../components/solver_task_details_page/EvidenceGallerySolver";
import LocationCardSolver from "../components/solver_task_details_page/LocationCardSolver";
import TaskStatusCardActionSolver from "../components/solver_task_details_page/TaskStatusCardActionSolver";
import TaskMetadataSolver from "../components/solver_task_details_page/TaskMetadataSolver";
import ImageModelPreview from "../components/solver_task_details_page/ImageModelPreview";
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail";
import SolverTaskDetailSkeleton from "../components/solver_task_details_page/SolverTaskDetailSkeleton";
import { useParams } from "react-router-dom";
import AdminExecutionDecisionBanner from "../components/solver_task_details_page/AdminExecutionDecisionBanner";
import PostponedTaskNotice from "../components/solver_task_details_page/PostponedTaskNotice";

const SolverTaskDetailPage = () => {
  // State for image modal preview
  const { id } = useParams();
  const { task, taskLoading, taskFetching, handleStartExecution, startIsLoading } =
    useSolverTaskDetail(id);
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper to determine button text based on Task Status
  const getActionButtonConfig = (status) => {
    switch (status) {
      case "ASSIGNED":
        return {
          text: "Start Verification",
          color: "bg-blue-600 hover:bg-blue-700",
        };

      case "POSTPONED":
        return {
          text: "View Completion Submission",
          color: "bg-yellow-600 hover:bg-yellow-700",
        };

      case "VERIFICATION_SUBMITTED":
        return {
          text: "View Submitted Verification",
          color: "bg-blue-600 hover:bg-blue-700 ",
        };

      case "APPROVED_FOR_EXECUTION":
        return {
          text: "Start Execution Work",
          color: "bg-blue-600 hover:bg-blue-700",
        };

      case "IN_EXECUTION":
        return {
          text: "Continue Execution",
          color: "bg-blue-600 hover:bg-blue-700",
        };

      case "COMPLETION_SUBMITTED":
        return {
          text: "View Completion Submission",
          color: "bg-blue-600 hover:bg-slate-900",
        };

      case "COMPLETED":
        return {
          text: "Task Completed",
          color: "bg-green-600 cursor-default",
          disabled: true,
        };

      default:
        return {
          text: "Open Task",
          color: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };
  const actionConfig = getActionButtonConfig(task?.status);
  if (taskLoading || taskFetching) {
    return <SolverTaskDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- COMPONENT: PageHeader --- */}
        <TaskDetailsHeaderSolver taskData={task} />
        <AdminExecutionDecisionBanner
          latestExecutionProof={task?.latest_execution_proofs}
        />
        {task?.status === "POSTPONED" && (
          <PostponedTaskNotice />
        )}

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Investigation Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* --- COMPONENT: ComplaintOverviewCard --- */}
            <ComplaintOverviewCardSolver taskData={task} />

            {/* --- COMPONENT: EvidenceGallery --- */}
            <EvidenceGallerySolver
              taskData={task}
              setSelectedImage={(img) => setSelectedImage(img)}
            />

            {/* --- COMPONENT: LocationCard --- */}
            <LocationCardSolver taskData={task} />
          </div>

          {/* SIDEBAR COLUMN: Action & Status */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* --- COMPONENT: TaskStatusCard & Action --- */}
            <TaskStatusCardActionSolver
              taskData={task}
              actionConfig={actionConfig}
              handleStartExecution={handleStartExecution}
              startIsLoading={startIsLoading}
            />

            {/* --- COMPONENT: TaskMetadata --- */}
            <TaskMetadataSolver taskData={task} />
          </aside>
        </div>
      </div>

      {/* Image Modal Preview */}
      {selectedImage && (
        <ImageModelPreview
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

// Internal Helper Components

export default SolverTaskDetailPage;
