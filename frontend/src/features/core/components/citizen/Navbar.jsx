import CitizenLogo from "../../../../components/ui/CitizenLogo.jsx";
import CitizenBellIconNotification from "../../../notifications/components/CitizenBellIconNotification.jsx";
import useNotificationCount from "../../../notifications/hooks/notificationCountHook.js";
import NotificationDrawer from "../../../notifications/pages/NotificationDrawer.jsx";
import useCitizenUi from "../../hooks/citizen/uiHooks";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import LoginPill from "../../ui/citizen/LoginPhill.jsx";
import { HomeIcons } from "../../ui/HomeIcons";
import MobileMenButton from "../../ui/MobileMenuButton";
import NavItem from "../../ui/NavItem";
import UserSkeleton from "../../ui/skeltons/UserButtonSkelton";
import NameUrlGet from "../NameUrlGet";
import UserMenu from "../UserMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ... imports stay the same

const HomeNavbar = () => {
  const navigate = useNavigate();
  const { role } = useSelector((s) => s.auth);
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const handleNavigate = (route) => navigate("/landing");
  const {
    userMenuOpen: menuOpen,
    setUserMenuOpen: setMenuOpen,
    userNotificationsOpen,
    setUserNotificationsOpen,
  } = useCitizenUi();
  const { notificationCount, countRefetch } = useNotificationCount({
    enabled: !userNotificationsOpen,
  });
  return (
    <header className="sticky top-0 z-50 bg-blue-600/90 backdrop-blur-md border-b border-blue-500/30 text-white">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. START: LOGO */}
        <CitizenLogo />

        {/* 2. END: WRAPPER FOR EVERYTHING ELSE */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation Links */}
          <div
            className={`hidden md:flex items-center gap-4 px-6 text-white/90 text-sm font-medium  xl:mr-60 lg:mr-32 md:mr-8 ${!role && " lg:pr-36 md:pr-20 "}`}
          >
            <NavItem
              icon={<HomeIcons.Issues />}
              label="Issues"
              path="/complaints"
            />
            <NavItem
              icon={<HomeIcons.Army />}
              label="Armies"
              path="volunteer-army"
            />
            <NavItem
              icon={<HomeIcons.Polls />}
              label="Polls"
              path={"/poll/home"}
            />
            <NavItem
              icon={<HomeIcons.Talk />}
              label="Civic Talk"
              path="/forum"
            />
          </div>

          {/* User / Auth / Mobile Controls */}
          <div className="flex items-center gap-3">
            {role === "citizen" ? (
              <>
                {/* Mobile Icons Group */}
                <div className="flex md:hidden items-center gap-2">
                  <CitizenBellIconNotification
                    onClick={() => setUserNotificationsOpen(true)}
                    count={notificationCount?.unread_count || 0}
                  />
                  <MobileMenButton />
                </div>

                {/* Desktop Profile Section */}
                {userDataLoading || userDataFetching ? (
                  <UserSkeleton />
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                    <CitizenBellIconNotification
                      onClick={() => setUserNotificationsOpen(true)}
                      count={notificationCount?.unread_count || 0}
                    />
                    <div
                      onClick={() => setMenuOpen((pre) => !pre)}
                      className="flex cursor-pointer items-center gap-3 bg-blue-700/50 px-3 py-1.5 rounded-full"
                    >
                      <div className="w-7 h-7 bg-blue-200 rounded-full overflow-hidden">
                        <NameUrlGet
                          name={userData?.profile?.name}
                          avatarUrl={userData?.profile?.avatar}
                          classname="w-7 h-7"
                        />
                      </div>
                      <span className="text-sm">
                        {userData?.profile?.name || "User"}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <LoginPill onClick={() => handleNavigate()} />
            )}
          </div>

          {/* Menu Dropdown - Kept inside for relative positioning if needed */}
          <UserMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          <NotificationDrawer
            open={userNotificationsOpen}
            onClose={() => setUserNotificationsOpen(false)}
            role="citizen"
          />
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
