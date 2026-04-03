// components/admin/attendance/AttendanceStatusBadge.jsx

const STYLES = {
  SUBMITTED:     "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  VERIFIED:      "text-green-400 bg-green-500/10 border-green-500/20",
  REJECTED:      "text-red-400 bg-red-500/10 border-red-500/20",
  NOT_SUBMITTED: "text-slate-500 bg-slate-500/10 border-slate-500/20",
};

/**
 * @param {string} status - attendance status from API
 */
const AttendanceStatusBadge = ({ status }) => {
  if (!status) return null;

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${STYLES[status] ?? "text-slate-500 bg-slate-500/10 border-slate-500/20"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
};

export default AttendanceStatusBadge;
