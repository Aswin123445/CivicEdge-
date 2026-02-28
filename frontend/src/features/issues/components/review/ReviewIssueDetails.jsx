// ReviewIssueDetails.jsx
import { FileText } from "lucide-react";
import ReviewCard from "./ReviewCard";
import IssueDetailsSkeleton from "../../ui/skeltons/IssueDetailsSkeleton";

export default function ReviewIssueDetails({ issue,isLoadingReview }) {
  return (
    <ReviewCard title="Issue Details" icon={<FileText size={18} />}>
      <div className="space-y-3">
        <p className="font-bold">{issue?.title}</p>
        <p className="text-sm text-slate-600">{issue?.description}</p>
        <span className="text-xs text-blue-600 font-semibold">
          {issue?.category}
        </span>
      </div>
    </ReviewCard>
  );
}