// components/volunteer/EventListHeader.jsx
import { Search } from "lucide-react";

// ─── Skeleton ────────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EventListHeaderSkeleton = () => (
  <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-3">
        <Pulse className="h-10 w-64" />
        <Pulse className="h-5 w-80" />
      </div>
      <Pulse className="h-12 w-full md:w-80 rounded-xl" />
    </div>
  </header>
);

// ─── Component ───────────────────────────────────────────
/**
 * @param {string}   searchQuery
 * @param {function} onSearch    - (value: string) => void
 */
const EventListHeader = ({ searchQuery = "", onSearch }) => (
  <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Volunteer Events
        </h1>
        <p className="text-slate-500 text-lg max-w-xl">
          Join activities and contribute to your community.
        </p>
      </div>

      <div className="relative w-full md:w-80 group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          size={20}
        />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
        />
      </div>
    </div>
  </header>
);

export default EventListHeader;
