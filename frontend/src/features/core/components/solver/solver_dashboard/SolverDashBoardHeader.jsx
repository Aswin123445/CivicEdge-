import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurrentDateTime from "../../../ui/CurrentDateTime";

const SolverDashBoardHeader = ({  userData, toggleWork }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-wrap items-center gap-6 text-sm">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-500">Status:</span>
        <button
          onClick={() => toggleWork()}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${userData?.profile?.availability ? "bg-green-500" : "bg-slate-300"}`}
        >
          <motion.div
            animate={{ x: userData?.profile?.availability ? 26 : 4 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </button>
        <span
          className={`font-bold ${userData?.profile?.availability ? "text-green-600" : "text-slate-400"}`}
        >
          {userData?.profile?.availability ? "Working" : "Off-Duty"}
        </span>
      </div>

      <div className="flex gap-4">
        <p>
          <span className="text-slate-500">Zone:</span>{" "}
          <span className="font-bold">
            {userData?.profile?.zone || "Unknown Zone"}
          </span>
        </p>
        <CurrentDateTime />
      </div>
    </header>
  );
};

export default SolverDashBoardHeader;
