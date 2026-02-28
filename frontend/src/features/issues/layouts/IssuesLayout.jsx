import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const IssuesLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="relative  bg-slate-50 pt-1">
      
      {/* 🔹 Floating Back Button (Does NOT affect layout) */}
 <button
      onClick={() => navigate("/complaints")}
      className=" hidden md:flex
        fixed top-20 left-40 ml-8 z-40
        inline-flex items-center gap-1.5
        px-3 py-1.5
        rounded-lg
        bg-white/80 backdrop-blur
        border border-slate-200
        text-slate-600 text-sm font-medium
        shadow-sm
        hover:bg-white hover:text-slate-900
        focus:outline-none focus:ring-2 focus:ring-blue-500/30
        transition
      "
      aria-label="Go back to issues list"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>

      {/* 🔽 Child routes render normally — NO padding added */}
      <Outlet />
    </div>
  );
};

export default IssuesLayout;