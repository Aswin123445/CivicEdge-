import React from 'react'

  const filters = [
    {CODE: "All", label: "All"},
    {CODE: "ASSIGNED", label: "Assigned"},
    {CODE: "VERIFICATION_SUBMITTED", label: "Verification Submitted"},
    {CODE: "APPROVED_FOR_EXECUTION", label: "Approved for Execution"},
    {CODE: "IN_EXECUTION", label: "In Execution"},
    {CODE: "COMPLETION_SUBMITTED", label: "Completion Submitted"},
    {CODE: "COMPLETED", label: "Completed"},
  ];
const TaskFilters = ({activeFilter, setActiveFilter, setSearchQuery,search,onTabChange}) => {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value = {search}
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                {filters.map((filter) => (
                  <button
                    key={filter.CODE}
                    onClick={() => {onTabChange(filter.CODE),setActiveFilter(filter.CODE)}}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                      activeFilter === filter.CODE
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
  )
}

export default TaskFilters
