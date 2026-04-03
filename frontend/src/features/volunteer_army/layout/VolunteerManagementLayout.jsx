import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function VolunteerManagementLayout() {
  const location = useLocation();
  const solverTask = [
    "/admin/execution/tasks/list",
    "/admin/execution/solver-tasks/",
  ];

  const groups = ["/admin/volunteer/groups"];

  const events = ["/admin/volunteer/events"];

  const membership = ["/admin/volunteer/memberships"];

  const attendance = [
    "/admin/volunteer/attendance",
  ];

  const isAttendancePath = attendance.some((path) =>
    location.pathname.startsWith(path),
  );
  const isMembership = membership.some((path) =>
    location.pathname.startsWith(path),
  );

  const isSolverTaskPath = solverTask.some((path) =>
    location.pathname.startsWith(path),
  );
  const isGroups = groups.some((path) => location.pathname.startsWith(path));
  const isEvents = events.some((path) => location.pathname.startsWith(path));
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/admin/volunteer/groups"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isGroups
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Groups
        </NavLink>

        <NavLink
          to="/admin/volunteer/events"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isEvents
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Events
        </NavLink>

        <NavLink
          to="/admin/volunteer/memberships"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isMembership
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Memberships
        </NavLink>

        <NavLink
          to="/admin/volunteer/attendance"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isAttendancePath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Attendance
        </NavLink>
        {/* <NavLink
          to="/admin/execution/tasks/list"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isSolverTaskPath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Recognition
        </NavLink>
        <NavLink
          to="/admin/execution/tasks/list"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isSolverTaskPath
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Analytics
        </NavLink> */}
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
