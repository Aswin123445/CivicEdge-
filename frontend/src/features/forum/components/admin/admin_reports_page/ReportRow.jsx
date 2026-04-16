import {MessageSquare,User,Clock, ExternalLink ,FileText  } from "lucide-react";
const ReportRow = ({ report, onView }) => {
  const statusStyles = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    resolved: "bg-green-500/10 text-green-400 border-green-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const typeStyles = {
    post: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    comment: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  const formattedDate = new Date(report.created_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <tr className="group border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors">
      <td className="py-4 px-6">
        <span
          className={`flex items-center gap-2 w-fit px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${typeStyles[report.target_type]}`}
        >
          {report.target_type === "post" ? (
            <FileText size={12} />
          ) : (
            <MessageSquare size={12} />
          )}
          {report.target_type}
        </span>
      </td>
      <td className="py-4 px-6">
        <p
          className="text-sm text-slate-200 font-medium truncate max-w-[200px] lg:max-w-xs"
          title={report.reason}
        >
          {report.reference_id}
        </p>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-slate-400">
          <User size={14} />
          <span className="text-sm">{report.reported_by.name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Clock size={14} />
          {formattedDate}
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[report.status]}`}
        >
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-6 text-right">
        <button
          onClick={() => onView(report.id)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all border border-slate-700 hover:border-blue-500"
        >
          View
          <ExternalLink size={14} />
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;