import React from 'react';
import { Layers, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const UniversalEmptyState = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden flex flex-col items-center justify-center  px-6 rounded-[32px] border border-slate-100 bg-white shadow-sm"
    >
      {/* 🟦 Primary Blue Brand Glow (Civic Identity) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-50/40 blur-[100px] rounded-full pointer-events-none" />

      {/* 🎨 Abstract Iconography */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center border border-slate-100 rotate-3">
          <Layers className="w-8 h-8 text-blue-500/30 -rotate-3" />
        </div>
        {/* Subtle decorative dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm" />
      </div>

      {/* ✍️ Universal Civic Copy */}
      <div className="text-center max-w-sm mb-10 z-10">
        <h2 className="text-2xl font-semibold text-slate-800 mb-3 tracking-tight">
          No records to show
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4">
          There are currently no issues matching your current view or history. 
          Use the button below to start a new entry.
        </p>
      </div>

      {/* ⚡ The Primary Action */}
      <button 
        onClick={() => navigate("/issue/new")}
        className="
          group flex items-center gap-3 bg-blue-600 text-white 
          px-10 py-4 rounded-2xl font-bold 
          hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 
          transition-all duration-300 active:scale-95 z-10
        "
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span>New Complaint</span>
      </button>

      {/* Subtle Platform Footer */}
      <div className="mt-12 flex items-center gap-2 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />

        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      </div>
    </motion.div>
  );
};

export default UniversalEmptyState;