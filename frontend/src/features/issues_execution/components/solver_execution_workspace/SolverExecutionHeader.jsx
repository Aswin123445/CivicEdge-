import React from 'react'
import PercentageLoader from '../../ui/solver_execution_workspace/PercentageLoader'

const SolverExecutionHeader = ({taskDetails,progress_stat,isLoadingUpdate}) => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <span>{taskDetails?.reference_id}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="text-blue-600">Field Operations</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">{taskDetails?.issue_title}</h1>
            </div>
            
            {isLoadingUpdate ? <PercentageLoader /> : (<div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Overall Progress</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500" 
                      style={{ width: progress_stat }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{progress_stat}%</span>
                </div>
              </div>
              <div className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 border border-blue-100">
                {taskDetails?.status}
              </div>
            </div>)}
          </div>
        </div>
      </header>
  )
}

export default SolverExecutionHeader
