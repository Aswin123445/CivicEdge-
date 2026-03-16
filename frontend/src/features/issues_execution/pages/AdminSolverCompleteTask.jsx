import PendingReviewSkeleton from "../components/pending_review_page/PendingReviewSkeleton";
import EmptyState from "../components/pending_review_page/EmptyState";
import { useSearchParams } from "react-router-dom";
import TableSkeleton from "../components/pending_review_page/TableSkelton";
import useAdminSolverCompleteTask from "../hooks/admin/admin_solver_complete_task/AdminSolverTaskHook";
import AdminSolverTaskIssueFilters from "../components/admin_solver_task/AdminSolverTaskIssueFilters";
import AdminSolverTable from "../components/admin_solver_task/AdminSolverTable";
import AdminSolverTaskPageHeader from "../components/admin_solver_task/AdminSolverTaskPageHeader";
import AdminSolverSummaryMetrics from "../components/admin_solver_task/AdminSolverSummaryMetrics";
const AdminSolverCompleteTask = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { adminTask, adminTaskLoading, adminTaskFetching, pagination,total,today_count } =
    useAdminSolverCompleteTask();
  const handleFilterChange = (tab) => {
    if (tab === "All") {
      setSearchParams((pre) => {
        pre.delete("status");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("status", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleOderingChange = (ordering) => {
    setSearchParams((pre) => {
      pre.set("ordering", ordering);
      pre.set("page", "1");
      return pre;
    });
  };
  return (
    <div className="flex  bg-[#1e1e1e] text-slate-200 font-sans">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-2 lg:p-8 space-y-4">
          <AdminSolverTaskPageHeader total={total} />

          {adminTaskLoading ? (
            <PendingReviewSkeleton />
          ) : (
            <>
              <AdminSolverSummaryMetrics 
                totalPending={total}
                submittedToday={today_count}
              />

              <AdminSolverTaskIssueFilters
                activeTab={pagination.searchParams.get("status") ?? "All"}
                onTabChange={(tab) => handleFilterChange(tab)}
                search={pagination.searchValue}
                setSearchValue={pagination.setSearchValue}
                handleOderingChange={handleOderingChange}
                activeSort={
                  searchParams.get("ordering") === "-created_at"
                    ? "Newest"
                    : "Oldest"
                }
              />

              {adminTask.length === 0 ? (
                <EmptyState />
              ) : adminTaskFetching ? (
                <TableSkeleton />
              ) : (
                <AdminSolverTable
                  tasks={adminTask}
                  pagination={pagination}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSolverCompleteTask;
