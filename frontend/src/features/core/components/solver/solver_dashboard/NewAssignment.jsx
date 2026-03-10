import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const NewAssignment = ({ NEW_TASKS }) => {
    const navigate = useNavigate();
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          New Assignments
          <span className="text-xs font-semibold text-slate-500">
            ({NEW_TASKS.length})
          </span>
        </h2>
      </div>

      {/* Tasks Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {NEW_TASKS.slice(0, 3).map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="
                        bg-white p-5 rounded-xl
                        border border-slate-200
                        shadow-sm hover:shadow-md
                        transition-shadow
                      "
          >
            <h3 className="font-bold text-slate-800 leading-tight mb-2">
              {task.title}
            </h3>

            <span className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase mb-4">
              {task.category}
            </span>

            <div className="space-y-2 mb-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-bold text-red-600 text-xs">
                  High Priority
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{task.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Assigned {task.time}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="
                      w-full py-2.5
                      bg-blue-600 text-white
                      font-semibold rounded-lg
                      hover:bg-blue-700
                      transition-colors
                      shadow-md shadow-blue-100
                    "
            >
              Review Task
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-5">
        <button
          onClick={() => navigate("/solver/task/list")}
          className="
                    w-full flex items-center justify-center gap-2
                    py-3 rounded-xl
                    border border-dashed border-slate-300
                    text-slate-600 font-semibold
                    hover:border-blue-500 hover:text-blue-600
                    hover:bg-blue-50
                    transition-all
                  "
        >
          View All Tasks
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default NewAssignment;
