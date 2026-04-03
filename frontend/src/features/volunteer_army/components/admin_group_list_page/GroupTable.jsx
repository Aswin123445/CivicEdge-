// components/admin/volunteer-groups/GroupTable.jsx
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Skeleton from "./Skeleton";
import { GroupStatusBadge, RiskBadge } from "./GroupBadges";
import GroupActionsDropdown from "./GroupActionsDropdown";

// ─── Skeleton ─────────────────────────────────────────
export const GroupTableSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800">
            {["Reference", "Name", "Risk", "Status", "Created", "Actions"].map(
              (h) => (
                <th key={h} className="px-6 py-4">
                  <Skeleton className="h-3 w-16" />
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-5">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </td>
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-14 rounded-full mx-auto" />
              </td>
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-16 rounded-full mx-auto" />
              </td>
              <td className="px-6 py-5">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-5 text-right">
                <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Relative time helper ──────────────────────────────
const relativeTime = (dateString) => {
  if (!dateString) return "—";
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

// ─── Component ────────────────────────────────────────
/**
 * @param {Array}    groups      - filtered groups array
 * @param {function} onView      - (group) => void
 * @param {function} onActivate  - (group) => void
 * @param {function} onArchive   - (group) => void
 */
const GroupTable = ({
  groups = [],
  onView,
  onActivate,
  onArchive,
  activeDropdown,
  setActiveDropdown,
  dropdownRef,
  activateGroupLoading,
  archiveGroupLoading,
}) => {
  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setActiveDropdown((prev) => {
      return prev === id ? null : id;
    });
  };

  return (
    <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1e1e1e] border-b border-slate-800">
              {[
                "Reference",
                "Name",
                "Risk",
                "Status",
                "Created",
                "Actions",
              ].map((h, i) => (
                <th
                  key={h}
                  className={`px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest ${
                    i >= 2 && i <= 3
                      ? "text-center"
                      : i === 5
                        ? "text-right"
                        : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {groups.length > 0 ? (
              groups.map((group) => {
                if (!group?.id) return null;

                return (
                  <tr
                    ref={activeDropdown === group.id ? dropdownRef : null}
                    key={group.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Reference */}
                    <td className="px-6 py-5 whitespace-nowrap text-blue-400 font-mono text-xs font-bold">
                      {group.reference_id ?? "—"}
                    </td>

                    {/* Name */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="font-bold text-slate-100">
                        {group.name ?? "Unnamed Group"}
                      </div>
                      {group.created_by && (
                        <div className="text-[10px] text-slate-500 font-medium">
                          by {group.created_by}
                        </div>
                      )}
                    </td>

                    {/* Risk */}
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <RiskBadge level={group.risk_level} />
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <GroupStatusBadge status={group.status} />
                    </td>

                    {/* Created */}
                    <td className="px-6 py-5 whitespace-nowrap text-slate-400 text-xs font-medium">
                      {relativeTime(group.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 whitespace-nowrap text-right relative">
                      <button
                        onClick={(e) => toggleDropdown(e, group.id)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeDropdown === group.id && (
                        <GroupActionsDropdown
                          group={group}
                          onView={() => {
                            onView?.(group);
                            setActiveDropdown(null);
                          }}
                          onActivate={() => {
                            onActivate?.(group);
                            setActiveDropdown(null);
                          }}
                          onArchive={() => {
                            onArchive?.(group);
                            setActiveDropdown(null);
                          }}
                          activateGroupLoading={activateGroupLoading}
                          archiveGroupLoading = {archiveGroupLoading}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-20 text-center text-slate-500 font-bold"
                >
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable;
