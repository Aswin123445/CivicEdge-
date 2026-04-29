// components/admin/volunteer-groups/GroupActionsDropdown.jsx
import { ExternalLink, CheckCircle2, Archive } from "lucide-react";

/**
 * @param {object}   group       - group object
 * @param {function} onView      - () => void
 * @param {function} onActivate  - () => void
 * @param {function} onArchive   - () => void
 */
const GroupActionsDropdown = ({
  group,
  onView,
  onActivate,
  onArchive,
  activateGroupLoading,
  archiveGroupLoading,
  setEditModalOpen,
  setActiveGroup
}) => {
  if (!group) return null;

  return (
    <div className="absolute right-6 top-14 w-48 bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
      {/* <button
        onClick={onView}
        className="w-full px-4 py-3 text-left text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
      >
        <ExternalLink size={14} /> View Details
      </button> */}

      {group.status === "DRAFT" && (
        <div>
          <button
            onClick={() => {
              setEditModalOpen(true);
              setActiveGroup(group);
            }}
            className="w-full px-4 py-3 text-left text-xs font-bold text-gray-200 hover:bg-green-500/10 flex items-center gap-2 border-t border-slate-800"
          >
            <CheckCircle2 size={14} />{" "}
            {activateGroupLoading ? "please wait..." : "Edit"}
          </button>
          <button
            onClick={onActivate}
            className="w-full px-4 py-3 text-left text-xs font-bold text-green-400 hover:bg-green-500/10 flex items-center gap-2 border-t border-slate-800"
          >
            <CheckCircle2 size={14} />{" "}
            {activateGroupLoading ? "Activating..." : "Activate"}
          </button>
        </div>
      )}

      {group.status !== "ARCHIVED" && (
        <button
          onClick={onArchive}
          className="w-full px-4 py-3 text-left text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-slate-800"
        >
          <Archive size={14} />{" "}
          {archiveGroupLoading ? "Archiving..." : "Archive"}
        </button>
      )}
    </div>
  );
};

export default GroupActionsDropdown;
