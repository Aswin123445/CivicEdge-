// components/volunteer/GroupListHeader.jsx
import { Search } from "lucide-react";

/**
 * @param {number}   totalCount   - total active groups count
 * @param {string}   searchQuery
 * @param {function} onSearch     - (value: string) => void
 */
const GroupListHeader = ({ totalCount = 0, searchQuery, onSearch }) => (
  <div className="border-b border-slate-100">
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
              {totalCount} Active Group{totalCount !== 1 ? "s" : ""}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Volunteer Groups
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Find communities where you can contribute and grow. Explore diverse
            initiatives making a real impact.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  </div>
);

export default GroupListHeader;
