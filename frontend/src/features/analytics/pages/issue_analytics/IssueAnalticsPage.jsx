import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  Download,
  TrendingUp,
  CheckCircle2,
  CircleX,
  AlertCircle,
  Loader2,
} from "lucide-react";

import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import issueAnalytics from "../../hooks/issue_analytics/issueAnalytics";
import AnalyticsSkeleton from "../../components/AnalyticsSkeleton";
import AnalyticsFetchingSkelton from "../../components/AnalyticsFetchingSkelton";
import useIssueExport from "../../hooks/issue_analytics/issueAnalyticsExport";
import usePdfExport from "../../hooks/pdf_hook/usePdfExport";

// ─── Shared UI ────────────────────────────────────────────────────────────────

const StatsCard = ({ title, value, trend, icon: Icon, positive = true }) => (
  <div className="bg-[#1e1e1e                                     ] border border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100 mt-2">{value ?? 0}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
            {trend} <span className="text-slate-500">vs last month</span>
          </p>
        )}
      </div>
      <div className="p-3 rounded-lg bg-[#1e1e1e] border border-slate-700">
        <Icon className="w-5 h-5 text-slate-300" />
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-[#1e1e1e                                     ] border border-slate-700 rounded-xl shadow-sm h-full">
    <div className="px-5 pt-5 pb-4 border-b border-slate-700">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
    {/* Fixed px height — Recharts ResponsiveContainer needs a measurable parent */}
    <div className="p-5 h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IssueAnalyticsPage() {
  const {
    issueanalyticsLoading,
    issueanalyticsFetching,
    stats,
    trend_chart,
    categoryDataWithColors,
    funnel_chart,
    zone_chart,
    urlSearchParams,
  } = issueAnalytics();

  const { issueExportLoading, handleExport } = useIssueExport();

  // ── PDF section refs ─────────────────────────────────────────────────────
  const headerRef   = useRef(null);
  const kpiRef      = useRef(null);
  const trendRef    = useRef(null);
  const categoryRef = useRef(null);
  const funnelRef   = useRef(null);
  const zoneRef     = useRef(null);

  const { exportPdf, exporting } = usePdfExport({
    title: "Issue Analytics Report",
    filename: "issue-analytics",
    sections: [
      { ref: headerRef,   label: "Header" },
      { ref: kpiRef,      label: "KPI Overview" },
      { ref: trendRef,    label: "Issue Trend" },
      { ref: categoryRef, label: "Category Distribution" },
      { ref: funnelRef,   label: "Issue Lifecycle Funnel" },
      { ref: zoneRef,     label: "Zone-wise Report" },
    ],
  });

  if (issueanalyticsLoading) return <AnalyticsSkeleton />;

  return (
    <div className="bg-[#1e1e1e] min-h-screen p-4 md:p-8 text-slate-100">
      <div className="max-w-screen-2xl mx-auto space-y-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time issue intelligence for CivicEdge administrators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* PDF export */}
            <button
              onClick={exportPdf}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-all min-w-[140px]"
            >
              {exporting
                ? <Loader2 className="animate-spin mx-auto" size={16} />
                : <><Download size={16} /> Download PDF</>}
            </button>

            {/* CSV / Excel report */}
            <button
              onClick={() =>
                handleExport(
                  urlSearchParams.searchParams.get("range")     || "30d",
                  urlSearchParams.searchParams.get("date_from") || "",
                  urlSearchParams.searchParams.get("date_to")   || "",
                )
              }
              disabled={issueExportLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all min-w-[150px]"
            >
              {issueExportLoading
                ? <Loader2 className="animate-spin mx-auto" size={16} />
                : <><Download size={16} /> Download Report</>}
            </button>
          </div>
        </div>

        {/* ── Filter ───────────────────────────────────────────────────── */}
        <AnalyticsFilterToolbar urlSearchParams={urlSearchParams} />

        {/* ── Body ─────────────────────────────────────────────────────── */}
        {issueanalyticsFetching ? (
          <AnalyticsFetchingSkelton />
        ) : (
          <div className="space-y-6">

            {/* KPI cards — ref on the grid wrapper */}
            <div
              ref={kpiRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              <StatsCard title="Total Issues"    value={stats.total_issues}    positive={true}  icon={TrendingUp} />
              <StatsCard title="Resolved Issues" value={stats.resolved_issues} positive={true}  icon={CheckCircle2} />
              <StatsCard title="Pending Issues"  value={stats.pending_issues}  positive={false} icon={AlertCircle} />
              <StatsCard title="Rejected Issues" value={stats.rejected_issues}                  icon={CircleX} />
            </div>

            {/* Charts — refs on grid cells, col-span lives here */}
            <div className="grid grid-cols-12 gap-6">

              {/* Trend — 8 cols */}
              <div ref={trendRef} className="col-span-12 lg:col-span-8">
                <ChartCard title="Issue Trend Over Time" subtitle="Reported vs resolved issues">
                  <LineChart data={trend_chart} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
                    <Legend iconType="circle" />
                    <Line type="monotone" dataKey="reported" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ChartCard>
              </div>

              {/* Category pie — 4 cols */}
              <div ref={categoryRef} className="col-span-12 lg:col-span-4">
                <ChartCard title="Category-wise Issues" subtitle="Distribution by complaint type">
                  <PieChart>
                    <Pie
                      data={categoryDataWithColors}
                      dataKey="value"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {categoryDataWithColors.map((item, i) => (
                        <Cell key={i} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }} />
                  </PieChart>
                </ChartCard>
              </div>

              {/* Funnel — 6 cols */}
              <div ref={funnelRef} className="col-span-12 lg:col-span-6">
                <ChartCard title="Issue Lifecycle Funnel" subtitle="Workflow progression stages">
                  <FunnelChart>
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }} />
                    <Funnel dataKey="count" data={funnel_chart} isAnimationActive>
                      <LabelList position="right" fill="#22c55e" stroke="none" dataKey="stage" />
                    </Funnel>
                  </FunnelChart>
                </ChartCard>
              </div>

              {/* Zone bar — 6 cols */}
              <div ref={zoneRef} className="col-span-12 lg:col-span-6">
                <ChartCard title="Zone-wise Issue Report" subtitle="Highest complaint wards">
                  <BarChart
                    data={zone_chart}
                    layout="vertical"
                    margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                    <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="zone"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={90}
                    />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }} />
                    <Bar dataKey="issues" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={18} />
                  </BarChart>
                </ChartCard>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}