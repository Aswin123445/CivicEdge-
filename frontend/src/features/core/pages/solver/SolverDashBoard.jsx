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
import { pulseAnimation, statVariants } from "../../utils";
import AnimatedNumber from "../../ui/solver/AnimatedNumber";
import useSolverService from "../../hooks/solver/solverServiceHook";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import AvailabilitySkeleton from "../../ui/skeltons/Solver/AvailabilitySkeleton";
import SolverDashBoardHeader from "../../components/solver/solver_dashboard/SolverDashBoardHeader";
import SummaryStrip from "../../components/solver/solver_dashboard/SummaryStrip";
import NewAssignment from "../../components/solver/solver_dashboard/NewAssignment";
import InProgressTask from "../../components/solver/solver_dashboard/InProgressTask";
import RightInProgress from "../../components/solver/solver_dashboard/RighInProgress";
import Resolved from "../../components/solver/solver_dashboard/Resolved";
import useSolverDashboardService from "../../hooks/solver/solverDashboardHook";

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
  const {solverDashboard, solverDashboardLoading, solverDashboardFetching} = useSolverDashboardService();
  const { toggleWork } = useSolverService();
  const { userDataLoading, userDataFetching, userData } = useCitizenService();
  console.log('solverDashboard',solverDashboard)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 2. SOLVER CONTEXT HEADER */}
      {userDataLoading || userDataFetching || solverDashboardFetching || solverDashboardLoading ? (
        <AvailabilitySkeleton />
      ) : (
        <SolverDashBoardHeader
          userData={userData}
          toggleWork={toggleWork}
        />
      )}

      <main className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* 3. TASK SUMMARY STRIP */}
        <SummaryStrip metrics={solverDashboard?.metrics} statVariants={statVariants} pulseAnimation={pulseAnimation} AnimatedNumber={AnimatedNumber} />

        {/* 4. MAIN DASHBOARD CONTENT */}
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: NEW ASSIGNMENTS */}

          <section className="col-span-12 lg:col-span-8">
            <div className="flex flex-col gap-8">
              {/* ===================== */}
              {/* NEW ASSIGNMENTS */}
              {/* ===================== */}
              <NewAssignment NEW_TASKS={solverDashboard?.recent_assigned_tasks} />

              {/* ===================== */}
              {/* IN PROGRESS TASKS */}
              {/* ===================== */}
            </div>
          </section>

          {/* RIGHT: SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* IN PROGRESS */}
            <RightInProgress IN_PROGRESS={solverDashboard?.in_progress_tasks} />

            {/* RESOLVED */}
            <Resolved completedTask={solverDashboard?.recent_resolved_tasks}/>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SolverDashBoard;
