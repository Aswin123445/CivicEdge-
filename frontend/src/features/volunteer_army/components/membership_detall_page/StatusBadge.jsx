// components/volunteer/StatusBadge.jsx

/**
 * @param {"PENDING"|"SUBMITTED"|"ACTIVE"|"REJECTED"} status
 */
const StatusBadge = ({ status }) => {
  const styles = {
    PENDING:   "bg-amber-50 text-amber-700 border-amber-100",
    SUBMITTED: "bg-blue-50 text-blue-700 border-blue-100",
    ACTIVE:    "bg-green-50 text-green-700 border-green-100",
    REJECTED:  "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
