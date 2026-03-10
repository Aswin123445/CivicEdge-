import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
const RightInProgress = ({ IN_PROGRESS }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">
                In Progress Tasks
              </h3>
              <div className="space-y-6">
                {IN_PROGRESS.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{task.title}</span>
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> Due Soon {task.due}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className="h-full bg-blue-600"
                      />
                    </div>
                    <p className="text-right text-[10px] text-slate-400 font-bold">
                      {task.progress}% Complete
                    </p>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default RightInProgress
