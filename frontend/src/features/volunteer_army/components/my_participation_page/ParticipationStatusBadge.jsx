// components/volunteer/ParticipationStatusBadge.jsx

const CONFIGS = {
  REGISTERED_LIVE: "bg-green-50 text-green-600",
  REGISTERED:      "bg-blue-50 text-blue-600",
  VERIFIED:        "bg-green-100 text-green-700",
  ATTENDANCE_SUBMITTED: "bg-amber-50 text-amber-600",
  REJECTED:        "bg-red-50 text-red-600",
  NO_SHOW:         "bg-slate-100 text-slate-600",
  LEFT:            "bg-slate-100 text-slate-500",
};

/**
 * @param {string} status       - participation status from API
 * @param {string} runtimeStatus - event runtime_status from API
 */
const ParticipationStatusBadge = ({ status, runtimeStatus }) => {
  if (!status) return null;

  const isLive    = status === "REGISTERED" && runtimeStatus === "LIVE";
  const configKey = isLive ? "REGISTERED_LIVE" : status;
  const style     = CONFIGS[configKey] ?? "bg-slate-100 text-slate-600";
  const label     = isLive ? "LIVE NOW" : status.replace("_", " ");

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-transparent ${style}`}>
      {label}
    </span>
  );
};

export default ParticipationStatusBadge;
