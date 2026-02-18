import { useNavigate } from "react-router-dom";
const CitizenLogo = ({ classname = "",navigate_route = '/home'}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(navigate_route)}>
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">
        C
      </div>
      <span className={`text-xl font-bold ${classname}`}>CivicEdge</span>
    </div>
  );
};

export default CitizenLogo;
