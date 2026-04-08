import { Search } from "lucide-react";
import Skeleton from "./Skeleton";

/**
 * PollControlsBar
 *
 * Props:
 *   searchQuery   string
 *   statusFilter  "all" | "active" | "closed"
 *   sortBy        string
 *   onSearch      (value: string) => void
 *   onFilter      (status: string) => void
 *   onSort        (sort: string) => void
 *   isLoading     boolean
 */
const PollControlsBar = ({
  searchQuery = "",
  statusFilter = "all",
  // sortBy = "newest",
  onSearch,
  onFilter,
  // onSort,
  isLoading = false,
}) => {

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 p-4 rounded-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search polls by question..."
          className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={searchQuery}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
        {/* Status toggle */}
        <div className="flex bg-[#1e1e1e] border border-slate-700 p-1 rounded-xl">
          {["all", "active", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => onFilter?.(s)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                statusFilter === s
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort */}
        {/* <select
          className="bg-[#1e1e1e] border border-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl outline-none hover:border-slate-600 transition-all cursor-pointer"
          value={sortBy}
          onChange={(e) => onSort?.(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="most_votes">Most Votes</option>
          <option value="ending_soon">Ending Soon</option>
        </select> */}
      </div>
    </section>
  );
};

export default PollControlsBar;
