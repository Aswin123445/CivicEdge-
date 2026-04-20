import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function ForumManagementLayout() {
  const location = useLocation();

  const reports = ["/admin/forum/reports"];
  const post = ["/admin/forum/posts"]
  const category = ["/admin/forum/category"]
  const logs = ["/admin/forum/moderation"]

  const isReports = reports.some((path) => location.pathname.startsWith(path));
  const isPosts = post.some((path) => location.pathname.startsWith(path));
  const isCategory = category.some((path) => location.pathname.startsWith(path));
  const isLogs = logs.some((path) => location.pathname.startsWith(path));
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/admin/forum/reports"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isReports
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/admin/forum/posts"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isPosts
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/admin/forum/category"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isCategory
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Category
        </NavLink>
        <NavLink
          to="/admin/forum/moderation"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isLogs
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Moderation Logs
        </NavLink>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
