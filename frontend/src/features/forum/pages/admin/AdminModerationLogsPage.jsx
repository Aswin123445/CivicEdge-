import React, { useState } from "react";
import {
  History,
  User,
  Calendar,
  Info,
  ArrowRight,
  ExternalLink,
  Loader2,
  ClipboardList,
  Search,
  Filter,
} from "lucide-react";
import useModerationLogs from "../../hooks/admin/adminModarationLogs";
import Pagination from "../../../../components/common/PaginationBar";
import { EventTableSkeleton } from "../../../volunteer_army/components/admin_event_list_page/EventTable";

/**
 * CIVICEDGE ADMIN: MODERATION LOGS PAGE
 * ---------------------------------------
 * Component Split Guide:
 * - ./components/admin/logs/PageHeader.jsx
 * - ./components/admin/logs/LogsTable.jsx
 * - ./components/admin/logs/LogRow.jsx
 * - ./components/admin/logs/MetadataBadge.jsx
 */

// --- SUB-COMPONENT: SKELETON LOADING ---


// --- SUB-COMPONENT: EMPTY STATE ---
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl text-center">
    <ClipboardList className="text-slate-600 w-12 h-12 mb-4" />
    <h3 className="text-xl font-bold text-slate-100">
      No moderation activity yet
    </h3>
    <p className="text-slate-400 mt-2">
      All admin actions will appear here once performed.
    </p>
  </div>
);

// --- HELPER: METADATA INTERPRETER ---
const RenderMetadata = ({ metadata }) => {
  if (metadata?.previous_status && metadata?.new_status) {
    return (
      <div className="flex items-center gap-2 text-[11px] font-medium">
        <span className="text-slate-500 capitalize">
          {metadata.previous_status}
        </span>
        <ArrowRight size={12} className="text-slate-600" />
        <span className="text-blue-400 capitalize">{metadata.new_status}</span>
      </div>
    );
  }

  const jsonStr = JSON.stringify(metadata);
  return (
    <span className="text-[10px] font-mono text-slate-500 truncate block max-w-[120px]">
      {jsonStr !== "{}" ? jsonStr : "-"}
    </span>
  );
};

// --- MAIN PAGE COMPONENT ---
const AdminModerationLogsPage = () => {
  const {
    getModerationLogsLoading,
    getModerationLogs,
    pagination,
    logs,
    length,
  } = useModerationLogs();
  // --- MOCK DATA (Replace with useGetModerationLogsQuery) ---
  const isLoading = getModerationLogsLoading || getModerationLogs;

  const actionBadges = {
    hide: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    remove: "bg-red-500/10 text-red-400 border-red-500/20",
    restore: "bg-green-500/10 text-green-400 border-green-500/20",
    highlight: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    unhighlight: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
const FILTERS = ["Unhighlight", "Highlight", "Hide", "Restore", "Remove"];
  return (
    <div className=" bg-[#1e1e1e] text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* SECTION: PageHeader */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Moderation Logs
            </h1>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              <History size={16} className="text-blue-500" />
              Track and review all moderation actions across the platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Total Actions
              </span>
              <span className="text-lg font-mono font-bold text-blue-500">
                {length}
              </span>
            </div>
          </div>
        </header>
        <div className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-2 rounded-xl border border-slate-700 w-full max-w-md">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            value={pagination.searchValue}
            onChange={(e) => pagination.setSearchValue(e.target.value)}
            placeholder="type to search..."
            className="bg-transparent outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
        {/* SECTION: Logs Table */}
        <main className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-6">
              <EventTableSkeleton />
            </div>
          ) : logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e1e1e]/50 border-b border-slate-800">
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Moderator
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="group hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Action */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${actionBadges[log.action]}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      {/* Target */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-200 capitalize">
                            {log.target_type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 truncate w-24">
                            {log.target_id.split("-")[0]}...
                          </span>
                        </div>
                      </td>

                      {/* Moderator */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                            <User size={12} className="text-slate-400" />
                          </div>
                          <span className="text-sm font-medium text-slate-300 whitespace-nowrap">
                            {log.moderator.name}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-500 whitespace-nowrap">
                          <Calendar size={13} />
                          <span className="text-xs">
                            {new Date(log.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Reason */}
                      <td className="py-4 px-6">
                        <p
                          className="text-xs text-slate-400 line-clamp-1 max-w-xs"
                          title={log.reason}
                        >
                          {log.reason || "-"}
                        </p>
                      </td>

                      {/* Details (Metadata) */}
                      <td className="py-4 px-6">
                        <RenderMetadata metadata={log.metadata} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
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

export default AdminModerationLogsPage;
