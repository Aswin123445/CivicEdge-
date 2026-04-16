import { ListFilter, Search, Filter,CalendarDays, RotateCcw } from "lucide-react";
const AdminPostsFilter = ({
  search,
  onSearch,
  onStatusChange,
  statusFilter,
  orderingFilter,
  onOrderingChange,
  setSearchParams
}) => {
  const handleReset = () => {
    setSearchParams((pre) => {
      pre.delete("search");
      pre.delete("status");
      pre.delete("target_type");
      pre.delete("ordering");
      return pre;
    });
  };

  return (
    <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center">
      {/* Search Input - Using pagination.searchValue */}
      <div className="relative w-full lg:max-w-xs">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by title,reference ID..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#1e1e1e] border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue-500 transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">


        {/* Filter by Status (status) */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={statusFilter || "ALL"}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none bg-[#1e1e1e] border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg pl-9 pr-8 py-2 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">All</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
            <option value="removed">Removed</option>
          </select>
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>

        {/* Sort By Date (ordering) */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={orderingFilter}
            onChange={(e) => onOrderingChange( e.target.value)}
            className="w-full appearance-none bg-[#1e1e1e] border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg pl-9 pr-8 py-2 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
          </select>
          <CalendarDays
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>

        <button
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Reset All"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};

export default AdminPostsFilter;