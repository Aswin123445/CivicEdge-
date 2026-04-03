// components/admin/events/participants/ParticipantsFiltersBar.jsx
import { Search } from "lucide-react";

const STATUS_TABS = ["ALL", "REGISTERED", "ATTENDANCE_SUBMITTED", "VERIFIED", "REJECTED", "NO_SHOW", "LEFT"];
const SORT_TABS   = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

/**
 * @param {string}   search
 * @param {string}   statusFilter
 * @param {string}   sort
 * @param {function} onSearch
 * @param {function} onStatusChange
 * @param {function} onSortChange
 */
const ParticipantsFiltersBar = ({
  search,
  statusFilter,
  sort,
  onSearch,
  onStatusChange,
  onSortChange,
}) => (
  <div className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-2xl flex flex-col gap-4">

    {/* Row 1: Search */}
    <div className="relative w-full lg:w-96 group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by email or reference ID..."
        value={search ?? ""}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-blue-500 outline-none text-slate-200 transition-all"
      />
    </div>

    {/* Row 2: Status tabs — horizontally scrollable */}
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 w-max">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onStatusChange?.(tab)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black whitespace-nowrap transition-all ${
              statusFilter === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
            }`}
          >
            {tab === "ALL" ? "All" : tab.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    </div>

    {/* Row 3: Sort tabs */}
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mr-1">
        Sort
      </span>
      {SORT_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onSortChange?.(tab.value)}
          className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
            sort === tab.value
              ? "bg-blue-600 text-white"
              : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default ParticipantsFiltersBar;
