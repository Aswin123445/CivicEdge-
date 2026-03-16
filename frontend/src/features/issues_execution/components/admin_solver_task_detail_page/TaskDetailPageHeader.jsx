import React from 'react'
import Badge from '../../ui/admin_solver_task_detail_page/Badge'

const TaskDetailPageHeader = ({task}) => {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <nav className="text-xs text-slate-500 mb-2 uppercase tracking-widest">
              Tasks / {task?.reference_id}
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{task?.issue_title}</h1>
            <div className="flex flex-wrap gap-4 mt-3">
              <Badge label={task?.category_name} color="blue" />
              <Badge label={`Zone: ${task?.zone}`} color="slate" />
              <Badge label={task?.status.replace('_', ' ')} color="emerald" />
            </div>
          </div>

        </header>
  )
}

export default TaskDetailPageHeader
