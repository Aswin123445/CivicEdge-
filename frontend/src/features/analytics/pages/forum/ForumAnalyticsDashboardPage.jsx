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
import { Download, Calendar, Loader2 } from "lucide-react";

import useForumAnalytics from "../../hooks/forum/forumAnalytics";
import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import { PollAnalyticsSkeleton } from "../../components/polls/PollAnalyticsSkeleton";
import { PollAnalyticsFetchingSkeleton } from "../../components/polls/PollAnalyticsFetchingSkeleton";
import useForumExport from "../../hooks/forum/forumAnalyticsExport";
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
        <p className="text-sm font-medium text-slate-300 mb-1">{title}</p>
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

function ForumTrendChart({ data }) {
  return (
    <ChartCard
      title="Forum Activity Trend"
      subtitle="Daily posts and comments created over time"
    >
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#65a0ee", fontSize: 11 }}
          dy={8}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }}
        />
        <Legend verticalAlign="top" align="right" iconType="circle" height={32} />
        <Line
          name="Posts"
          type="monotone"
          dataKey="posts"
          stroke="#2563eb"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#2563eb" }}
          activeDot={{ r: 5 }}
        />
        <Line
          name="Comments"
          type="monotone"
          dataKey="comments"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ChartCard>
  );
}

function CategoryChart({ data }) {
  return (
    <ChartCard
      title="Top Discussion Categories"
      subtitle="Most discussed civic topics in selected range"
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#d1e4ff", fontSize: 11 }}
          width={120}
        />
        <Tooltip
          cursor={{ fill: "#334155", opacity: 0.4 }}
          contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
          {(data || []).map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? "#346afe" : "#3b82f6"}
              fillOpacity={Math.max(1 - i * 0.12, 0.4)}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForumAnalyticsDashboardPage() {
  const {
    urlSearchParams,
    forumAnalyticsLoading,
    forumAnalyticsFetching,
    kpis,
    forum_activity_trend,
    top_discussion_categories,
  } = useForumAnalytics();

  const { isExportLoading, handleExport } = useForumExport();

  // ── PDF section refs ─────────────────────────────────────────────────────
  const headerRef      = useRef(null);
  const kpiRef         = useRef(null);
  const trendRef       = useRef(null);
  const categoryRef    = useRef(null);

  const { exportPdf, exporting } = usePdfExport({
    title: "Forum Analytics Report",
    filename: "forum-analytics",
    sections: [
      { ref: headerRef,   label: "Header" },
      { ref: kpiRef,      label: "KPI Overview" },
      { ref: trendRef,    label: "Forum Activity Trend" },
      { ref: categoryRef, label: "Top Discussion Categories" },
    ],
  });

  if (forumAnalyticsLoading) return <PollAnalyticsSkeleton />;

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
              Forum Analytics Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Monitor discussion activity, community engagement, and moderation insights.
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
        {forumAnalyticsFetching ? (
          <PollAnalyticsFetchingSkeleton />
        ) : (
          <div className="space-y-6">

            {/* KPI cards — ref on the grid wrapper */}
            <div
              ref={kpiRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <StatsCard
                title={kpis[0]?.label}
                value={kpis[0]?.value}
                change={`${kpis[0]?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
              <StatsCard
                title={kpis[1]?.label}
                value={kpis[1]?.value}
                change={`${kpis[1]?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
              <StatsCard
                title={kpis[2]?.label}
                value={kpis[2]?.value}
                change={`${kpis[2]?.change_percent}%`}
                icon={<Calendar size={20} />}
              />
            </div>

            {/* Charts — refs on grid cells, col-span lives here */}
            <div className="grid grid-cols-12 gap-6">

              <div ref={trendRef} className="col-span-12 lg:col-span-8">
                <ForumTrendChart data={forum_activity_trend} />
              </div>

              <div ref={categoryRef} className="col-span-12 lg:col-span-4">
                <CategoryChart data={top_discussion_categories} />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}