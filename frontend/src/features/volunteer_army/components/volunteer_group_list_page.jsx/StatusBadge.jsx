// components/shared/StatusBadge.jsx

/**
 * @param {"OPEN"|"RESTRICTED"} status
 */
const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
      status === "OPEN"
        ? "bg-green-50 text-green-600"
        : "bg-yellow-50 text-yellow-600"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
