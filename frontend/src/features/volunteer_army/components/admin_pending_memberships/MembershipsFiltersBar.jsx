// components/admin/memberships/MembershipsFiltersBar.jsx
import { Search } from "lucide-react";

// Sort tabs
const SORT_TABS = [
  { value: "-created_at", label: "Newest First" },
  { value: "created_at", label: "Oldest First" },
];

/**
 * @param {string}   search
 * @param {string}   groupFilter  - active group tab value
 * @param {string}   sort
 * @param {Array}    groupTabs    - [{ value, label }] derived from data
 * @param {function} onSearch
 * @param {function} onGroupChange
 * @param {function} onSortChange
 */
const MembershipsFiltersBar = ({ search, sort, onSearch, onSortChange }) => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700/50 p-4 rounded-xl flex flex-col gap-4">
      {/* Row 1: Search */}
      <div className="relative w-full lg:w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors w-4 h-4" />
        <input
          type="text"
          placeholder="Search by email or group..."
          value={search ?? ""}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200 placeholder-slate-500 transition-all"
        />
      </div>

      {/* Row 3: Sort tabs */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
          Sort
        </span>
        <div className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl">
          {SORT_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onSortChange?.(tab.value)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                sort === tab.value
                  ? "bg-[#1e1e1e] text-blue-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipsFiltersBar;
