import React from "react";
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
  RefreshCw,
  Download,
  Users,
  UserCheck,
  ShieldCheck,
  Activity,
} from "lucide-react";

import AnalyticsFilterToolbar from "../../components/issue/AnalyticsFilterToolbar";
import useUserAnalytics from "../../hooks/user/userAnalytics";
import AnalyticsDashboardSkeleton from "../../components/user/AnalyticsDashboardSkeleton";
import AnalyticsDashboardFetchingSkeleton from "../../components/user/AnalyticsDashboardFetchingSkeleton";
import useUserExport from "../../hooks/user/userAnalyticsExport";

/**
 * CIVICEDGE ADMIN ANALYTICS DASHBOARD
 * Now all data comes from API (dummy backend response)
 */

const StatsCard = ({
  label,
  value,
  icon: Icon,
  colorClass = "text-blue-500",
}) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <h3 className="text-2xl font-bold text-white mt-1">
          {(value ?? 0).toLocaleString()}
        </h3>
      </div>

      <div className={`${colorClass}`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children, className = "" }) => (
  <div
    className={`bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 ${className}`}
  >
    <div className="mb-5">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{subtitle}</p>
    </div>

    <div className="h-[320px]">{children}</div>
  </div>
);

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

const AnalyticsUserDashboardPage = () => {
  const {
    urlSearchParams,
    userAnalytics: data,
    userAnalyticsLoading: isLoading,
    userAnalyticsFetching: isFetching,
  } = useUserAnalytics();

  const { handleExport } = useUserExport();

  const stats = data?.stats || {};
  const distribution = data?.distribution || [];
  const growth = data?.growth || [];
  const zone_solver_chart = data?.zone_solver_chart || [];
  if (isLoading) {
    return <AnalyticsDashboardSkeleton />;
  }

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-slate-300">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Admin & User Analytics Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Real-time data powered from backend API.
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
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* FILTER */}
        <AnalyticsFilterToolbar urlSearchParams={urlSearchParams} />

        {/* STATS */}
        {isFetching ? (
          <AnalyticsDashboardFetchingSkeleton />
        ) : (
          <section className="space-y-6">
            <h2 className="text-sm uppercase tracking-widest text-slate-400 font-bold">
              User Analytics Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
              <StatsCard
                label="Total Users"
                value={stats.total_users}
                icon={Users}
              />

              <StatsCard
                label="New This Month"
                value={stats.new_users_this_month}
                icon={UserCheck}
              />

              <StatsCard
                label="Citizen Count"
                value={stats.citizens}
                icon={Users}
                colorClass="text-emerald-500"
              />

              <StatsCard
                label="Solver Count"
                value={stats.solvers}
                icon={Activity}
                colorClass="text-amber-500"
              />

              <StatsCard
                label="Admin Count"
                value={stats.admins}
                icon={ShieldCheck}
                colorClass="text-violet-500"
              />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-12 gap-6">
              {/* PIE */}
              <ChartCard
                title="User Distribution"
                subtitle="Platform role split"
                className="col-span-12 lg:col-span-4"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                    >
                      {distribution.map((item, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* LINE */}
              <ChartCard
                title="User Growth"
                subtitle="Registrations over time"
                className="col-span-12 lg:col-span-8"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growth}>
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Zone-wise Solver Distribution"
                subtitle="Comparison of total vs active solvers per zone"
                className="col-span-12"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={zone_solver_chart}
                    margin={{ left: 40, right: 20 }}
                  >
                    <CartesianGrid
                      stroke="#334155"
                      strokeDasharray="3 3"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="zone"
                      type="category"
                      tick={{ fill: "#f8fafc", fontSize: 14 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#334155", opacity: 0.4 }}
                      contentStyle={{
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #334155",
                        color: "#fff",
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                    />
                    <Bar
                      dataKey="solvers"
                      name="Total Solvers"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                    <Bar
                      dataKey="active_solvers"
                      name="Active Solvers"
                      fill="#10b981"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalyticsUserDashboardPage;
