import { Inbox } from "lucide-react";
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/20">
        <Inbox size={32} />
      </div>
      <p className="text-white/60 font-medium">All caught up!</p>
      <p className="text-xs text-white/40 mt-1">No new notifications at the moment.</p>
    </div>
  );
} 
export default EmptyState;