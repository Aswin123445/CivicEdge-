import React, { useState, useEffect } from 'react';
import EntryVerificationStepper from '../components/verification_entry_page/EntryVerificationStepper';
import EntryWorkSpaceLoader from '../components/verification_entry_page/EntryWorkSpaceLoader';
import EntryTaskContextCard from '../components/verification_entry_page/EntryTaskContextCard';
import useSolverVerificationTask from '../hooks/solver/solververification';
import { useNavigate, useParams } from 'react-router-dom';
import useSolverTaskDetail from '../hooks/solver/solverTaskDetail';

const VerificationEntryPage = () => {
  const { id } = useParams();
 
const navigate = useNavigate();
  const { task, taskLoading } = useSolverTaskDetail(id);
  const { draftProgress, draftProgressLoading } = useSolverVerificationTask(id);
  // Workflow Steps
  const steps = [
    { id: "ground", label: "Ground Verification", key: "ground_verification_completed" },
    { id: "impact", label: "Impact Assessment", key: "impact_assessment_completed" },
    { id: "estimation", label: "Work Estimation", key: "estimation_completed" },
    { id: "evidence", label: "Evidence Upload", key: "evidence_completed" },
    { id: "review", label: "Review & Submit", key: null },
  ];


  useEffect(() => {
    // Wait until API data is loaded
    if (draftProgressLoading || !draftProgress ) return;

    // Find first incomplete step
    const nextStep =
      steps.find((step) => step.key && !draftProgress[step.key]) ||
      steps[steps.length - 1];

    const redirectUrl = `/solver/tasks/${draftProgress?.id}/verification/${nextStep.id}`;

    navigate(redirectUrl,{state:{task_id:task?.id}});
  }, [draftProgress, draftProgressLoading, navigate]);


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- COMPONENT: PageHeader --- */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Field Verification Report</h1>
          <p className="text-slate-500">Preparing verification workspace...</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          {/* MAIN CONTENT COLUMN */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* --- COMPONENT: VerificationStepper --- */}
            <EntryVerificationStepper steps={steps} draftStatus={draftProgress} isLoading={draftProgressLoading} />

            {/* --- COMPONENT: WorkspaceLoader --- */}
            <EntryWorkSpaceLoader isLoading={draftProgressLoading} />
          </main>

          {/* SIDEBAR COLUMN */}
          <aside className="col-span-12 lg:col-span-4">
            {/* --- COMPONENT: TaskContextCard --- */}

            <EntryTaskContextCard taskContext={task} />
          </aside>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Components


export default VerificationEntryPage;