import React from 'react';
import useSolverTaskDetail from '../hooks/solver/solverTaskDetail';
import { useParams } from 'react-router-dom';
import TaskReportHeader from '../components/solver_report_view/TaskReportHeader';
import TaskReportFieldAccessment from '../components/solver_report_view/TaskReportFieldAccessment';
import TaskReportRosourceEstimation from '../components/solver_report_view/TaskReportRosourceEstimation';
import TaskReportFieldEvidence from '../components/solver_report_view/TaskReportFieldEvidence';
import SolverImpactDetail from '../components/impace_accessment_page/SolverImpactDetail';
import SolverTaskDetailsSkeleton from '../ui/AdminTaskDetailsSkeleton';


const SolverReportView = () => {
  // Combined data from your JSON and Serializer
  const {task_id} = useParams();
  const { task , taskLoading, taskFetching,handlePdfDownload} = useSolverTaskDetail(task_id);


  if (taskLoading || taskFetching) {
    return <SolverTaskDetailsSkeleton />;
  } 

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <TaskReportHeader taskData={task} handlePdfDownload={handlePdfDownload}  />

        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: FIELD REPORT */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* 1. Field Assessment Summary */}
            <TaskReportFieldAccessment taskData={task} />

            {/* 2. Resource Estimation */}
            <TaskReportRosourceEstimation taskData={task} />

            {/* 3. Field Evidence */}
            <TaskReportFieldEvidence taskData={task} />
          </div>

          {/* RIGHT COLUMN: CONTEXT SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SolverImpactDetail taskContext={task} bottomText="This report provides a comprehensive overview of the field verification findings, resource estimation, and evidence collected for the assigned task. Use this information to understand the issue's impact and plan the execution work effectively." />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default SolverReportView;