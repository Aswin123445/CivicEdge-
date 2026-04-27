import React, { useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import {
  Download,
  Calendar,
  Loader2,
} from "lucide-react";

import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import usePollAnalytics from "../../hooks/polls/pollAnalytics";
import { PollAnalyticsSkeleton } from "../../components/polls/PollAnalyticsSkeleton";
import { PollAnalyticsFetchingSkeleton } from "../../components/polls/PollAnalyticsFetchingSkeleton";
import usePollExport from "../../hooks/polls/pollExport";
import usePdfExport from "../../hooks/pdf_hook/usePdfExport";

// ─── Shared UI ────────────────────────────────────────────────────────────────

function StatsCard({ title, value, change, icon }) {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-blue-600 text-white rounded-lg">
          {icon}
        </div>
        <span className="text-[12px] font-bold text-emerald-400 bg-[#1e1e1e] border border-emerald-700 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-200">{value ?? 0}</h3>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-full">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-200 leading-tight">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      {/* Fixed px height — Recharts ResponsiveContainer needs a measurable parent */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Individual charts ────────────────────────────────────────────────────────

function ParticipationTrendChart({ data }) {
  return (
    <ChartCard
      title="Participation Trend Over Time"
      subtitle="Track daily / weekly voting activity"
    >
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          dy={8}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff", borderRadius: "8px" }}
          cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
        />
        <Legend verticalAlign="top" align="right" iconType="circle" height={32} />
        <Line
          name="Votes"
          type="monotone"
          dataKey="votes"
          stroke="#2563eb"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#2563eb" }}
          activeDot={{ r: 5 }}
        />
        <Line
          name="Voters"
          type="monotone"
          dataKey="voters"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ChartCard>
  );
}

function TopPollsChart({ data }) {
  return (
    <ChartCard
      title="Top Performing Polls"
      subtitle="Most voted polls in selected period"
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
        <XAxis
          type="number"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="title"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9fb8db", fontSize: 11 }}
          width={140}
          tickFormatter={(v) => (v.length > 18 ? `${v.substring(0, 15)}…` : v)}
        />
        <Tooltip
          cursor={{ fill: "#334155", opacity: 0.4 }}
          contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff", borderRadius: "8px" }}
        />
        <Bar dataKey="votes" radius={[0, 4, 4, 0]} barSize={18}>
          {(data || []).map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? "#1e3a8a" : "#3b82f6"}
              fillOpacity={Math.max(1 - i * 0.15, 0.4)}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PollAnalyticsDashboardPage() {
  const {
    urlSearchParams,
    pollAnalyticsLoading,
    pollAnalyticsFetching,
    kpis,
    top_polls,
    participation_trend,
  } = usePollAnalytics();

  const { handleExport, isExportLoading } = usePollExport();

  // ── PDF section refs ─────────────────────────────────────────────────────
  const headerRef      = useRef(null);
  const kpiRef         = useRef(null);
  const trendRef       = useRef(null);
  const topPollsRef    = useRef(null);

  const { exportPdf, exporting } = usePdfExport({
    title: "Poll Analytics Report",
    filename: "poll-analytics",
    sections: [
      { ref: headerRef,   label: "Header" },
      { ref: kpiRef,      label: "KPI Overview" },
      { ref: trendRef,    label: "Participation Trend" },
      { ref: topPollsRef, label: "Top Performing Polls" },
    ],
  });

  if (pollAnalyticsLoading) return <PollAnalyticsSkeleton />;

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
              Poll Analytics Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Monitor citizen engagement and poll performance insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* PDF export */}
            <button
              onClick={exportPdf}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-600 transition-all min-w-[140px]"
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
              disabled={isExportLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all min-w-[150px]"
            >
              {isExportLoading
                ? <Loader2 className="animate-spin mx-auto" size={16} />
                : <><Download size={16} /> Download Report</>}
            </button>
          </div>
        </div>

        {/* ── Filter ───────────────────────────────────────────────────── */}
        <AnalyticsFilterToolbar urlSearchParams={urlSearchParams} />

        {/* ── Body ─────────────────────────────────────────────────────── */}
        {pollAnalyticsFetching ? (
          <PollAnalyticsFetchingSkeleton />
        ) : (
          <div className="space-y-6">

            {/* KPI cards — ref on the grid wrapper */}
            <div
              ref={kpiRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
            >
              <StatsCard
                title="Total Polls"
                value={kpis?.total_polls?.value}
                change={`${kpis?.total_polls?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
              <StatsCard
                title="Avg Votes / Poll"
                value={kpis?.avg_votes_per_poll?.value}
                change={`${kpis?.avg_votes_per_poll?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
              <StatsCard
                title="Participation Rate"
                value={kpis?.participation_rate?.value}
                change={`${kpis?.participation_rate?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
              <StatsCard
                title="Total Votes"
                value={kpis?.total_votes?.value}
                change={`${kpis?.total_votes?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
            </div>

            {/* Charts — refs on grid cells, col-span lives here */}
            <div className="grid grid-cols-12 gap-6">

              <div ref={trendRef} className="col-span-12 lg:col-span-8">
                <ParticipationTrendChart data={participation_trend} />
              </div>

              <div ref={topPollsRef} className="col-span-12 lg:col-span-4">
                <TopPollsChart data={top_polls} />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}