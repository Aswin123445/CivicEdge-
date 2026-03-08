import React, { useState, useEffect } from "react";
import PageHeader from "../components/solver_assignment_queue_page/PageHeader";
import IssueAssignmentTable from "../components/solver_assignment_queue_page/IssueAssignmentTable";
import StatsCard from "../components/solver_assignment_queue_page/StatsCard";
import AssignmentWorkflowInfo from "../components/solver_assignment_queue_page/AssignmentWorkflowInfo";
import SolverAssignmentQueueSkeleton from "../components/solver_assignment_queue_page/SolverAssignmentQueueSkeleton";
import useAssignSolverService from "../hooks/admin/assign_solver/service_hook";
import Pagination from "../../../components/common/PaginationBar";
import IssueFilters from "../components/pending_review_page/IssueFilters";
import TableSkeleton from "../components/pending_review_page/TableSkelton";
const SolverAssignmentQueuePage = () => {
  const {
    pendingIssueAssign,
    pendingIssueAssignLoading,
    pendingIssueAssignFetching,
    itemCount,
    today_count,
    pagination,
    categoryData,
  } = useAssignSolverService();
  const handleFilterChange = (tab) => {
    if (tab === "All") {
      pagination.setSearchParams((pre) => {
        pre.delete("category");
        return pre;
      });
    } else {
      pagination.setSearchParams((pre) => {
        pre.set("category", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleOderingChange = (ordering) => {
    pagination.setSearchParams((pre) => {
      pre.set("ordering", ordering);
      return pre;
    });
  };
  console.log(pendingIssueAssign, "pendingIssueAssign");

  const handleAssignSolver = (issueId) => {
    console.log(`Initiating assignment workflow for Issue ID: ${issueId}`);
    // Future logic: Open assignment modal or navigate to /admin/assign/:id
  };
  if (pendingIssueAssignLoading) {
    return <SolverAssignmentQueueSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- COMPONENT: PageHeader --- */}
        <PageHeader itemCount={itemCount} />

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Issue List (Main) */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* --- COMPONENT: IssueAssignmentTable --- */}
            <IssueFilters
              activeTab={pagination?.searchParams.get("category") ?? "All"}
              onTabChange={(tab) => handleFilterChange(tab)}
              search={pagination.searchValue}
              setSearchValue={pagination.setSearchValue}
              handleOderingChange={handleOderingChange}
              activeSort={
                pagination.searchParams.get("ordering") === "-created_at"
                  ? "Newest"
                  : "Oldest"
              }
              categories={categoryData}
            />
            {pendingIssueAssignFetching ? (
              <TableSkeleton />
            ) : (
              <IssueAssignmentTable issues={pendingIssueAssign} />
            )}
            {!Pagination?.isSinglePage && (
              <div className="sticky bottom-0 py-4 ">
                <Pagination
                  currentPage={pagination?.page}
                  totalPages={pagination?.totalPages}
                  isFirstPage={pagination?.isFirstPage}
                  isLastPage={pagination?.isLastPage}
                  onPageChange={pagination?.goToPage}
                />
              </div>
            )}
          </main>

          {/* RIGHT COLUMN: Sidebar Panels */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* --- COMPONENT: StatsCard Group --- */}
            <StatsCard issues={pendingIssueAssign} today_count={today_count} />

            {/* --- COMPONENT: AssignmentWorkflowInfo --- */}
            <AssignmentWorkflowInfo />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SolverAssignmentQueuePage;
