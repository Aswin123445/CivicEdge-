import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function ResourceLayout() {
  const location = useLocation();
  const category = ["/admin/resource/category"];
  const zone = ["/admin/resource/zones"];
  const behavioral = ["/admin/resource/behavioral"];

  const isBehavioral = behavioral.some((path) =>
    location.pathname.startsWith(path),
  );

  const isCategory = category.some((path) =>
    location.pathname.startsWith(path),
  );
  const isZone = zone.some((path) => location.pathname.startsWith(path));

  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        <NavLink
          to="/admin/resource/category"
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
          to="/admin/resource/zones"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isZone
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Zone
        </NavLink>
        <NavLink
          to="/admin/resource/behavioral"
          className={() =>
            `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isBehavioral
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
          }
        >
          Behavioral 
        </NavLink>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <Outlet />
      </main>
    </>
  );
}
