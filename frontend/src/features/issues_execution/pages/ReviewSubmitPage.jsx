import SolverSubmitModal from '../components/SolverReviewSubmitPage/SolverSubmitModal';
import SolverSubmitHeader from '../components/SolverReviewSubmitPage/SolverSubmitHeader';
import SolverVerificationStepper from '../components/SolverReviewSubmitPage/SolverVerificationStepper';
import SolverGroundVerification from '../components/SolverReviewSubmitPage/SolverGroundVerification';
import SolverImpactAsseccment from '../components/SolverReviewSubmitPage/SolverImpactAsseccment';
import SolverWorkEstimation from '../components/SolverReviewSubmitPage/SolverWorkEstimation';
import SolverEvidencePreview from '../components/SolverReviewSubmitPage/SolverEvidencePreview';
import SolverSubmissionWarning from '../components/SolverReviewSubmitPage/SolverSubmissionWarning';
import SolverFormActionbutton from '../components/SolverReviewSubmitPage/SolverFormActionbutton';
import {useParams,useLocation} from "react-router-dom";
import useSolverVerificationReviewHook from '../hooks/solver/solverVerificationReviewHook';
import useSolverTaskDetail from '../hooks/solver/solverTaskDetail';
import SolverImpactDetail from '../components/impace_accessment_page/SolverImpactDetail';
import SolverTaskDetailsSkeleton from '../ui/AdminTaskDetailsSkeleton';

const ReviewSubmitPage = () => {
  const location = useLocation();
  const { draft_id } = useParams();
  const task_id = location.state?.task_id;
    const {draft, isLoading, isFetching, isSubmitting, showConfirmModal, setShowConfirmModal, handleFinalSubmit} = useSolverVerificationReviewHook(draft_id,task_id);
    const { task, taskLoading, taskFetching } = useSolverTaskDetail(task_id);
  
  // --- STATE MANAGEMENT ---



  const steps = [
    { id: 1, label: 'Ground', status: 'completed' },
    { id: 2, label: 'Impact', status: 'completed' },
    { id: 3, label: 'Estimation', status: 'completed' },
    { id: 4, label: 'Evidence', status: 'completed' },
    { id: 5, label: 'Submit', status: 'current' },
  ];

  if(isLoading || isFetching || taskLoading || taskFetching){
    return <SolverTaskDetailsSkeleton/>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* --- SUBMISSION CONFIRMATION MODAL --- */}
      {showConfirmModal && (
        <SolverSubmitModal setShowConfirmModal={setShowConfirmModal} handleFinalSubmit={handleFinalSubmit} isSubmitting={isSubmitting} />
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* --- COMPONENT: WorkspaceHeader --- */}
        <SolverSubmitHeader />

        {/* --- COMPONENT: VerificationStepper --- */}
       <SolverVerificationStepper steps={steps} />

        <div className="grid grid-cols-12 gap-6">
          
          {/* MAIN REVIEW SECTIONS */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Section 1: Ground Verification */}
            <SolverGroundVerification reportData={draft} />

            {/* Section 2: Impact Assessment */}
            <SolverImpactAsseccment reportData={draft} />

            {/* Section 3: Work Estimation */}
            <SolverWorkEstimation reportData={draft} />

            {/* Section 4: Evidence Preview */}
            <SolverEvidencePreview reportData={draft} />

            {/* Section 5: Submission Warning */}
            <SolverSubmissionWarning />

            {/* FORM ACTIONS */}
            <SolverFormActionbutton setShowConfirmModal={setShowConfirmModal} />
          </main>

          {/* SIDEBAR COLUMN */}
           <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* --- COMPONENT: TaskContextCard --- */}
            <SolverImpactDetail taskContext={task}  bottomText='data is crucial for scheduling execution teams. Ensure the estimation is as realistic as possible.'/>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitPage;