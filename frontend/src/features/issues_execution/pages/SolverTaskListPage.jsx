import React, { useState } from "react";
import SolverTaskHeader from "../components/solver_task_list_page/SolverTaskHeader";
import TaskMetrics from "../components/solver_task_list_page/TaskMetrics";
import TaskFilters from "../components/solver_task_list_page/TaskFilters";
import TaskCard from "../components/solver_task_list_page/TaskCard";

import useSolverTaskListHook from "../hooks/solver/solverTaskListHook";
import Pagination from "../../../components/common/PaginationBar";
import { useSearchParams } from "react-router-dom";
import SolverTaskListSkeleton from "../components/solver_task_list_page/SolverTaskListSkeleton";
import SolverCardSkelton from "../components/solver_task_list_page/SolverCardSkelton";
import SolverListEmpty from "../components/solver_task_list_page/EmptyMessage";

const SolverTaskListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // --- STATE MANAGEMENT ---
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    solverTasks,
    solverTasksLoading,
    solverTasksFetching,
    aggregatedCount,
    pagination,
    refetch
  } = useSolverTaskListHook();

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- COMPONENT: PageHeader --- */}
        <SolverTaskHeader refetch={refetch} isFetching={solverTasksFetching} />

        {/* --- COMPONENT: TaskMetrics --- */}
        {solverTasksLoading ? (
          <SolverTaskListSkeleton />
        ) : (
          <>
            <TaskMetrics metrics={aggregatedCount} />

            {/* MAIN LAYOUT GRID */}
            <div className="grid grid-cols-12 gap-8">
              {/* LEFT: Task List Area */}
              <main className="col-span-12 lg:col-span-12 space-y-6">
                {/* --- COMPONENT: TaskFilters --- */}
                <TaskFilters
                  onTabChange={handleFilterChange}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  setSearchQuery={pagination.setSearchValue}
                  search={pagination.searchValue}
                />

                {/* --- COMPONENT: TaskGrid --- */}
                {solverTasksFetching ? (
                  <SolverCardSkelton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {solverTasks?.length === 0 ? (
                      <div className="col-span-full flex justify-center items-center py-12">
                        <SolverListEmpty />
                      </div>
                    ) : (
                      solverTasks?.map((task) => (
                        /* --- COMPONENT: TaskCard --- */
                        <TaskCard key={task.id} task={task} />
                      ))
                    )}
                  </div>
                )}
                {/* pagination place holder */}
              </main>
            </div>
          </>
        )}
      </div>
      {!pagination?.isSinglePage && (
        <div className=" bottom-0 py-4 ">
          <Pagination
            currentPage={pagination?.page}
            totalPages={pagination?.totalPages}
            isFirstPage={pagination?.isFirstPage}
            isLastPage={pagination?.isLastPage}
            onPageChange={pagination?.goToPage}
            className="bg-blue-200/80"
            buttonClassName=""
          />
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS (Internal Helpers) ---

export default SolverTaskListPage;
