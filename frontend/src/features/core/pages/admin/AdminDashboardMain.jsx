// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ClipboardCheck,
  Users,
  MessageSquareWarning,
  Activity,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

export default function AdminDashboardMain() {
  return (
    <main className="flex-1 px-6  bg-[#1e1e1e] text-slate-100 overflow-y-auto">
      {/* ============================= */}
      {/* SYSTEM SNAPSHOT */}
      {/* ============================= */}
      <motion.section {...fadeUp} className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          System Snapshot
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard
            label="Open Issues"
            value="124"
            icon={<AlertTriangle />}
            tone="danger"
          />
          <StatCard
            label="Pending Approvals"
            value="17"
            icon={<ClipboardCheck />}
            tone="warning"
          />
          <StatCard
            label="Active Solvers"
            value="42"
            icon={<Users />}
            tone="success"
          />
          <StatCard
            label="Flagged Content"
            value="6"
            icon={<MessageSquareWarning />}
            tone="danger"
          />
          <StatCard
            label="Live Activity"
            value="Ongoing"
            icon={<Activity />}
            tone="neutral"
          />
        </div>
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
            Attention Required
          </h2>

          <div className="space-y-3">
            <AttentionItem
              title="Road Damage Issue – Zone 5"
              meta="Pending admin approval · 6h"
              severity="high"
            />
            <AttentionItem
              title="Forum Report: Abusive Language"
              meta="3 user reports · 2h"
              severity="medium"
            />
            <AttentionItem
              title="Poll Awaiting Approval"
              meta="Community poll · 1d"
              severity="low"
            />
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
            <ActivityItem text="Solver Rahul resolved drainage issue" time="12m ago" />
            <ActivityItem text="Admin approved city cleanliness poll" time="45m ago" />
            <ActivityItem text="Volunteer army event completed" time="2h ago" />
            <ActivityItem text="New issue reported in Zone 3" time="4h ago" />
          </div>
        </motion.section>
      </div>

      {/* ============================= */}
      {/* PERFORMANCE & TRENDS */}
      {/* ============================= */}
      <motion.section
        {...fadeUp}
        transition={{ delay: 0.15 }}
        className="mb-4"
      >
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          Performance & Trends
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PlaceholderChart title="Issues Resolved vs Reported" />
          <PlaceholderChart title="Average Resolution Time" />
          <PlaceholderChart title="Solver Workload Distribution" />
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

function AttentionItem({ title, meta, severity }) {
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
        <p className="text-xs text-slate-400">{meta}</p>
      </div>
      <button className="text-sm font-semibold text-blue-400 hover:text-blue-300">
        Review
      </button>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div className="flex justify-between items-center">
      <span>{text}</span>
      <span className="text-xs">{time}</span>
    </div>
  );
}

function PlaceholderChart({ title }) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 h-40 flex items-center justify-center">
      <span className="text-sm text-slate-400">{title}</span>
    </div>
  );
}

