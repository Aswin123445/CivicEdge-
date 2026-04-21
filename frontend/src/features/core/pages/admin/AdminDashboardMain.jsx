// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  AlertTriangle,
  AlertCircle,
  CalendarCheck,
  UserCheck,
  ShieldAlert,
  ListTodo,
  ClipboardCheck,
  Users,
  MessageSquareWarning,
  Activity,
  Inbox,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAdminMetrics from "../../hooks/admin/adminMetrics";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

function EmptyState() {
  return (
    <div className="bg-neutral-800 border border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center">
      {/* Icon */}
      <div className="p-3 rounded-full bg-slate-700/50 mb-3">
        <Inbox className="w-6 h-6 text-slate-400" />
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-slate-200">No pending issues</p>

      {/* Subtitle */}
      <p className="text-xs text-slate-400 mt-1">
        All issues are reviewed. Nothing needs attention right now.
      </p>
    </div>
  );
}
function StatCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl border border-slate-700 bg-[#1e1e1e]/50 animate-pulse min-h-[130px] ">
      <div className="flex items-center justify-between pt-4">
        {/* Text section */}
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-700 rounded" />
          <div className="h-6 w-16 bg-slate-600 rounded" />
        </div>

        {/* Icon placeholder */}
        <div className="h-10 w-10 bg-slate-700 rounded-xl" />
      </div>

      {/* Optional progress bar feel */}
      <div className="mt-4 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-slate-600 animate-pulse" />
      </div>
    </div>
  );
}
function AttentionItemSkeleton() {
  return (
    <div className="bg-neutral-800 border border-slate-700 rounded-lg p-4 flex justify-between items-center animate-pulse">
      {/* Left Content */}
      <div className="space-y-2">
        {/* Title */}
        <div className="h-4 w-40 bg-slate-600 rounded" />

        {/* Subtitle (submitted_display) */}
        <div className="h-3 w-28 bg-slate-700 rounded" />
      </div>

      {/* Right Button Placeholder */}
      <div className="h-8 w-16 bg-slate-600 rounded-md" />
    </div>
  );
}

