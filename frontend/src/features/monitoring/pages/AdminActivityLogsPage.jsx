import React, { useState, useEffect } from "react";
import {
  Activity,
  PlusCircle,
  CheckCircle,
  ShieldCheck,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Clock,
} from "lucide-react";
import useActivityLogs from "../hooks/activity-log/activityLogs";
import PendingReviewSkeleton from "../../issues_execution/components/pending_review_page/PendingReviewSkeleton";
import TableSkeleton from "../../issues_execution/components/pending_review_page/TableSkelton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/common/PaginationBar";

/**
 * CIVICEDGE ADMIN: MONITORING ACTIVITY LOGS
 * ---------------------------------------
 * Component Split Guide:
 * - ./components/admin/monitoring/SummaryCards.jsx
 * - ./components/admin/monitoring/FiltersBar.jsx
 * - ./components/admin/monitoring/ActivityTable.jsx
 * - ./components/admin/monitoring/SkeletonLoader.jsx
 */

// --- SUB-COMPONENT: SKELETON LOADER ---
const SkeletonLoader = () => (
  <div className="space-y-8 animate-pulse">
    {/* Cards Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-24 bg-[#1e1e1e] border border-slate-800 rounded-xl"
        />
      ))}
    </div>
    {/* Table Skeleton */}
    <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden">
      <div className="h-12 bg-slate-800/50 border-b border-slate-700" />
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="px-6 py-4 border-b border-slate-800 flex items-center gap-4"
        >
          <div className="h-4 w-16 bg-slate-800 rounded" />
          <div className="h-4 w-20 bg-slate-800 rounded-full" />
          <div className="h-4 flex-1 bg-slate-800 rounded" />
          <div className="h-4 w-24 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN MONITORING PAGE ---
const AdminActivityLogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    activityLoading,
    activityFetching,
    activityLogs,
    pagination,
    totalCount,
    mostActiveEntity,
    mostActiveAction,
    issueCount,
    taskCount,
    forumCount,
    pollCount,
    eventCount
  } = useActivityLogs();
  // --- STATE MANAGEMENT ---
  const isLoading = activityLoading;

  const data = activityLogs;  

  // --- HELPERS ---
  const handleReset = () => {
    setSearchParams({});
  };

  const getActionColor = (action) => {
    switch (action) {
      case "CREATED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "ASSIGNED":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "DELETED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };
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
  const handleActionChange = (tab) => {
    if (tab === "ALL") {
      setSearchParams((pre) => {
        pre.delete("action");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("action", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };

  if (isLoading) return <PendingReviewSkeleton />;

  return (
    <div className=" bg-[#1e1e1e] text-slate-100 p-4 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SECTION 6.1: Page Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Activity Logs
              </h1>
              <span className="bg-blue-600/10 text-blue-400 text-xs font-bold px-2 py-1 rounded-full border border-blue-600/20">
                {totalCount} Total
              </span>
            </div>
            <p className="text-slate-400 mt-1">
              Monitor all system activity across the platform
            </p>
          </div>
        </header>

        {/* SECTION 6.2: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Activities",
              value: totalCount,
              icon: Activity,
              color: "text-blue-500",
            },
            {
              label: "Tasks",
              value: taskCount,
              icon: CheckCircle,
              color: "text-purple-500",
            },
            {
              label: "Forums ",
              value: forumCount,
              icon: ShieldCheck,
              color: "text-orange-500",
            },
            {
              label: "Events",
              value: eventCount,
              icon: ShieldCheck,
              color: "text-orange-500",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#1e1e1e] border border-slate-700 p-5 rounded-xl shadow-sm hover:border-slate-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">
                  {card.label}
                </p>
                <card.icon className={card.color} size={20} />
              </div>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: Main Content (col-span-8) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* SECTION 6.3: FiltersBar */}
            <div className="bg-[#1e1e1e] border border-slate-700 p-4 rounded-xl flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search activity message..."
                  value={pagination.searchValue}
                  onChange={(e) => pagination.setSearchValue(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <select
                value={searchParams.get("entity") || "ALL"}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="bg-[#1e1e1e] border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All Entities</option>
                <option value="ISSUE">Issue</option>
                <option value="TASK">Task</option>
                <option value="FORUM">Forum</option>
                <option value="POLL">Poll</option>
                <option value="EVENT">Event</option>
                <option value="GROUP">Group</option>
              </select>
              <select
                value={searchParams.get("action") || "ALL"}
                onChange={(e) => handleActionChange(e.target.value)}
                className="bg-[#1e1e1e] border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All Actions</option>
                <option value="CREATED">Created</option>
                <option value="UPDATED">Updated</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="COMPLETED">Completed</option>
                <option value="MODERATED">Moderated</option>
                <option value="CLOSED">Closed</option>
              </select>
              <button
                onClick={handleReset}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* SECTION 6.4: Activity Logs Table */}
            <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                {activityFetching ? (
                  <TableSkeleton />
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#1e1e1e]/50 border-b border-slate-700">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Entity
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Action
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Message
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {data.length > 0 ? (
                        data.map((log) => (
                          <tr
                            key={log.id}
                            className="hover:bg-slate-800/50 transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                                <Layers size={14} className="text-blue-500" />
                                {log.entity}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getActionColor(log.action)}`}
                              >
                                {log.action}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-300 line-clamp-1">
                                {log.message}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-slate-500 text-xs">
                                <Clock size={12} />
                                {new Date(log.created_at).toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center">
                            <p className="text-slate-500 font-medium">
                              No activity found matches your criteria.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
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

          {/* RIGHT: Sidebar (col-span-4) */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-[#1e1e1e] border border-slate-700 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={18} className="text-blue-500" />
                Quick Analysis
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-600/40 border border-slate-800 rounded-lg">
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Most Active Entity
                  </p>
                  <p className="text-xl font-bold text-slate-200 mt-1">
                    {mostActiveEntity}
                  </p>
                </div>
                <div className="p-4 bg-blue-600/40 border border-slate-800 rounded-lg">
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Common Action
                  </p>
                  <p className="text-xl font-bold text-slate-200 mt-1">
                    {mostActiveAction}
                  </p>
                </div>
                <div className="p-4 bg-blue-600/40 border border-slate-800 rounded-lg">
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    System Health
                  </p>
                  <p className="text-xl font-bold text-green-500 mt-1">
                    Operational
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-xl">
              <p className="text-sm text-blue-400 font-medium">
                Admin Tip: Use the entity filter to narrow down activities
                related specifically to municipal tasks or forum moderation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityLogsPage;
