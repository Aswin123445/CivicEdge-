import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const InProgressTask = ({ IN_PROGRESS }) => {
  return (
   <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">In Progress</h3>
                  <button className="text-sm font-semibold text-blue-600 hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {IN_PROGRESS.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="
                    flex items-start justify-between gap-4
                    p-3 rounded-lg
                    hover:bg-slate-50 transition
                  "
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-700 truncate">
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {task.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-amber-600">
                          {task.progress}%
                        </span>
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 0.4 }}
                            className="h-full bg-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default InProgressTask
