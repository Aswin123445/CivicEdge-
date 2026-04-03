// components/citizen/memberships/MembershipsHeader.jsx
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MembershipsHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Memberships</h1>
        <p className="text-slate-500 mt-2 text-lg">
          Groups you are actively part of within the CivicEdge network.
        </p>
      </div>
      <button
        onClick={() => navigate("/groups/explore")}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-all hover:shadow-md active:scale-95"
      >
        <PlusCircle size={20} />
        Explore New Groups
      </button>
    </header>
  );
};

export default MembershipsHeader;
