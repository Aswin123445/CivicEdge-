const NavItem = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 hover:text-blue-200 cursor-pointer">
    {icon}
    {label}
  </div>
);

export default NavItem;