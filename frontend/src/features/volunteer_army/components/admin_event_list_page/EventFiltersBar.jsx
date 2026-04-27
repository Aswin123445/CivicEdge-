// components/admin/events/EventFiltersBar.jsx
import { Search } from "lucide-react";

const STATUS_TABS = ["ALL", "DRAFT", "PUBLISHED", "CANCELLED"];

/**
 * @param {string}   search         - search query value
 * @param {string}   statusFilter   - active tab
 * @param {function} onSearch       - (value: string) => void
 * @param {function} onStatusChange - (status: string) => void
 */
const EventFiltersBar = ({ search, statusFilter, onSearch, onStatusChange }) => (
  <div className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4">
    {/* Search */}
    <div className="relative w-full lg:w-96 group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
        size={18}
      />
      <input
        type="text"
        placeholder="Search events..."
        value={search ?? ""}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-blue-500 outline-none text-slate-200 transition-all"
      />
    </div>

    {/* Status tabs */}
    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
      {STATUS_TABS.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange?.(status)}
          className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
            statusFilter === status
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-slate-300 border border-slate-800 hover:border-slate-700"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
);

export default EventFiltersBar;
