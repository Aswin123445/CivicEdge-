import { AlertCircle, Clock } from "lucide-react";
import SummaryCard from "../pending_review_page/SummaryCard";

export default function AdminSolverSummaryMetrics({totalPending = 0, submittedToday = 0}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <SummaryCard
        title="Total Task"
        value={totalPending}
        icon={AlertCircle}
        color="text-blue-500"
      />

      <SummaryCard
        title="Submitted Today"
        value={submittedToday}    
        icon={Clock}
        color="text-purple-500"
      />


    </div>
  );
}