import React, { useState } from "react";
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
  RefreshCcw,
  Filter,
  ChevronDown,
  TrendingUp,
  CheckCircle2,
  CircleX,
  AlertCircle,
} from "lucide-react";
import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import issueAnalytics from "../../hooks/issue_analytics/issueAnalytics";
import AnalyticsSkeleton from "../../components/AnalyticsSkeleton";
import AnalyticsFetchingSkelton from "../../components/AnalyticsFetchingSkelton";
import useIssueExport from "../../hooks/issue_analytics/issueAnalyticsExport";

const StatsCard = ({ title, value, trend, icon: Icon, positive = true }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100 mt-2">{value}</h3>

        {trend && (
          <p
            className={`text-xs mt-2 font-medium ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
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

/* COMPONENT: ChartCard */
/* Move to components/admin/analytics/ChartCard.jsx */
const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-sm h-full">
    <div className="p-5 border-b border-slate-700 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>

      <button className="text-slate-500 hover:text-slate-300 transition-colors">
        <Filter className="w-4 h-4" />
      </button>
    </div>

    <div className="p-5 min-h-[320px]">{children}</div>
  </div>
);

/* MAIN PAGE */
/* Move to pages/admin/AnalyticsDashboard.jsx */
export default function IssueAnalyticsPage() {
  const {
    issueanalytics,
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
  if (issueanalyticsLoading) {
    return <AnalyticsSkeleton />;
  }
  return (
    <div className="bg-[#lelele] p-4 md:p-8 text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time issue intelligence for CivicEdge administrators.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              handleExport(
                urlSearchParams.searchParams.get("range") || "30d",
                urlSearchParams.searchParams.get("date_from") || "",
                urlSearchParams.searchParams.get("date_to") || "",
              )
            }
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {issueExportLoading ? "Loading..." : "Import"}
          </button>
        </div>
      </div>

      {/* FILTER TOOLBAR */}
      <AnalyticsFilterToolbar urlSearchParams={urlSearchParams} />

      {/* KPI CARDS */}
      {issueanalyticsFetching ? (
        <AnalyticsFetchingSkelton />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Issues"
              value={stats.total_issues}
              trend=""
              positive={true}
              icon={TrendingUp}
            />
            <StatsCard
              title="Resolved Issues"
              value={stats.resolved_issues}
              trend=""
              positive={true}
              icon={CheckCircle2}
            />
            <StatsCard
              title="Pending Issues"
              value={stats.pending_issues}
              trend=""
              positive={false}
              icon={AlertCircle}
            />
            <StatsCard
              title="Rejected Issues"
              value={stats.rejected_issues}
              icon={CircleX}
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-12 gap-6">
            {/* Trend */}
            <div className="col-span-12 lg:col-span-8">
              <ChartCard
                title="Issue Trend Over Time"
                subtitle="Reported vs resolved issues"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trend_chart}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#334155"
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="reported"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Category */}
            <div className="col-span-12 lg:col-span-4">
              <ChartCard
                title="Category-wise Issues"
                subtitle="Distribution by complaint type"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={categoryDataWithColors}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {categoryDataWithColors.map((item, i) => (
                        <Cell key={i} fill={item.color} />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "10px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Funnel */}
            <div className="col-span-12 lg:col-span-6">
              <ChartCard
                title="Issue Lifecycle Funnel"
                subtitle="Workflow progression stages"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <FunnelChart>
                    <Tooltip />
                    <Funnel
                      dataKey="count"
                      data={funnel_chart}
                      isAnimationActive
                    >
                      <LabelList
                        position="right"
                        fill="#0bc229"
                        stroke="none"
                        dataKey="stage"
                      />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Zone */}
            <div className="col-span-12 lg:col-span-6">
              <ChartCard
                title="Zone-wise Issue Report"
                subtitle="Highest complaint wards"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={zone_chart} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#334155"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="zone"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "10px",
                      }}
                    />
                    <Bar
                      dataKey="issues"
                      fill="#3b82f6"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
