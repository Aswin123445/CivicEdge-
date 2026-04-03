import Pulse from "./Pulse";

const QuickActionSkeleton = () => (
  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
    <Pulse className="w-10 h-10 rounded-lg" />
    <Pulse className="h-3 w-20" />
    <Pulse className="h-7 w-10" />
  </div>
);
export default QuickActionSkeleton