// components/admin/events/participants/ParticipantStatusBadge.jsx

const STYLES = {
  REGISTERED:           "bg-blue-500/10 text-blue-400",
  ATTENDANCE_SUBMITTED: "bg-amber-500/10 text-amber-400",
  VERIFIED:             "bg-green-500/10 text-green-400",
  REJECTED:             "bg-red-500/10 text-red-400",
  NO_SHOW:              "bg-slate-700 text-slate-400",
  LEFT:                 "bg-slate-700 text-slate-500",
};

/**
 * @param {string} status - participation status from API
 */
const ParticipantStatusBadge = ({ status }) => {
  if (!status) return null;

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        STYLES[status] ?? "bg-slate-700 text-slate-300"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default ParticipantStatusBadge;
