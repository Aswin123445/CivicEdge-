import { NavLink, Outlet } from "react-router-dom";

const sections = [
  {
    label: "Pending Review",
    path: "/admin/execution/in-review/issues",
    exact: true,
  },
  {
    label: "Assign Solver",
    path: "/admin/execution/solver-assignment",
  },
  {
    label: "Verification Reports",
    path: "/admin/execution/verification-reports",
  },
  { label: "Solver Tasks", path: "/admin/execution/solver-tasks" },
  { label: "Execution Proofs", path: "/admin/execution/execution-proofs" },
];

export default function ExecutionManagementLayout() {
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-1 gap-2 px-2 custom-scrollbar">
        {sections.map((section) => (
          <NavLink
            key={section.path}
            to={section.path}
            className={({ isActive }) =>
              `px-4 py-2 flex-shrink-0 transition-colors duration-200 
            ${
              isActive
                ? "border-b-2 border-[#56CCF2] text-white"
                : "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500"
            }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </div>
      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
