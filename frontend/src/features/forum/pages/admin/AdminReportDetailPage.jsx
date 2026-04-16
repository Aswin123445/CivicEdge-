import {
  ArrowLeft,
  ShieldAlert,
  User,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  EyeOff,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useReportDetails from "../../hooks/admin/reportDetails";
import useReportTakeAction from "../../hooks/admin/reportAction";
import ReportDetailSkeleton from "../../components/admin/admin_report_detail/ReportDetailSkeleton";

/**
 * CIVICEDGE ADMIN: REPORT DETAIL PAGE
 * ---------------------------------------
 * Component Split Guide:
 * - ./components/admin/report/PageHeader.jsx
 * - ./components/admin/report/ReportInfo.jsx
 * - ./components/admin/report/ContentCard.jsx
 * - ./components/admin/report/ActionPanel.jsx
 * - ./components/admin/report/ActionModal.jsx
 */

// --- SUB-COMPONENT: LOADING STATE ---
const LoadingState = () => (
  <div className="min-h-screen bg-[#1e1e1e] p-6 flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    <p className="text-slate-400 font-medium">Loading report details...</p>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const AdminReportDetailPage = () => {
  const { id } = useParams();
  const { report, reportLoading, reportFetching, navigate } =
    useReportDetails(id);

  const {
    reportActionLoading,
    isActionLoading,
    modalOpen,
    setModalOpen,
    selectedAction,
    setSelectedAction,
    actionReason,
    setActionReason,
    validationError,
    setValidationError,
    handleActionSubmit,
  } = useReportTakeAction(id);

  if (reportLoading || reportFetching) return <ReportDetailSkeleton />;

  const statusBadges = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    resolved: "bg-green-500/10 text-green-400 border-green-500/20",
    rejected: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* SECTION: PageHeader */}
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#1e1e1e] rounded-full border border-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Report Details
            </h1>
            <p className="text-slate-500 text-sm">
              Reviewing Report ID: {report.id}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Main Information (col-span-8) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* COMPONENT: ReportInfoCard */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Reported By
                    </p>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-blue-500" />
                      <span className="font-semibold">
                        {report.reported_by.name}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Date
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="text-slate-300">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadges[report.status]}`}
                >
                  {report.status.toUpperCase()}
                </span>
              </div>

              {/* SECTION: ReasonSection */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Reason
                </p>
                <div className="bg-[#1e1e1e]/50 p-4 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
                  {report.reason}
                </div>
              </div>
            </div>

            {/* COMPONENT: TargetContentCard */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <ShieldAlert size={18} className="text-yellow-500" />
                  Reported Content
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-700 rounded uppercase">
                  {report.target.type}
                </span>
              </div>

              <div className="p-6 space-y-4">
                {report.target ? (
                  <>
                    {report.target.type === "post" && (
                      <h2 className="text-xl font-bold text-slate-100">
                        {report.target.title}
                      </h2>
                    )}
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 whitespace-pre-wrap">
                        {report.target.content}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 italic">
                    Content not found or already removed.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Panel (col-span-4) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4">Moderation Action</h3>

              {report.status !== "pending" ? (
                <div className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-lg flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <p className="text-sm text-slate-400">
                    This report has already been processed and is marked as{" "}
                    <span className="text-slate-100 font-bold">
                      {report.status}
                    </span>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">
                    Evaluate the reported content against the community
                    guidelines before taking action.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-sm"
                  >
                    Take Action
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COMPONENT: ReportActionModal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/80 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Review Report</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Context Info */}
              <div className="flex gap-4 p-3 bg-[#1e1e1e] rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 uppercase">Type:</span>{" "}
                  <span className="text-slate-200 font-bold">
                    {report.target.type}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase">By:</span>{" "}
                  <span className="text-slate-200 font-bold">
                    {report.reported_by.name}
                  </span>
                </div>
              </div>

              {/* Action Options */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Select Action
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "hide",
                      label: "Hide Content",
                      icon: EyeOff,
                      color: "hover:border-yellow-500/50",
                    },
                    {
                      id: "remove",
                      label: "Remove Content",
                      icon: AlertTriangle,
                      color: "hover:border-red-500/50",
                    },
                    {
                      id: "restore",
                      label: "Restore Content",
                      icon: RotateCcw,
                      color: "hover:border-green-500/50",
                    },
                    {
                      id: "reject",
                      label: "Reject Report",
                      icon: XCircle,
                      color: "hover:border-slate-500/50",
                    },
                  ].map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold ${
                        selectedAction === action.id
                          ? "bg-slate-800 border-blue-500 text-blue-400 shadow-inner"
                          : "bg-[#1e1e1e] border-slate-800 text-slate-400 " +
                            action.color
                      }`}
                    >
                      <action.icon size={18} />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Internal Note{" "}
                  {selectedAction === "restore" ? "(Optional)" : "(Required)"}
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className={`w-full bg-[#1e1e1e] border ${validationError ? "border-red-500" : "border-slate-800"} rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-blue-500 h-24 resize-none transition-all`}
                  placeholder="Explain why this action was taken..."
                />
                {validationError && (
                  <p className="text-red-500 text-xs font-bold">
                    {validationError}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleActionSubmit}
                disabled={isActionLoading || !selectedAction}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
              >
                {isActionLoading && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {isActionLoading ? "Processing..." : "Confirm Action"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportDetailPage;
