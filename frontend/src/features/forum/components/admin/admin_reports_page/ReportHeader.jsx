import { ShieldAlert } from "lucide-react";
const ReportHeader = ({ totalReport }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Reports</h1>
        <p className="text-slate-400 flex items-center gap-2">
          <ShieldAlert size={18} className="text-blue-500" />
          Manage and review reported community content
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Active Reports
          </span>
          <span className="text-lg font-bold text-blue-500">{totalReport}</span>
        </div>
      </div>
    </header>
  );
};

export default ReportHeader;
