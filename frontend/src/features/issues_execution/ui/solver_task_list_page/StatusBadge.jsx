const StatusBadge = ({ status }) => {
  const STATUS_CONFIG = {
    ASSIGNED: {
      label: "Assigned",
      style: "bg-blue-100 text-blue-700",
    },

    VERIFICATION_SUBMITTED: {
      label: "Verification Submitted",
      style: "bg-purple-100 text-purple-700",
    },

    APPROVED_FOR_EXECUTION: {
      label: "Approved for Execution",
      style: "bg-indigo-100 text-indigo-700",
    },

    IN_EXECUTION: {
      label: "In Execution",
      style: "bg-amber-100 text-amber-700",
    },

    COMPLETION_SUBMITTED: {
      label: "Completion Submitted",
      style: "bg-cyan-100 text-cyan-700",
    },

    COMPLETED: {
      label: "Completed",
      style: "bg-green-100 text-green-700",
    },

    TERMINATED: {
      label: "Terminated",
      style: "bg-rose-100 text-rose-700",
    },
  };

  const config = STATUS_CONFIG[status] || {
    label: status,
    style: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        text-[11px]
        font-semibold
        px-2.5
        py-1
        rounded-full
        tracking-wide
        ${config.style}
      `}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;