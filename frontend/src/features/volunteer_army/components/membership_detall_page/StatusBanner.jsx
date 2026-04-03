// components/volunteer/StatusBanner.jsx
import { Info, Clock, CheckCircle2, XCircle } from "lucide-react";

const BANNER_CONFIG = {
  PENDING: {
    classes: "bg-amber-50 border-amber-100 text-amber-800",
    icon: Info,
    message: "Complete your application to join this group",
  },
  SUBMITTED: {
    classes: "bg-blue-50 border-blue-100 text-blue-800",
    icon: Clock,
    message: "Your application is under review",
  },
  ACTIVE: {
    classes: "bg-green-50 border-green-100 text-green-800",
    icon: CheckCircle2,
    message: "You are now an active member of this group",
  },
  REJECTED: {
    classes: "bg-red-50 border-red-100 text-red-800",
    icon: XCircle,
    message: "Your application was rejected. You can re-apply below.",
  },
};

/**
 * @param {"PENDING"|"SUBMITTED"|"ACTIVE"|"REJECTED"} status
 */
const StatusBanner = ({ status }) => {
  const config = BANNER_CONFIG[status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-xl border flex items-center gap-4 mb-8 ${config.classes}`}>
      <Icon size={24} className="shrink-0" />
      <div className="font-bold">{config.message}</div>
    </div>
  );
};

export default StatusBanner;
