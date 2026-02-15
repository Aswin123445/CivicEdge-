import CitizenLogo from "../../../../components/ui/CitizenLogo";
import useCitizenUi from "../../hooks/citizen/uiHooks";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import { HomeIcons } from "../../ui/HomeIcons";
import MobileMenButton from "../../ui/MobileMenuButton";
import NavItem from "../../ui/NavItem";
import UserSkeleton from "../../ui/skeltons/UserButtonSkelton";
import NameUrlGet from "../NameUrlGet";
import UserMenu from "../UserMenu";

import {User} from "lucide-react"
const HomeNavbar = () => {
  const { userData, userDataLoading } = useCitizenService();
  const { userMenuOpen: menuOpen, setUserMenuOpen: setMenuOpen } =
    useCitizenUi();
  return (
    <header className="sticky top-0 z-50 bg-blue-600/90 backdrop-blur-md border-b border-blue-500/30 text-white">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <CitizenLogo />
        <div
          className=" hidden md:flex group  items-center gap-4 px-4 py-2 rounded-full
        text-white/90 text-sm font-medium
        transition-all duration-300
        hover: hover:backdrop-blur-md
        hover:text-white
        hover:shadow-sm"
        >
          <NavItem icon={<HomeIcons.Issues />} label="Issues" />
          <NavItem icon={<HomeIcons.Talk />} label="Civic Talk" />
          <NavItem icon={<HomeIcons.Army />} label="Armies" />
          <NavItem icon={<HomeIcons.Polls />} label="Polls" />
        </div>

        <MobileMenButton />
        {userDataLoading ? (
          <UserSkeleton />
        ) : (
          <div
            onClick={() => setMenuOpen((pre) => !pre)}
            className="hidden md:flex cursor-pointer items-center gap-3 bg-blue-700/50 px-3 py-1.5 rounded-full"
          >
            <div className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-sm font-semibold">
              <NameUrlGet
                name={userData.profile?.name}
                avatarUrl={userData.profile?.avatar}
                classname="w-7 h-7"
              />
            </div>
            <span className="text-sm pb-1">
              {userData.profile?.name || "User"}
            </span>
          </div>
        )}
        <UserMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
};

export default HomeNavbar;
