import React from 'react'

const TaskDetailsHeaderSolver = ({taskData}) => {
  return (
    <header className="mb-8">
          <nav className="flex items-center text-sm text-slate-400 mb-4 space-x-2">
            <span className="hover:text-blue-600 cursor-pointer transition">Tasks</span>
            <span>/</span>
            <span className="text-slate-600 font-medium">{taskData?.reference_id}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase tracking-wider">
                  {taskData?.reference_id}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${taskData?.status === 'ASSIGNED' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {taskData?.status}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-500">{taskData?.issue_title}</h1>
              <p className="text-slate-500 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                {taskData?.category_name}
              </p>
            </div>
          </div>
        </header>
  )
}

export default TaskDetailsHeaderSolver
