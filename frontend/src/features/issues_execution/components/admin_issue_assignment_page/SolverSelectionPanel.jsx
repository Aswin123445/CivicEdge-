import { act, useState } from "react";
import StatusIndicator from "../../ui/admin_issue_assignment_page/StatusIndicator";
import Pagination from "../../../../components/common/PaginationBar";
import SolverCardSkelton from "./SolverCardSkelton";

const SolverSelectionPanel = ({
  issue,
  solvers,
  handleInitiateAssignment,
  pagination,
  search,
  setSearchValue,
  activeTab,
  onTabChange,
  zones,
  solverListLoading,
  solverListFetching,
}) => {
  const [availabilityFilter] = useState("ALL");
  const filteredSolvers = solvers.filter((solver) => {
    const matchesSearch = solver.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "ALL" ||
      solver.availability === availabilityFilter;

    return matchesSearch && matchesAvailability;
  });

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl flex flex-col h-full shadow-sm">
      {/* Header */}

      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-slate-200">Recommended Solvers</h2>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">
            Zone Match: {issue.location.zone}
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search solver..."
          value={search}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 bg-[#1e1e1e] border border-slate-700 text-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        {/* Availability Filter */}
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          className="bg-[#1e1e1e] border border-slate-700 text-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="All">All</option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      {/* Solver List */}
      {solverListLoading || solverListFetching ? (
        <SolverCardSkelton />
      ) : (
        <div className="p-4 space-y-3 overflow-y-auto max-h-[600px]">
          {filteredSolvers.map((solver) => (
            <div
              key={solver.id}
              className="group relative bg-[#1e1e1e] border border-slate-800 hover:border-blue-500/50 rounded-lg p-4 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {solver.name}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <span>{solver.zone}</span>
                    <span>•</span>
                    <span>{solver.task_count} Active Tasks</span>
                  </div>
                </div>
                <StatusIndicator status={solver.is_available} />
              </div>

              <button
                disabled={!solver.is_available}
                onClick={() => handleInitiateAssignment(solver)}
                className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-all ${
                  solver.is_available
                    ? "bg-green-700 hover:bg-green-600 text-white"
                    : "bg-green-900 text-slate-600 cursor-not-allowed border border-slate-800"
                }`}
              >
                {solver.is_available ? "Assign to Solver" : "Unavailable"}
              </button>
            </div>
          ))}

          {filteredSolvers.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-8">
              No solvers found
            </div>
          )}
        </div>
      )}
      {!pagination?.isSinglePage && (
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
      {/* Footer */}
      <div className="mt-auto p-4 bg-slate-800/20 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          Solvers are ranked by proximity to {issue.zone} and current bandwidth.
        </p>
      </div>
    </section>
  );
};

export default SolverSelectionPanel;
