import SolverEvidenceHeader from "../components/solver_evidence_page/SolverEvidenceHeader";
import SolverVerificationStepper from "../components/ground_verification_page/SolverVerificationStepper";
import SolverDropzoneUploader from "../components/solver_evidence_page/SolverDropzoneUploader";
import SolverEvidencePreviewGrid from "../components/solver_evidence_page/SolverEvidencePreviewGrid";
import SolverFormAction from "../components/solver_evidence_page/SolverFormAction";
import { useLocation, useParams } from "react-router-dom";
import SolverImpactDetail from "../components/impace_accessment_page/SolverImpactDetail";
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail";
import useSolverEvidenceUploadHook from "../hooks/solver/solverEvidenceUploadHook";
import SolverTaskDetailsSkeleton from "../ui/AdminTaskDetailsSkeleton";

const EvidenceUploadPage = () => {
  const location = useLocation();
  const { draft_id } = useParams();
  const task_id = location.state?.task_id;
  const {
    isSubmitting,
    isUploading,
    evidences,
    setEvidences,
    handleFileUpload,
    handleSubmit,
    steps,
    removeEvidence,
    fileInputRef,
  } = useSolverEvidenceUploadHook(draft_id,task_id);

  const { task, taskLoading, taskFetching } = useSolverTaskDetail(task_id);

  if (taskLoading || taskFetching) {
    return <SolverTaskDetailsSkeleton />;
  }


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* --- COMPONENT: WorkspaceHeader --- */}
        <SolverEvidenceHeader />

        {/* --- COMPONENT: VerificationStepper --- */}
        <SolverVerificationStepper steps={steps} />

        <div className="grid grid-cols-12 gap-6">
          {/* MAIN CONTENT COLUMN */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* --- COMPONENT: DropzoneUploader --- */}
            <SolverDropzoneUploader
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              isUploading={isUploading}
            />

            {/* --- COMPONENT: EvidencePreviewGrid --- */}
            {evidences.length > 0 && (
              <SolverEvidencePreviewGrid
                evidences={evidences}
                removeEvidence={removeEvidence}
                setEvidences={setEvidences}
              />
            )}

            {/* --- COMPONENT: FormActions --- */}
            <SolverFormAction
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isUploading={isUploading}
              evidences={evidences}
            />
          </main>

          {/* SIDEBAR COLUMN */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* --- COMPONENT: TaskContextCard --- */}
            <SolverImpactDetail taskContext={task} bottomText='Evidence upload is crucial for validating the issue and planning the response. Please ensure all submitted evidence is clear and relevant.' />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EvidenceUploadPage;
