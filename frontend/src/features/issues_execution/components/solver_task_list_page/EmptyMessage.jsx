import { CheckCircle2 } from "lucide-react";

export default function SolverListEmpty() {
  return (
    <div className="py-20 flex flex-col items-center justify-center  text-center">

      <div className="bg-[#1f2937] p-4 rounded-full mb-4">
        <CheckCircle2 size={48} className="text-slate-600" />
      </div>

      <h3 className="text-lg font-medium text-black">
        No Tasks Available to show.
      </h3>

      <p className="text-slate-500 max-w-xs">
        All clear! Check back later .
      </p>

    </div>
  );
}