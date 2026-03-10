const getVerificationStatus = (status) => {
  switch (status) {
    case "ASSIGNED":
      return { text: "Pending", color: "text-blue-600" };

    case "VERIFICATION_SUBMITTED":
      return { text: "Submitted", color: "text-blue-600" };

    case "APPROVED_FOR_EXECUTION":
    case "IN_EXECUTION":
    case "COMPLETION_SUBMITTED":
    case "COMPLETED":
      return { text: "Completed", color: "text-green-600" };

    default:
      return { text: "Pending", color: "text-slate-400" };
  }
};

const getExecutionStatus = (status) => {
  switch (status) {
    case "ASSIGNED":
    case "VERIFICATION_SUBMITTED":
      return { text: "Locked", color: "text-slate-300 italic" };

    case "APPROVED_FOR_EXECUTION":
      return { text: "Ready", color: "text-blue-600" };

    case "IN_EXECUTION":
      return { text: "In Progress", color: "text-blue-600" };

    case "COMPLETION_SUBMITTED":
      return { text: "Submitted", color: "text-blue-600" };

    case "COMPLETED":
      return { text: "Completed", color: "text-green-600" };

    default:
      return { text: "Locked", color: "text-slate-300 italic" };
  }
};
const getActionRoute = (status, taskId) => {
  switch (status) {
    case "ASSIGNED":
      return `/solver/task/verification-entry/${taskId}`;

    case "VERIFICATION_SUBMITTED":
      return `/solver/${taskId}/verification-reports`;

    case "APPROVED_FOR_EXECUTION":
      return `/solver/tasks/${taskId}/execution/start`;

    case "IN_EXECUTION":
      return `/solver/tasks/${taskId}/execution`;

    case "COMPLETION_SUBMITTED":
      return `/solver/tasks/${taskId}/completion/view`;

    case "COMPLETED":
      return `/solver/tasks/${taskId}/summary`;

    default:
      return `/solver/tasks/${taskId}`;
  }
};

import { useNavigate } from "react-router-dom";
const TaskStatusCardActionSolver = ({ taskData, actionConfig }) => {
  const navigate = useNavigate();
  const verificationStatus = getVerificationStatus(taskData.status);
  const executionStatus = getExecutionStatus(taskData.status);
    const route = getActionRoute(taskData.status, taskData.id);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
          Workflow Status
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-slate-600">
            {taskData.status}
          </span>

          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        
        {/* Verification Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Verification</span>
          <span className={`font-bold ${verificationStatus.color}`}>
            {verificationStatus.text}
          </span>
        </div>

        {/* Execution Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Execution</span>
          <span className={`font-bold ${executionStatus.color}`}>
            {executionStatus.text}
          </span>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => navigate(route)}
          disabled={actionConfig.disabled}
          className={`w-full py-4 px-6 ${actionConfig.color} text-white font-bold rounded-xl shadow-lg transition duration-200 active:scale-95 flex items-center justify-center gap-2 mt-4`}
        >
          {actionConfig.text}

          {!actionConfig.disabled && (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskStatusCardActionSolver;