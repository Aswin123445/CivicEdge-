import Pulse from "./Pulse";

const GroupCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
    <div className="flex justify-between items-start">
      <Pulse className="w-9 h-9 rounded-lg" />
      <Pulse className="w-16 h-5 rounded-full" />
    </div>
    <Pulse className="h-5 w-3/4" />
    <div className="space-y-2">
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-5/6" />
    </div>
    <Pulse className="h-9 w-full rounded-lg" />
  </div>
);
export default GroupCardSkeleton