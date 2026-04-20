import { useState } from "react";
import {
  X,
  User,
  LayoutDashboard,
  ClipboardCheck,
  ShieldCheck,
  Vote,
  MessageSquare,
  ScrollText,
  Boxes 
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useCitizenService from "../../features/core/hooks/citizen/useCitizenService";
import { AdminIdentitySkeleton } from "../../features/core/ui/skeltons/admin/AdminIdentitySkeleton";
import AdminIdentity from "../../features/core/ui/AdminIdentity";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, userDataLoading, userDataFetching } = useCitizenService();

  const pollPath = [
    "/admin/polls"
  ];
  const volunteerPath = [
    "/admin/volunteer/groups",
    "/admin/volunteer/events",
    "/admin/volunteer/memberships",
    "/admin/volunteer/attendance"
  ]
  const executionPaths = [
    "/admin/execution/in-review/issues",
    "/admin/execution/solver-assignment",
    "/admin/execution/verification-reports",
    "/admin/execution/solver-tasks",
    "/admin/execution/execution-proofs",
    "/admin/execution/verification-report",
    "/admin/execution/tasks/list",
  ];
  const roleManagementPaths = [
    "/admin/management/citizens",
    "/admin/management/solvers",
    "/admin/management/admins",
  ];

  const forumManagementPaths = [
    "/admin/forum/reports",
    "/admin/forum/posts",
    "/admin/forum/category",
    "/admin/forum/moderation"
  ]
  const moderationPaths = [
    "/admin/monitoring/activity-log"
  ] 
  const resouceManagement = [
    "/admin/resource/category",
    "/admin/resource/zones",
    "/admin/resource/behavioral"
  ]

  const isResourceManagementPath = resouceManagement.some((path) =>
    location.pathname.startsWith(path),
  );
  const isModerationPath = moderationPaths.some((path) =>
    location.pathname.startsWith(path),
  );
  const isForumManagementPath = forumManagementPaths.some((path) =>
    location.pathname.startsWith(path),
  );  
   
  const isRoleManagementPath = roleManagementPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  const isExecutionPath = executionPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  const isVolunteerPath = volunteerPath.some((path) =>
    location.pathname.startsWith(path),
  );
  const isPollPath = pollPath.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      {/* Toggle Button - only visible on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 bg-gray-800 h-20 text-white rounded-full md:hidden fixed 
                    top-32 left-2 z-50 flex items-center justify-center shadow 
                    ${isOpen ? "hidden" : ""}`}
      >
        <span className="text-lg font-bold">{">"}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-16 md:top-0 left-0 bottom-0 w-64 
          bg-[#181818] border-r border-gray-700 flex flex-col custom-scrollbar
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div
          onClick={() => navigate("/admin/profile")}
          className="cursor-pointer flex justify-between items-center px-4 py-3 border-b border-gray-700"
        >
          {userDataLoading || userDataFetching ? (
            <AdminIdentitySkeleton />
          ) : (
            <AdminIdentity user={userData?.profile || {}} />
          )}
          {/* Close button - only on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/management/citizens"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isRoleManagementPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <User className="w-5 h-5 mr-2" />
            Role Management
          </NavLink>
          <NavLink
            to="/admin/execution/in-review/issues"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isExecutionPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <ClipboardCheck className="w-5 h-5 mr-2" />
            Issue Execution
          </NavLink>
          <NavLink
            to="/admin/volunteer/groups"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isVolunteerPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Army Management
          </NavLink>
          <NavLink
            to="/admin/polls"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isPollPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Vote className="w-5 h-5 mr-2" />
            Poll Management
          </NavLink>
          <NavLink
            to="/admin/forum/reports"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isForumManagementPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Forum Management
          </NavLink>
          <NavLink
            to="/admin/resource/category"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isResourceManagementPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Boxes   className="w-5 h-5 mr-2" />
            Resource Management
          </NavLink>
          <NavLink
            to="/admin/monitoring/activity-log"
            end
            className={() =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isModerationPath
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <ScrollText  className="w-5 h-5 mr-2" />
            Monitoring
          </NavLink>
        </nav>
      </aside>

      {/* Overlay - only on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default AdminSidebar;
