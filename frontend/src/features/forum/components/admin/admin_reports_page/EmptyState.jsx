import { CheckCircle2 } from "lucide-react";
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-[#1e1e1e] border border-dashed border-slate-800 rounded-2xl text-center">
    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
      <CheckCircle2 className="text-green-500 w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-100">No reports found</h3>
    <p className="text-slate-400 mt-2">All content is currently clean 🎉</p>
  </div>
);

export default EmptyState;