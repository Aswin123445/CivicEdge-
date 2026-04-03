// components/admin/memberships/MembershipTypeBadge.jsx

const STYLES = {
  OPEN:              "bg-green-500/10 text-green-500 border-green-500/20",
  APPROVAL_REQUIRED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

/**
 * @param {string} type - "OPEN" | "APPROVAL_REQUIRED"
 */
const MembershipTypeBadge = ({ type }) => {
  if (!type) return null;

  return (
    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${STYLES[type] ?? "bg-slate-700 text-slate-400 border-slate-600"}`}>
      {type.replace(/_/g, " ")}
    </span>
  );
};

export default MembershipTypeBadge;
