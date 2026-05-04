import { Search } from "lucide-react";

const TABS = [
  "All",
  "IN_REVIEW",
  "IN_PROGRESS",
  "RESOLVED",
  "POSTPONED",
  "REJECTED",
  // "CANCELLED",
];

const ComplaintFilters = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col space-y-6 mb-7">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by reference ID or location"
          className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4
                   focus:outline-none focus:ring-2 focus:ring-blue-100
                   text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Tabs */}
      <nav className="flex space-x-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              (onTabChange(tab));
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
            ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ComplaintFilters;
