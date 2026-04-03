// components/admin/events/create/CreateEventPageHeader.jsx
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateEventPageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="max-w-4xl mx-auto px-6 py-6">
      <div
        className="flex items-center gap-3 mb-4 text-slate-500 cursor-pointer hover:text-slate-200 transition-colors w-fit"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Events / New
        </span>
      </div>
      <h1 className="text-4xl font-black tracking-tight italic text-slate-100">
        Create Event
      </h1>
      <p className="text-slate-500 font-medium mt-2">
        Initialize a new volunteer mission on the CivicEdge network.
      </p>
    </header>
  );
};

export default CreateEventPageHeader;
