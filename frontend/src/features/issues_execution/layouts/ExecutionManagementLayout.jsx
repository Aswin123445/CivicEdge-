import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function ExecutionManagementLayout() {
  const location = useLocation();
  const solverTask = [
    "/dashboard/execution/tasks/list",
    "/dashboard/execution/solver-tasks/",
  ];

  const pendingReview = ["/dashboard/execution/in-review/issues"];

  const solverAssignment = ["/dashboard/execution/solver-assignment"];

  const verificationReport = [
    "/dashboard/execution/verification-reports",
    "/dashboard/execution/verification-report/",
  ];

  const executionProof = [
    "/dashboard/execution/execution-proofs",
    "/dashboard/execution/execution-proof/",
  ];

  const isexecutionProofPath = executionProof.some((path) =>
    location.pathname.startsWith(path),
  );
  const isVerificationReportPath = verificationReport.some((path) =>
    location.pathname.startsWith(path),
  );

  const isSolverTaskPath = solverTask.some((path) =>
    location.pathname.startsWith(path),
  );
  const isPendingReview = pendingReview.some((path) =>
    location.pathname.startsWith(path),
  );
  const isSolverAssignment = solverAssignment.some((path) =>
    location.pathname.startsWith(path),
  );
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/dashboard/execution/in-review/issues"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isPendingReview
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Pending Review
        </NavLink>

        <NavLink
          to="/dashboard/execution/solver-assignment"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isSolverAssignment
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Assign Solver
        </NavLink>

        <NavLink
          to="/dashboard/execution/verification-reports"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isVerificationReportPath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Verification Reports
        </NavLink>

        <NavLink
          to="/dashboard/execution/execution-proofs"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isexecutionProofPath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Execution Proofs
        </NavLink>
        <NavLink
          to="/dashboard/execution/tasks/list"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isSolverTaskPath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Solver Tasks
        </NavLink>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
