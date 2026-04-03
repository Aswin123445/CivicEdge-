// components/volunteer/EventStatusBadge.jsx

const CONFIG = {
  UPCOMING:  "bg-blue-50 text-blue-600 border-blue-100",
  LIVE:      "bg-green-50 text-green-600 border-green-100",
  ONGOING:   "bg-green-50 text-green-600 border-green-100",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
};

/**
 * @param {"UPCOMING"|"LIVE"|"ONGOING"|"COMPLETED"} status
 */
const EventStatusBadge = ({ status }) => {
  if (!status) return null;

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${CONFIG[status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
    >
      {status}
    </span>
  );
};

export default EventStatusBadge;
