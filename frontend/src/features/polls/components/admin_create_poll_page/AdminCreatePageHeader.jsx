import { ArrowLeft } from "lucide-react";
const AdminCreatePageHeader = ({ navigate }) => {
  return (
    <header className="border-b border-slate-800 bg-[#1e1e1e] backdrop-blur-md sticky top-0 z-30 py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => {navigate('/admin/polls')}} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Poll</h1>
            <p className="text-slate-400 text-sm mt-1">
              Define a civic decision for citizen participation
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminCreatePageHeader;
