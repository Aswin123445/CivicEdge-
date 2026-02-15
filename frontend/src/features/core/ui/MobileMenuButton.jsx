import MobileMenu from "../components/MobileMenu";
import useCitizenUi from "../hooks/citizen/uiHooks";
import { Menu } from "lucide-react";

export default function MobileMenButton() {
  const { setPhoneMenuOpen, phoneMenuOpne } = useCitizenUi();
  return (
    <>
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setPhoneMenuOpen(true)}
      >
        <Menu size={28} strokeWidth={1.8} />
      </button>
      <MobileMenu
        open={phoneMenuOpne}
        onClose={() => setPhoneMenuOpen(false)}
        userEmail="user@email.com"
      />
    </>
  );
}