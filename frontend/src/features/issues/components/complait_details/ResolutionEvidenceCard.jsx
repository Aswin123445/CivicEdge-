import { CheckCircle2, XCircle, Ban } from "lucide-react";

const STATUS_CONFIG = {
  IN_REVIEW: {
    accent: "bg-purple-600",
    title: "Under Review",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    titleColor: "text-purple-700",
    message:
      "Your complaint is currently under review by the civic administration. A decision will be made after verification.",
  },

  RESOLVED: {
    accent: "bg-green-600",
    title: "Issue Resolved",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    titleColor: "text-green-700",
    message:
      "Thank you for contributing to CivicEdge. Every responsible action helps build a stronger and more accountable community.",
  },

  CLOSED: {
    accent: "bg-slate-600",
    title: "Issue Closed",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    titleColor: "text-slate-700",
    message: "This issue has been closed by the civic administration.",
  },

  REJECTED: {
    accent: "bg-red-600",
    title: "Issue Rejected",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    titleColor: "text-red-700",
    message:
      "After review, this complaint was rejected as it did not meet the criteria for civic action.",
  },

  CANCELLED: {
    accent: "bg-gray-500",
    title: "Issue Cancelled",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    titleColor: "text-gray-700",
    message: "This complaint has been cancelled.",
  },
  IN_PROGRESS: {
  accent: "bg-amber-500",
  title: "Work in Progress",
  iconBg: "bg-amber-50",
  iconColor: "text-amber-600",
  titleColor: "text-amber-700",
  message:
    "The civic team has begun working on this issue. Progress updates will appear as work continues.",
},
};

const ResolutionEvidenceCard = ({ complaint, status }) => {
  const config = STATUS_CONFIG[status?.code] || STATUS_CONFIG.RESOLVED;

  return (
    <section className="relative bg-white border border-slate-200 rounded-xl p-8 shadow-sm overflow-hidden">
      
      {/* Accent Line */}
      <div className={`absolute left-0 top-0 h-full w-1 ${config.accent} rounded-l-xl`} />

      {/* Watermark Icon */}
      <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
        <CheckCircle2 className={`w-24 h-24 ${config.iconColor}`} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${config.iconBg}`}>
          <CheckCircle2 className={`w-5 h-5 ${config.iconColor}`} />
        </div>

        <h2 className={`text-sm font-semibold tracking-wide uppercase ${config.titleColor}`}>
          {config.title}
        </h2>
      </div>

      {/* Message */}
      <p className="text-slate-700 text-[15px] leading-relaxed mb-6 max-w-2xl">
        {config.message}
      </p>

      {/* Evidence */}
      {complaint?.resolution?.after_media?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {complaint.resolution.after_media.slice(0, 2).map((media) => (
            <div
              key={media.reference_id}
              className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <img
                src={media.secure_url}
                alt="Resolution proof"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ResolutionEvidenceCard;