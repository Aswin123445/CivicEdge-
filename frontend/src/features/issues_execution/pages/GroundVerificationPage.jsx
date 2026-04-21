import React, { useState } from 'react';
import SolverVerificationStepper from '../components/ground_verification_page/SolverVerificationStepper';
import SolverIssuePresence from '../components/ground_verification_page/SolverIssuePresence';
import SolverSeverityLevel from '../components/ground_verification_page/SolverSeverityLevel';
import SolverEffectedSection from '../components/ground_verification_page/SolverEffectedSection';
import SolverFormAction from '../components/ground_verification_page/SolverFormAction';
import useSolverTaskDetail from "../hooks/solver/solverTaskDetail"
import useGroundHook from '../hooks/solver/solverGroundHook';
import { useLocation, useParams } from 'react-router-dom';
import SolverImpactDetail from '../components/impace_accessment_page/SolverImpactDetail';
import SolverTaskDetailsSkeleton from '../ui/AdminTaskDetailsSkeleton';
const GroundVerificationPage = () => {
  const {draft_id} = useParams();
  const location = useLocation()
  const task_id = location.state?.task_id;
  const {task,taskLoading,taskFetching} = useSolverTaskDetail(task_id);
  const {onSubmit} = useGroundHook(draft_id,task_id);
const validate = () => {
  const newErrors = {};
  const desc = formData.affected_area_description?.trim();

  if (!desc) {
    newErrors.affected_area_description = "Description is required";
  } else if (desc.length < 10) {
    newErrors.affected_area_description =
      "Must be at least 10 characters";
  }

  return newErrors;
};
  // --- STATE MANAGEMENT ---
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    is_issue_present: true,
    severity_level: 'MEDIUM',
    affected_area_description: ''
  });


  // Stepper Config
  const steps = [
    { id: 1, label: 'Ground', status: 'current' },
    { id: 2, label: 'Impact', status: 'pending' },
    { id: 3, label: 'Estimation', status: 'pending' },
    { id: 4, label: 'Evidence', status: 'pending' },
    { id: 5, label: 'Submit', status: 'pending' },
  ];

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'is_issue_present' ? value === 'true' : value 
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);
  await onSubmit(formData);
  setLoading(false);
};
  if(taskLoading || taskFetching){
    return <SolverTaskDetailsSkeleton/>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- COMPONENT: WorkspaceHeader --- */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Field Verification Report</h1>
          <p className="text-slate-500 font-medium">Step 1 — Ground Verification</p>
        </header>

        {/* --- COMPONENT: VerificationStepper --- */}
        <SolverVerificationStepper steps={steps} />

        <div className="grid grid-cols-12 gap-6">
          
          {/* MAIN FORM COLUMN */}
          <main className="col-span-12 lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-10">
                
                {/* --- Section: Issue Presence --- */}
                <SolverIssuePresence  formData={formData} handleInputChange={handleInputChange} />

                {/* --- Section: Severity Level --- */}
               <SolverSeverityLevel formData={formData} setFormData={setFormData} />

                {/* --- Section: Affected Area Description --- */}
                <SolverEffectedSection formData={formData} handleInputChange={handleInputChange} error={errors.affected_area_description}/>
              </div>

              {/* --- Form Actions --- */}
              <SolverFormAction isLoading={loading} />
            </form>
          </main>

          {/* SIDEBAR COLUMN */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SolverImpactDetail taskContext={task} bottomText='Note: Ground data is crucial for scheduling execution teams. Ensure the estimation is as realistic as possible.'/>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GroundVerificationPage;