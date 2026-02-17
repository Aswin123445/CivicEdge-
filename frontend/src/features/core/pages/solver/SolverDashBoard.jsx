// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  Settings,
  User,
  Menu,
  AlertCircle,
  Play,
} from "lucide-react";
import CurrentDateTime from "../../ui/CurrentDateTime";
import { pulseAnimation, statVariants } from "../../utils";
import AnimatedNumber from "../../ui/solver/AnimatedNumber"; 
import { ArrowRight } from "lucide-react";
import useSolverService from "../../hooks/solver/solverServiceHook";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import AvailabilitySkeleton from "../../ui/skeltons/Solver/AvailabilitySkeleton";


// --- Mock Data ---
const STATS = [
  {
    id: 1,
    label: "New Assignments",
    count: 3,
    color: "bg-red-50",
    border: "border-red-100",
    text: "text-red-600",
    icon: <AlertCircle size={20} />,
  },
  {
    id: 2,
    label: "In Progress",
    count: 12,
    color: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
    icon: <Settings size={20} />,
  },
  {
    id: 3,
    label: "Pending / Waiting",
    count: 5,
    color: "bg-yellow-50",
    border: "border-yellow-100",
    text: "text-yellow-600",
    icon: <Clock size={20} />,
  },
  {
    id: 4,
    label: "In Progress",
    count: 2,
    color: "bg-green-50",
    border: "border-green-100",
    text: "text-green-600",
    icon: <CheckCircle size={20} />,
  },

  {
    id: 5,
    label: "Resolved",
    count: 48,
    color: "bg-green-50",
    border: "border-green-100",
    text: "text-green-600",
    icon: <CheckCircle size={20} />,
  },
];

const NEW_TASKS = [
  {
    id: 1,
    title: "Pothole on Main Street",
    category: "Road Maintenance",
    location: "1343 Dorktown, NK 2836",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Streetlight Outage",
    category: "Lighting",
    location: "1343 Burksown, NM 2006",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Pothole on Main Street",
    category: "Road Maintenance",
    location: "1343 Dorktown, NY 2836",
    time: "2 hours ago",
  },
];

const IN_PROGRESS = [
  { id: 1, title: "Graffiti Removal", progress: 70, due: "13 min" },
  { id: 2, title: "Park Cleanup", progress: 75, due: "10 min" },
  { id: 3, title: "Streetlight Outage", progress: 10, due: "10 min" },
];

const SolverDashBoard = () => {
  const {toggleWork} =  useSolverService();
  const {userDataLoading,userDataFetching,userData} = useCitizenService();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* 2. SOLVER CONTEXT HEADER */}
              {userDataLoading || userDataFetching ? (<AvailabilitySkeleton/>) :(

      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-500">Status:</span>
          <button
            onClick={() => toggleWork()}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${userData?.profile?.availability ? "bg-green-500" : "bg-slate-300"}`}
          >
            <motion.div
              animate={{ x: userData?.profile?.availability ? 26 : 4 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </button>
          <span
            className={`font-bold ${userData?.profile?.availability ? "text-green-600" : "text-slate-400"}`}
          >
            {userData?.profile?.availability ? "Working" : "Off-Duty"}
          </span>
        </div>

        <div className="flex gap-4">
          <p>
            <span className="text-slate-500">Zone:</span>{" "}
            <span className="font-bold">{userData?.profile?.zone || "Unknown Zone"}</span>
          </p>
          <CurrentDateTime />
        </div>
      </header>)}

      <main className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* 3. TASK SUMMARY STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              custom={index}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3 }}
              {...(stat.active ? pulseAnimation : {})}
              className={`
        p-4 rounded-xl border
        ${stat.border} ${stat.color}
        flex items-center justify-between
        shadow-sm transition-all
      `}
            >
              <div>
                <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className={`text-3xl font-black ${stat.text}`}>
                  <AnimatedNumber value={stat.count} />
                </p>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ delay: 0.2 }}
                className={`${stat.text}`}
              >
                {stat.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 4. MAIN DASHBOARD CONTENT */}
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: NEW ASSIGNMENTS */}

<section className="col-span-12 lg:col-span-8">
  <div className="flex flex-col gap-8">
    
    {/* ===================== */}
    {/* NEW ASSIGNMENTS */}
    {/* ===================== */}
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          New Assignments
          <span className="text-xs font-semibold text-slate-500">
            ({NEW_TASKS.length})
          </span>
        </h2>
      </div>

      {/* Tasks Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {NEW_TASKS.slice(0, 3).map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="
              bg-white p-5 rounded-xl
              border border-slate-200
              shadow-sm hover:shadow-md
              transition-shadow
            "
          >
            <h3 className="font-bold text-slate-800 leading-tight mb-2">
              {task.title}
            </h3>

            <span className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase mb-4">
              {task.category}
            </span>

            <div className="space-y-2 mb-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-bold text-red-600 text-xs">
                  High Priority
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{task.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Assigned {task.time}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="
                w-full py-2.5
                bg-blue-600 text-white
                font-semibold rounded-lg
                hover:bg-blue-700
                transition-colors
                shadow-md shadow-blue-100
              "
            >
              Review Task
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-5">
        <button
          onClick={() => console.log("View All Tasks")}
          className="
            w-full flex items-center justify-center gap-2
            py-3 rounded-xl
            border border-dashed border-slate-300
            text-slate-600 font-semibold
            hover:border-blue-500 hover:text-blue-600
            hover:bg-blue-50
            transition-all
          "
        >
          View All Tasks
          <ArrowRight size={16} />
        </button>
      </div>
    </div>

    {/* ===================== */}
    {/* IN PROGRESS TASKS */}
    {/* ===================== */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">
          In Progress
        </h3>
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {IN_PROGRESS.slice(0, 4).map((task) => (
          <div
            key={task.id}
            className="
              flex items-start justify-between gap-4
              p-3 rounded-lg
              hover:bg-slate-50 transition
            "
          >
            <div className="min-w-0">
              <p className="font-semibold text-slate-700 truncate">
                {task.title}
              </p>
              <p className="text-xs text-slate-400">
                {task.location}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-amber-600">
                {task.progress}%
              </span>
              <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-amber-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>





          {/* RIGHT: SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* IN PROGRESS */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">
                In Progress Tasks
              </h3>
              <div className="space-y-6">
                {IN_PROGRESS.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{task.title}</span>
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> Due Soon {task.due}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className="h-full bg-blue-600"
                      />
                    </div>
                    <p className="text-right text-[10px] text-slate-400 font-bold">
                      {task.progress}% Complete
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RESOLVED */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">
                Recently Resolved
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-slate-600 font-medium">
                      Park Cleanup
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs">13m ago</span>
                      <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                        Resolved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SolverDashBoard;
