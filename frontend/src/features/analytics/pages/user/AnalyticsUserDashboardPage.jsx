import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  Download,
  Users,
  UserCheck,
  ShieldCheck,
  Activity,
  Loader2,
} from "lucide-react";

import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import useUserAnalytics from "../../hooks/user/userAnalytics";
import AnalyticsDashboardSkeleton from "../../components/user/AnalyticsDashboardSkeleton";
import AnalyticsDashboardFetchingSkeleton from "../../components/user/AnalyticsDashboardFetchingSkeleton";
import useUserExport from "../../hooks/user/userAnalyticsExport";
import TopSolverPerformanceChart from "../../components/user/TopSolverPerformanceChart";
import usePdfExport from "../../hooks/pdf_hook/usePdfExport";

// ─── Shared UI ────────────────────────────────────────────────────────────────

const StatsCard = ({ label, value, icon: Icon, colorClass = "text-blue-500" }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
        <h3 className="text-2xl font-bold text-white mt-1">
          {(value ?? 0).toLocaleString()}
        </h3>
      </div>
      <div className={colorClass}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

/**
 * ChartCard — no col-span here; let the parent grid cell control width.
 * The inner content area uses a fixed pixel height so Recharts never collapses.
 */
const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-full">
    <div className="mb-4">
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
    {/* Fixed height — Recharts ResponsiveContainer needs a px-constrained parent */}
    <div className="h-[300px] w-full">
      {children}
    </div>
  </div>
);

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

// ─── Page ─────────────────────────────────────────────────────────────────────

const AnalyticsUserDashboardPage = () => {
  const {
    urlSearchParams,
    userAnalytics: data,
    userAnalyticsLoading: isLoading,
    userAnalyticsFetching: isFetching,
  } = useUserAnalytics();

  // PDF section refs — each wraps exactly one visual block
  const headerRef      = useRef(null);
  const statsRef       = useRef(null);
  const distributionRef = useRef(null);
  const growthRef      = useRef(null);
  const zoneSolverRef  = useRef(null);
  const topSolverRef   = useRef(null);

  const { handleExport, issueExportLoading } = useUserExport();

  const stats               = data?.stats               || {};
  const distribution        = data?.distribution        || [];
  const growth              = data?.growth              || [];
  const zone_solver_chart   = data?.zone_solver_chart   || [];
  const top_solver_performance = data?.top_solver_performance || [];

  const { exportPdf, exporting } = usePdfExport({
    title: "User Analytics Report",
    filename: "user-analytics-report",
    sections: [
      { ref: headerRef,       label: "Header" },
      { ref: statsRef,        label: "Overview" },
      { ref: distributionRef, label: "User Distribution" },
      { ref: growthRef,       label: "User Growth" },
      { ref: zoneSolverRef,   label: "Zone Solver Performance" },
      { ref: topSolverRef,    label: "Top Solvers" },
    ],
  });

  if (isLoading) return <AnalyticsDashboardSkeleton />;

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-slate-300">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              Admin & User Analytics Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Real-time data powered from backend API.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportPdf}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all min-w-[150px]"
            >
              {exporting
                ? <Loader2 className="animate-spin mx-auto" size={16} />
                : <><Download size={16} /> Download PDF</>}
            </button>

            <button
              onClick={() =>
                handleExport(
                  urlSearchParams.searchParams.get("range")     || "30d",
                  urlSearchParams.searchParams.get("date_from") || "",
                  urlSearchParams.searchParams.get("date_to")   || "",
                )
              }
              disabled={issueExportLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all min-w-[150px]"
            >
              {issueExportLoading
                ? <Loader2 className="animate-spin mx-auto" size={16} />
                : <><Download size={16} /> Download Report</>}
            </button>
          </div>
        </div>

        {/* ── Filter ─────────────────────────────────────────────────────── */}
        <AnalyticsFilterToolbar urlSearchParams={urlSearchParams} />

        {/* ── Body ───────────────────────────────────────────────────────── */}
        {isFetching ? (
          <AnalyticsDashboardFetchingSkeleton />
        ) : (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              User Analytics Overview
            </h2>

            {/* KPI cards */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4"
            >
              <StatsCard label="Total Users"    value={stats.total_users}          icon={Users} />
              <StatsCard label="New This Month" value={stats.new_users_this_month} icon={UserCheck} />
              <StatsCard label="Citizen Count"  value={stats.citizens}             icon={Users}      colorClass="text-emerald-500" />
              <StatsCard label="Solver Count"   value={stats.solvers}              icon={Activity}   colorClass="text-amber-500" />
              <StatsCard label="Admin Count"    value={stats.admins}               icon={ShieldCheck} colorClass="text-violet-500" />
            </div>

            {/* ── Charts grid ──────────────────────────────────────────── */}
            {/*
              FIX: refs now sit on the GRID CELL (the col-span div),
              not on a wrapper outside the grid. ChartCard no longer
              carries col-span — the grid cell does.
            */}
            <div className="grid grid-cols-12 gap-6">

              {/* Pie — 4 cols on lg+ */}
              <div ref={distributionRef} className="col-span-12 lg:col-span-4">
                <ChartCard title="User Distribution" subtitle="Platform role split">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                      >
                        {distribution.map((item, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }}
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Line — 8 cols on lg+ */}
              <div ref={growthRef} className="col-span-12 lg:col-span-8">
                <ChartCard title="User Growth" subtitle="Registrations over time">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growth} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }} />
                      <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Zone solver bar — full width */}
              <div ref={zoneSolverRef} className="col-span-12">
                <ChartCard
                  title="Zone-wise Solver Distribution"
                  subtitle="Comparison of total vs active solvers per zone"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={zone_solver_chart}
                      margin={{ left: 40, right: 20, top: 5, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis
                        dataKey="zone"
                        type="category"
                        tick={{ fill: "#f8fafc", fontSize: 13 }}
                        axisLine={false}
                        tickLine={false}
                        width={100}
                      />
                      <Tooltip
                        cursor={{ fill: "#334155", opacity: 0.4 }}
                        contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }}
                      />
                      <Legend verticalAlign="top" align="right" iconType="circle" />
                      <Bar dataKey="solvers"        name="Total Solvers"  fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
                      <Bar dataKey="active_solvers" name="Active Solvers" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Top solvers — full width */}
              <div ref={topSolverRef} className="col-span-12">
                <ChartCard
                  title="Top Performing Solvers"
                  subtitle="Top 5 performing solvers on tasks resolved in selected period"
                >
                  <TopSolverPerformanceChart top_solver_performance={top_solver_performance} />
                </ChartCard>
              </div>

            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalyticsUserDashboardPage;