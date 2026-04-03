// components/volunteer/MembershipSidebar.jsx
import { Shield, CheckCircle2, Clock, AlertCircle, ExternalLink } from "lucide-react";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const STATUS_MESSAGES = {
  NONE_OPEN:       "You can join this group instantly.",
  NONE_RESTRICTED: "This group requires approval. You'll need to submit details before joining.",
  PENDING:         "You have an unfinished application for this group.",
  SUBMITTED:       "Your application is currently under review by the group administrators.",
  ACTIVE:          "You are an active member of this community.",
  REJECTED:        "Your previous application was not approved. You may try again if you meet new criteria.",
};

/**
 * Resolves the message key based on status + membership_type
 */
const resolveMessageKey = (status, membershipType) => {
  if (status === "NONE") {
    return membershipType === "OPEN" ? "NONE_OPEN" : "NONE_RESTRICTED";
  }
  return status;
};

/**
 * Status icon map
 */
const StatusIcon = ({ status }) => {
  if (status === "ACTIVE")    return <CheckCircle2 className="text-green-500 shrink-0" size={20} />;
  if (status === "SUBMITTED") return <Clock className="text-yellow-500 shrink-0" size={20} />;
  return <AlertCircle className="text-blue-500 shrink-0" size={20} />;
};

/**
 * CTA button based on membership_status + membership_type
 */
const MembershipCTA = ({ status, membershipType, onAction , joinGroupLoading }) => {
  if (joinGroupLoading){
    return (
      <button
        disabled
        className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-bold cursor-not-allowed border border-slate-200"
      >
        Joining...
      </button>
    )
  }
  switch (status) {
    case "NONE":
      return (
        <button
          onClick={() => onAction("join")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          {membershipType === "OPEN" ? "Join Group Instantly" : "Apply to Join"}
        </button>
      );

    case "PENDING":
      return (
        <button
          onClick={() => onAction("continue")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Continue Application
        </button>
      );

    case "SUBMITTED":
      return (
        <button
          disabled
          className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-bold cursor-not-allowed border border-slate-200"
        >
          Pending Approval
        </button>
      );

    case "ACTIVE":
      return (
        <div className="space-y-3">
          <button
            onClick={() => onAction("view")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            View Membership <ExternalLink size={16} />
          </button>
        </div>
      );

    case "REJECTED":
      return (
        <div className="bg-red-600 border border-slate-800 rounded-xl p-6 text-center">
      <p className="text-white font-semibold text-lg">
        Cannot join the group.
      </p>
      <p className="text-white text-sm mt-1">
        The documents you submitted did not meet the requirements.
      </p>
    </div>
      );
    case "LEFT":
  return (
    <div className="bg-red-600 border border-slate-800 rounded-xl p-6 text-center">
      <p className="text-white font-semibold text-lg">
        You have left this group.
      </p>
      <p className="text-white text-sm mt-1">
        You are no longer a member and cannot participate in its activities.
      </p>
    </div>
  );
    default:
      return null;
  }
};

/**
 * @param {object}   group      - { membership_type, risk_level, created_at, membership_status }
 * @param {function} onAction   - (action: "join"|"continue"|"view"|"leave"|"reapply") => void
 */
const MembershipSidebar = ({ group, onAction }) => {
  const { membership_type, risk_level, created_at, membership_status } = group;

  const messageKey = resolveMessageKey(membership_status, membership_type);

  return (
    <aside className="lg:sticky lg:top-8 space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
          <Shield size={18} className="text-blue-600" />
          Membership Details
        </h3>

        {/* Info rows */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Type</span>
            <span className="text-slate-900 font-semibold">
              {membership_type === "OPEN" ? "Open" : "Restricted"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Risk Level</span>
            <span
              className={`font-semibold ${
                risk_level === "HIGH" ? "text-red-600" : "text-slate-900"
              }`}
            >
              {risk_level}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Created On</span>
            <span className="text-slate-900 font-semibold">
              {formatDate(created_at)}
            </span>
          </div>
        </div>

        {/* Status message + CTA */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-start gap-3 mb-4">
            <StatusIcon status={membership_status} />
            <p className="text-xs leading-relaxed text-slate-600 italic">
              {STATUS_MESSAGES[messageKey]}
            </p>
          </div>
          <MembershipCTA
            status={membership_status}
            membershipType={membership_type}
            onAction={onAction}
          />
        </div>
      </div>
    </aside>
  );
};

export default MembershipSidebar;
