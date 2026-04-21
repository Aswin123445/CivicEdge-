import React, { useState } from "react";
import SolverImpactHeader from "../components/impace_accessment_page/SolverImpactHeader";
import SolverImpactVerificationStepper from "../components/impace_accessment_page/SolverImpactVerificationStepper";
import SolverImpactForm from "../components/impace_accessment_page/SolverImpactForm";
import SolverImpactDetail from "../components/impace_accessment_page/SolverImpactDetail";
import { useLocation, useParams } from "react-router-dom";
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail";
import useSolverImpact from "../hooks/solver/solverImpactHook";
import SolverTaskDetailsSkeleton from "../ui/AdminTaskDetailsSkeleton";


const ImpactAssessmentPage = () => {
  const {draft_id} = useParams();
  const location = useLocation();
  const task_id = location.state?.task_id;
  const {
    solverImpactStep2,
    isLoading: isImpactLoading,
    loading,
    setLoading,
    formData,
    setFormData,
    handleSubmit,
    errors,
  } = useSolverImpact(draft_id,task_id);

  // --- STATE MANAGEMENT ---
  const { task, taskLoading, taskFetching } = useSolverTaskDetail(task_id);

  // Stepper Configuration
  const steps = [
    { id: 1, label: "Ground", status: "completed" },
    { id: 2, label: "Impact", status: "current" },
    { id: 3, label: "Estimation", status: "pending" },
    { id: 4, label: "Evidence", status: "pending" },
    { id: 5, label: "Submit", status: "pending" },
  ];

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (isImpactLoading || taskLoading || taskFetching) {
    return <SolverTaskDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* --- COMPONENT: WorkspaceHeader --- */}
        <SolverImpactHeader />

        {/* --- COMPONENT: VerificationStepper --- */}
        <SolverImpactVerificationStepper steps={steps} />

        <div className="grid grid-cols-12 gap-6">
          {/* MAIN FORM COLUMN */}
          <main className="col-span-12 lg:col-span-8">
            <SolverImpactForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              loading={loading}
              errors={errors}
            />
          </main>

          {/* SIDEBAR COLUMN */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SolverImpactDetail taskContext={task} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ImpactAssessmentPage;
