import React from "react";
import { Search, Clock, ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { SearchBarSkeleton } from "./PollListSkeleton";

/**
 * Updated PollSearchBar
 * Non-select sorting with responsive chips
 */
const PollSearchBar = ({
  searchQuery = "",
  sortBy = "newest",
  onSearch,
  onSort,
}) => {

  return (
    <section className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      
      {/* 1. Search Field - High Density */}
      <div className="relative w-full sm:max-w-md">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search polls by keywords..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          value={searchQuery}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* 2. Sort Action Chips - Replaces Select Dropdown */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl w-fit">
        <button
          onClick={() => onSort?.("-created_at")}
          className={`flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
            sortBy === "newest"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ArrowUpWideNarrow size={14} />
          Newest
        </button>
        
        <button
          onClick={() => onSort?.("created_at")}
          className={`flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
            sortBy === "created_at"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ArrowDownWideNarrow size={14} />
          Oldest
        </button>
      </div>

    </section>
  );
};

export default PollSearchBar;