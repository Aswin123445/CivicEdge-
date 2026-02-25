import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const IssuesLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="relative  bg-slate-50 pt-1">
      
      {/* 🔹 Floating Back Button (Does NOT affect layout) */}
      <button
        onClick={() => navigate("/complaints")}
        className="
           top-20 left-6 z-50
          inline-flex items-center gap-2
          px-4 py-2
          rounded-xl
          bg-blue-200 backdrop-blur
          border border-slate-200
          text-slate-700 font-semibold text-sm
          shadow-sm
          hover:bg-slate-100 hover:text-slate-900
          transition-all
        "
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Issues
      </button>

      {/* 🔽 Child routes render normally — NO padding added */}
      <Outlet />
    </div>
  );
};

export default IssuesLayout;