function MiniChartCardSkeleton() {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 h-40 flex flex-col justify-between animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-600 rounded" />
      </div>

      {/* Chart Area */}
      <div className="h-24 flex items-end gap-1 ">
        {/* Simulated bars to mimic line trend */}
        {[
          "h-[40%]",
          "h-[70%]",
          "h-[50%]",
          "h-[80%]",
          "h-[60%]",
          "h-[75%]",
          "h-[45%]",
        ].map((h, i) => (
          <div key={i} className={`flex-1 ${h} bg-slate-700 rounded-sm`} />
        ))}
      </div>
    </div>
  );
}
export default function AdminDashboardMain() {
  const navigate = useNavigate();
  const {
    metrics,
    metricsLoading,
    metricsFetching,
    logs,
    activityLoading,
    activityFetching,
    pendingIssues,
    pendingIssueLoading,
    pendingIssueFetching,
    issues_last_7_days,
    users_joined_7_days,
    posts_last_7_days,
  } = useAdminMetrics();
  return (
    <main className="flex-1 px-6  bg-[#1e1e1e] text-slate-100 overflow-y-auto">
      {/* ============================= */}
      {/* SYSTEM SNAPSHOT */}
      {/* ============================= */}
      <motion.section {...fadeUp} className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          System Snapshot
        </h2>

        {metricsLoading || metricsFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <StatCard
              label="Open Issues"
              value={metrics?.openIssues || 0}
              icon={<AlertCircle />}
              tone="danger"
            />
            <StatCard
              label="Total Events"
              value={metrics?.totalEvents || 0}
              icon={<CalendarCheck />}
              tone="warning"
            />
            <StatCard
              label="Active Solvers"
              value={metrics?.activeSolvers || 0}
              icon={<UserCheck />}
              tone="success"
            />
            <StatCard
              label="Flagged Content"
              value={metrics?.pendingFlags || 0}
              icon={<ShieldAlert />}
              tone="danger"
            />
            <StatCard
              label="Total Tasks"
              value={metrics?.tasks || 0}
              icon={<ListTodo />}
              tone="neutral"
            />
          </div>
        )}
      </motion.section>

      {/* ============================= */}
      {/* ATTENTION + ACTIVITY */}
      {/* ============================= */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* ATTENTION REQUIRED */}
        <motion.section
          {...fadeUp}
          transition={{ delay: 0.05 }}
          className="col-span-12 xl:col-span-7"
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-200">
            Pending Issues
          </h2>

          <div className="space-y-3">
            {pendingIssueLoading || pendingIssueFetching ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <AttentionItemSkeleton key={i} />
                ))}
              </div>
            ) : pendingIssues?.length === 0 ? (
              <EmptyState />
            ) : (
              pendingIssues?.map((issue) => (
                <AttentionItem
                  key={issue?.id}
                  title={issue?.title}
                  submitted_display={issue?.submitted_display}
                  id={issue?.id}
                  severity={issue?.severity}
                  location={issue?.location}
                  navigate={navigate}
                />
              ))
            )}
          </div>
        </motion.section>

        {/* LIVE ACTIVITY */}
        <motion.section
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="col-span-12 xl:col-span-5"
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-200">
            Live Activity
          </h2>

          <div className="space-y-4 text-sm text-slate-400">
            {activityLoading || activityFetching ? (
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded" />
                <div className="h-4 bg-slate-700 rounded" />
                <div className="h-4 bg-slate-700 rounded" />
                <div className="h-4 bg-slate-700 rounded" />
              </div>
            ) : (
              logs?.map((log) => (
                <ActivityItem key={log?.id} text={log?.message} />
              ))
            )}
          </div>
        </motion.section>
      </div>

      {/* ============================= */}
      {/* PERFORMANCE & TRENDS */}
      {/* ============================= */}
      <motion.section {...fadeUp} transition={{ delay: 0.15 }} className="mb-4">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          Performance & Trends
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {metricsLoading || metricsFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <MiniChartCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <PlaceholderChart
                title="Issues Reported This Week"
                last_7_days={issues_last_7_days}
              />
              <PlaceholderChart
                title="Users Joined This Week"
                last_7_days={users_joined_7_days}
              />
              <PlaceholderChart
                title="Posts Created This Week"
                last_7_days={posts_last_7_days}
              />
            </>
          )}
        </div>
      </motion.section>
    </main>
  );
}

/* ============================= */
/* UI SUBCOMPONENTS */
/* ============================= */

function StatCard({ label, value, icon, tone }) {
  const toneMap = {
    danger: "text-red-400",
    warning: "text-amber-400",
    success: "text-emerald-400",
    neutral: "text-slate-400",
  };

  return (
    <div
      className="
        bg-neutral-800 border border-neutral-700 rounded-xl p-4
        transition-shadow hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`p-2 rounded-lg bg-neutral-700 ${toneMap[tone]}`}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

function AttentionItem({
  title,
  submitted_display,
  severity,
  id,
  location,
  navigate,
}) {
  const severityColor = {
    high: "border-red-500/40",
    medium: "border-amber-500/40",
    low: "border-slate-600",
  };

  return (
    <div
      className={`
        bg-neutral-800 border ${severityColor[severity]}
        rounded-lg p-4 flex justify-between items-center
        transition-shadow hover:shadow-md
      `}
    >
      <div>
        <p className="font-medium text-slate-200">{title}</p>
        <p className="text-xs text-slate-400">{submitted_display}</p>
      </div>
      <button
        onClick={() =>
          navigate(`/dashboard/execution/in-review/issues/${id}/details`)
        }
        className="text-sm font-semibold text-blue-400 hover:text-blue-300"
      >
        Review
      </button>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <div className="flex justify-between items-center">
      <span>{text}</span>
    </div>
  );
}

function PlaceholderChart({ title, last_7_days }) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 h-40 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-slate-200">{title}</p>
      </div>

      {/* Chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={last_7_days}>
            {/* subtle grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
