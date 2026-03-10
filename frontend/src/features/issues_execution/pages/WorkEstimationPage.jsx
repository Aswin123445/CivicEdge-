import React, { useState } from "react";
import SolverEstimationHeader from "../components/work_estimation_page/SolverEstimationHeader";
import SolverVerificationStepper from "../components/ground_verification_page/SolverVerificationStepper";
import SolverEstimationForm from "../components/work_estimation_page/SolverEstimationForm";
import SolverImpactDetail from "../components/impace_accessment_page/SolverImpactDetail";
import { useLocation, useParams } from "react-router-dom";
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail";
import useSolverEstimation from "../hooks/solver/solverEstimationHook";
import SolverTaskDetailsSkeleton from "../ui/AdminTaskDetailsSkeleton";

const WorkEstimationPage = () => {
  const location = useLocation();
  const { draft_id } = useParams();
  const task_id = location.state?.task_id;
  const { task, taskLoading, taskFetching } = useSolverTaskDetail(task_id);
  const { handleSubmit, loading, formData, setFormData } = useSolverEstimation(
    draft_id,
    task_id,
  );

  // --- STATE MANAGEMENT ---

  // Stepper Progress Config
  const steps = [
    { id: 1, label: "Ground", status: "completed" },
    { id: 2, label: "Impact", status: "completed" },
    { id: 3, label: "Estimation", status: "current" },
    { id: 4, label: "Evidence", status: "pending" },
    { id: 5, label: "Submit", status: "pending" },
  ];

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if(taskLoading || taskFetching){
    return <SolverTaskDetailsSkeleton/>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* --- COMPONENT: WorkspaceHeader --- */}
        <SolverEstimationHeader />

        {/* --- COMPONENT: VerificationStepper --- */}
        <SolverVerificationStepper steps={steps} />

        <div className="grid grid-cols-12 gap-6">
          {/* MAIN FORM COLUMN */}
          <SolverEstimationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            loadin={loading}
          />

          {/* SIDEBAR COLUMN */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SolverImpactDetail taskContext={task} bottomText = 'Estimation data is crucial for scheduling execution teams. Ensure the estimation is as realistic as possible' />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WorkEstimationPage;
