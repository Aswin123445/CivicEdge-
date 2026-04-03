import Pulse from "./Pulse";

const EventRowSkeleton = () => (
  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
    <Pulse className="h-4 w-2/3" />
    <div className="flex justify-between">
      <Pulse className="h-3 w-20" />
      <Pulse className="h-3 w-16" />
    </div>
  </div>
);
export default EventRowSkeleton