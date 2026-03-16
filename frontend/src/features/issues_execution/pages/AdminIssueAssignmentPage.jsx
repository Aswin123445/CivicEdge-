import React, { useState, useEffect } from "react";
import PageHeader from "../components/admin_issue_assignment_page/PageHeader";
import IssueDetailsCard from "../components/admin_issue_assignment_page/IssueDetailsCard";
import SolverSelectionPanel from "../components/admin_issue_assignment_page/SolverSelectionPanel";
import AssignSolverModal from "../components/admin_issue_assignment_page/modal/AssignSolverModal";
import useAdminIssueAssignService from "../hooks/admin/admin_issue_assign_page/service_hook";
import { useSearchParams } from "react-router-dom";
import IssueAssignmentSkeleton from "../components/admin_issue_assignment_page/IssueAssignmentSkeleton";

const AdminIssueAssignmentPage = () => {
    // --- STATE MANAGEMENT ---
  const [issue, setIssue] = useState(null);
  const [selectedSolver, setSelectedSolver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    issueDetails,
    issueDetailsLoading,
    pagination,
    solverList,
    solverListLoading,
    solverListFetching,
    zones,
    zonesLoading,
    zonesFetching,
    handleAssignSolver
  } = useAdminIssueAssignService();
  const handleConfirmAssignment = async (selectedSolver) => {
    setIsAssigning(true);
    // Simulate POST /admin/in-review/issues/{issue_id}/assign-solver/
    await handleAssignSolver(issueDetails.id, selectedSolver.id); 
    setIsAssigning(false);
    setIsModalOpen(false);

  };



  // --- HANDLERS ---
  const handleInitiateAssignment = (solver) => {
    setSelectedSolver(solver);
    setIsModalOpen(true);
  };

  if (issueDetailsLoading)
    return (
      <IssueAssignmentSkeleton  />
    );
  const handleFilterChange = (tab) => {
    if (tab === "All") {
      setSearchParams((pre) => {
        pre.delete("location");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("location", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- COMPONENT: PageHeader --- */}
        <PageHeader issue={issueDetails} />

        <div className="grid grid-cols-12 gap-6">
          {/* --- LEFT COLUMN: Issue Context --- */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* COMPONENT: IssueDetailsCard */}
            <IssueDetailsCard issue={issueDetails} />
          </div>

          {/* --- RIGHT COLUMN: Solver Selection --- */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* COMPONENT: SolverSelectionPanel */}
            <SolverSelectionPanel
              activeTab={searchParams.get("location") ?? "All"}
              onTabChange={(tab) => handleFilterChange(tab)}
              issue={issueDetails}
              solvers={solverList}
              handleInitiateAssignment={handleInitiateAssignment}
              pagination={pagination}
              handleFilterChange={handleFilterChange}
              search={pagination.searchValue}
              setSearchValue={pagination.setSearchValue}
              zones={zones}
              zonesLoading={zonesLoading}
              zonesFetching={zonesFetching}
              solverListLoading={solverListLoading}
              solverListFetching={solverListFetching}
            />
          </div>
        </div>

        {/* --- COMPONENT: AssignSolverModal --- */}
        {isModalOpen && (
          <AssignSolverModal
            issue={issueDetails}
            selectedSolver={selectedSolver}
            isAssigning={isAssigning}
            handleConfirmAssignment={handleConfirmAssignment}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
};

// --- HELPER UI COMPONENTS (Internal for single file) ---

export default AdminIssueAssignmentPage;
