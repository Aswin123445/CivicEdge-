import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MoreVertical,
} from "lucide-react";
import useActivityLogs from "../../../monitoring/hooks/activity-log/activityLogs";
import Pagination from "../../../../components/common/PaginationBar";

const ActivitySkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

// --- MAIN USER ACTIVITY PAGE ---
const UserActivityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { activityLogs, activityLoading, activityFetching, pagination } =
    useActivityLogs();
  // User-Centric Mock Data
  const data = activityLogs;
  const isLoading = activityLoading || activityFetching;
  const handleFilterChange = (tab) => {
    if (tab === "ALL") {
      setSearchParams((pre) => {
        pre.delete("entity");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("entity", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* HEADER SECTION */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Activity
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Keep track of your contributions and interactions in the community.
          </p>
        </header>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2 mb-8 shadow-sm flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search your activity..."
              value={pagination.searchValue}
              onChange={(e) => pagination.setSearchValue(e.target.value)}
              className="w-full bg-transparent pl-11 pr-4 py-3 text-sm focus:outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-1 border-t md:border-t-0 md:border-l border-gray-100 px-2 pt-2 md:pt-0">
            {["ALL", "ISSUE", "FORUM", "TASK"].map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  pagination.searchParams.get("entity") === f
                    ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                    : "text-slate-500 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <main className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <ActivitySkeleton />
            </div>
          ) : data.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {data.map((log) => (
                <div
                  key={log.id}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-5">
                    {/* ICON CIRCLE */}

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                          {log.entity} • {log.action}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={12} />
                          <span className="text-xs font-medium">
                            {new Date(log.created_at).toLocaleDateString(
                              undefined,
                              { month: "short", day: "numeric" },
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-700 font-semibold text-base leading-snug group-hover:text-slate-900 transition-colors">
                        {log.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">
                No activity found for your current search.
              </p>
            </div>
          )}
        </main>
        {!pagination.isSinglePage && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={pagination.goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default UserActivityPage;
