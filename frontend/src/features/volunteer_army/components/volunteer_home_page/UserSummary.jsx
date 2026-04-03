// components/volunteer/UserSummary.jsx

/**
 * @param {object} user      - { full_name, role, groups_count, events_count }
 * @param {string} initials  - e.g. "JD"
 */
const UserSummary = ({ user = {}, initials = "?",quickAction }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
        {initials}
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{user?.profile?.name ?? "—"}</h4>
        <p className="text-sm text-slate-500 ">{user.role ?? "Citizen"}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
      <div className="text-center">
        <div className="text-xl font-bold text-slate-900">
          {String(quickAction?.memberships_count ?? 0).padStart(2, "0")}
        </div>
        <div className="text-xs text-slate-500 uppercase">Groups</div>
      </div>
      <div className="text-center border-l border-slate-100">
        <div className="text-xl font-bold text-slate-900">
          {String(quickAction?.participations_count ?? 0).padStart(2, "0")}
        </div>
        <div className="text-xs text-slate-500 uppercase">Events</div>
      </div>
    </div>
  </div>
);

export default UserSummary;
