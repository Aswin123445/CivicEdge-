import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function MonitorLayout() {
  const location = useLocation();
  const activityLog = ["/dashboard/monitoring/activity-log"];

  const isActivityLog = activityLog.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/dashboard/execution/tasks/list"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isActivityLog
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Activity Log
        </NavLink>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
