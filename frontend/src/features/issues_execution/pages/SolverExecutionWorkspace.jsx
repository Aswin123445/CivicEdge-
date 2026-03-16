import React, { useState } from "react";
import SolverExecutionHeader from "../components/solver_execution_workspace/SolverExecutionHeader";
import SolverExecutionProgressTimeline from "../components/solver_execution_workspace/SolverExecutionProgressTimeline";
import SolveExecutionRightColumnSideBar from "../components/solver_execution_workspace/SolveExecutionRightColumnSideBar";
import ProgressUpdateModal from "../components/solver_execution_workspace/ProgressUpdateModal";
import CompletionModal from "../components/solver_execution_workspace/CompletionModal";
import useSolverTaskUpdateHook from "../hooks/solver/solverTaskUpdateHook";
import { useParams } from "react-router-dom";
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail";
import SolverExecutionProgressTimelineSkeleton from "../components/solver_execution_workspace/SolverExecutionProgressTimelineSkeleton";
import SolverExecutionSideBarSkelton from "../components/solver_execution_workspace/SolverExecutionSideBarSkelton";

const SolverExecutionWorkspace = () => {
  const { task_id } = useParams();
  const {
    progressUpdteas,
    isLoadingUpdate,
    isFetchingUpdate,
    updateProgress,
    isLoadingUpdateRes,
    isFetchingUpdateRes,
    handleAddProgress,
    isProgressModalOpen,
    setIsProgressModalOpen,
    isCompletionModalOpen,
    setIsCompletionModalOpen,
    selectedFiles,
    setSelectedFiles,
    progress_stat,
    imagefile,
    setImagefile,
    isSubmitting,
    handleSubmitCompletion,
    setIsSubmitting,
  } = useSolverTaskUpdateHook(task_id);
  const { task, taskLoading, taskFetching } = useSolverTaskDetail(task_id);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagefile((prev) => [...prev, ...files]);

    // Map files to include a preview URL for the UI
    const filesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      {/* COMPONENT: PageHeader 
          Move to: components/solver/execution/PageHeader.jsx 
      */}
      <SolverExecutionHeader
        taskDetails={task}
        progress_stat={progress_stat}
        isLoadingUpdate={isLoadingUpdate}
      />

      <main className="mx-auto max-w-7xl p-4 sm:p-8">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Progress Timeline */}
          {isLoadingUpdate || isFetchingUpdate ? (
            <SolverExecutionProgressTimelineSkeleton />
          ) : (
            <SolverExecutionProgressTimeline updates={progressUpdteas} />
          )}
          {taskLoading || taskFetching ? (
            <SolverExecutionSideBarSkelton />
          ) : (
            <SolveExecutionRightColumnSideBar
              taskDetails={task}
              setIsCompletionModalOpen={setIsCompletionModalOpen}
              setIsProgressModalOpen={setIsProgressModalOpen}
            />
          )}
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Progress Update Modal */}
      {isProgressModalOpen && (
        <ProgressUpdateModal
          setIsProgressModalOpen={setIsProgressModalOpen}
          handleAddProgress={handleAddProgress}
          isLoadingUpdateRes={isLoadingUpdateRes}
          isFetchingUpdateRes={isFetchingUpdateRes}
        />
      )}

      {/* Completion Modal */}
      {isCompletionModalOpen && (
        <CompletionModal
          handleSubmitCompletion={handleSubmitCompletion}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
          removeFile={removeFile}
          setIsCompletionModalOpen={setIsCompletionModalOpen}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default SolverExecutionWorkspace;
