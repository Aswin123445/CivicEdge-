// components/admin/attendance/AttendanceFiltersBar.jsx
import { Search } from "lucide-react";

/**
 * @param {string}   search
 * @param {function} onSearch - (value: string) => void
 */
const AttendanceFiltersBar = ({ search, onSearch }) => (
  <section className="bg-[#1e1e1e] border border-slate-700 p-4 rounded-xl shadow-sm">
    <div className="relative w-full max-w-md group">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by email or name..."
        value={search ?? ""}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder-slate-500"
      />
    </div>
  </section>
);

export default AttendanceFiltersBar;
