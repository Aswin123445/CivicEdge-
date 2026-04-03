import { useNavigate } from "react-router-dom";
const NavItem = ({ icon, label, path}) => {
  const navigate = useNavigate();
  return (
  <div onClick={() => navigate(path)} className="flex items-center gap-1.5 hover:text-blue-200 cursor-pointer">
    {icon}
    {label}
  </div>
);}

export default NavItem;