import Pulse from "../../ui/Volunteer_home_page/Pulse";

const UserSummarySkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-4 mb-6">
      <Pulse className="w-14 h-14 rounded-full" />
      <div className="space-y-2 flex-1">
        <Pulse className="h-4 w-24" />
        <Pulse className="h-3 w-32" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
      <div className="text-center space-y-1">
        <Pulse className="h-6 w-8 mx-auto" />
        <Pulse className="h-3 w-12 mx-auto" />
      </div>
      <div className="text-center space-y-1 border-l border-slate-100">
        <Pulse className="h-6 w-8 mx-auto" />
        <Pulse className="h-3 w-12 mx-auto" />
      </div>
    </div>
  </div>
);

export default UserSummarySkeleton;