import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function PollManagementLayout() {
  const location = useLocation();

  const polls = ["/dashboard/polls"];

  const isPolls = polls.some((path) => location.pathname.startsWith(path));
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/dashboard/polls"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isPolls
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Polls
        </NavLink>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
