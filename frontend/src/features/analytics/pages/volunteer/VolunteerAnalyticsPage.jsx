import React, { useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  UserCheck,
  Calendar,
  Activity,
  ShieldCheck,
  UserPlus,
  Download,
  Loader2,
} from "lucide-react";

import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import useVolunteerAnalytics from "../../hooks/volunteer/volunteerAnalytics";
import VolunteerAnalyticsSkeleton from "../../components/volunteer/VolunteerAnalyticsSkeleton";
import VolunteerAnalyticsFetchingSkeleton from "../../components/volunteer/VolunteerAnalyticsFetchingSkeleton";
import useVolunteerExport from "../../hooks/volunteer/volulnteerAnalyticsExport";
import usePdfExport from "../../hooks/pdf_hook/usePdfExport";

// ─── Chart card shell ─────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm h-full">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-200">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      {/* Fixed px height — required so Recharts ResponsiveContainer has a measurable parent */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function StatsCard({ title, value, change, icon }) {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-[#1e1e1e] rounded-lg text-slate-200 group-hover:text-blue-500 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-bold text-green-400 bg-[#1e1e1e] border border-emerald-700 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-200 mt-1">{value ?? 0}</h3>
      </div>
    </div>
  );
}

// ─── Individual charts ────────────────────────────────────────────────────────

function MembershipGrowthChart({ data }) {
  return (
    <ChartCard
      title="Group Membership Growth"
      subtitle="New citizens joining volunteer groups over time"
    >
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={8} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }} />
        <Line type="monotone" dataKey="joined" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: "#2563eb" }} activeDot={{ r: 5 }} />
      </LineChart>
    </ChartCard>
  );
}

function AccessSplitChart({ data }) {
  const COLORS = ["#2563eb", "#94a3b8"];
  return (
    <ChartCard title="Open vs Restricted" subtitle="Community split by access type">
      <PieChart>
        <Pie data={data} innerRadius={65} outerRadius={95} paddingAngle={5} dataKey="value">
          {(data || []).map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ChartCard>
  );
}

function ParticipationChart({ data }) {
  return (
    <ChartCard title="Event Participation" subtitle="Top volunteer groups by participant count">
      <BarChart layout="vertical" data={data} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          dataKey="group"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#f8fafc", fontSize: 11 }}
          width={130}
        />
        <Tooltip
          cursor={{ fill: "#334155", opacity: 0.4 }}
          contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }}
        />
        <Bar dataKey="participants" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={18} />
      </BarChart>
    </ChartCard>
  );
}

function VerificationFunnelChart({ data }) {
  return (
    <ChartCard
      title="Restricted Group Verification Funnel"
      subtitle="Track onboarding journey for trusted communities"
    >
      <FunnelChart>
        <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #334155", color: "#fff" }} />
        <Funnel dataKey="count" data={data} isAnimationActive>
          <LabelList position="right" fill="#94a3b8" stroke="none" dataKey="stage" />
        </Funnel>
      </FunnelChart>
    </ChartCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VolunteerAnalyticsPage() {
  const {
    urlSearchParams,
    volunteerAnalyticsLoading,
    volunteerAnalyticsFetching,
    conversion_funnel,
    group_access_distribution,
    growth,
    kpis,
    top_participation_groups,
  } = useVolunteerAnalytics();

  const { isExportLoading, handleExport } = useVolunteerExport();

  // ── PDF section refs — one per visual block ──────────────────────────────
  const headerRef       = useRef(null);
  const kpiRef          = useRef(null);
  const growthRef       = useRef(null);
  const accessRef       = useRef(null);
  const participationRef = useRef(null);
  const funnelRef       = useRef(null);

  const { exportPdf, exporting } = usePdfExport({
    title: "Volunteer Army Analytics Report",
    filename: "volunteer-analytics",
    sections: [
      { ref: headerRef,        label: "Header" },
      { ref: kpiRef,           label: "KPI Overview" },
      { ref: growthRef,        label: "Membership Growth" },
      { ref: accessRef,        label: "Open vs Restricted" },
      { ref: participationRef, label: "Event Participation" },
      { ref: funnelRef,        label: "Verification Funnel" },
    ],
  });

  if (volunteerAnalyticsLoading) return <VolunteerAnalyticsSkeleton />;

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
              Volunteer Army Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Monitor community participation, events, memberships, and trust-based group growth.
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
              disabled={isExportLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all min-w-[150px]"
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
        {volunteerAnalyticsFetching ? (
          <VolunteerAnalyticsFetchingSkeleton />
        ) : (
          <div className="space-y-6">

            {/* KPI cards — ref on the grid wrapper */}
            <div
              ref={kpiRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <StatsCard title="Total Groups"        value={kpis?.total_groups?.value}         change={`+${kpis?.total_groups?.change_percent}%`}         icon={<Users size={20} />} />
              <StatsCard title="Total Members"       value={kpis?.total_members?.value}        change={`+${kpis?.total_members?.change_percent}%`}        icon={<UserPlus size={20} />} />
              <StatsCard title="Active Events"       value={kpis?.active_events?.value}        change={`+${kpis?.active_events?.change_percent}%`}        icon={<Calendar size={20} />} />
              <StatsCard title="Event Participations" value={kpis?.event_participations?.value} change={`+${kpis?.event_participations?.change_percent}%`} icon={<Activity size={20} />} />
              <StatsCard title="Restricted Members"  value={kpis?.restricted_members?.value}   change={`+${kpis?.restricted_members?.change_percent}%`}   icon={<ShieldCheck size={20} />} />
              <StatsCard title="New Members (Month)" value={kpis?.new_members_month?.value}    change={`+${kpis?.new_members_month?.change_percent}%`}    icon={<UserCheck size={20} />} />
            </div>

            {/* Charts — refs on each grid CELL (col-span lives here, not inside ChartCard) */}
            <div className="grid grid-cols-12 gap-6">

              <div ref={growthRef} className="col-span-12 lg:col-span-8">
                <MembershipGrowthChart data={growth} />
              </div>

              <div ref={accessRef} className="col-span-12 lg:col-span-4">
                <AccessSplitChart data={group_access_distribution} />
              </div>

              <div ref={participationRef} className="col-span-12 lg:col-span-6">
                <ParticipationChart data={top_participation_groups} />
              </div>

              <div ref={funnelRef} className="col-span-12 lg:col-span-6">
                <VerificationFunnelChart data={conversion_funnel} />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}