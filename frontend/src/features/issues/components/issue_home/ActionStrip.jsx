import { FileText, MapPin, AlertTriangle } from "lucide-react";
import ActionCard from "./ActionCard";
import useIssueHomePageService from "../../hooks/home_page_service";

const ACTIONS = (summary) => [
  {
    id: "drafts",
    icon: <FileText />,
    title: "Draft Issues",
    desc: "Continue incomplete reports",
    badge: summary?.draft_issues > 0 ? summary.draft_issues : undefined,
    path: "/drafts",
  },
  {
    id: "my-issues",
    icon: <AlertTriangle />,
    title: "My Issues",
    desc: "Track submitted complaints",
    badge:
      summary?.submitted_issues > 0
        ? summary.submitted_issues
        : undefined,
    path: "/complaints/list",
  },
  {
    id: "nearby",
    icon: <MapPin />,
    title: "Nearby Complaints",
    desc: "View issues around you",
    path: "/nearby",
  },
];

export default function ActionStrip() {
  const { issueSummary, issueLoading, issueError } =
    useIssueHomePageService();

  return (
    <section
      className="-mt-16 px-6 relative z-10"
      aria-labelledby="quick-actions"
    >
      <div className="max-w-7xl mx-auto">
        <div

          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Loading state */}
          {issueLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-slate-100 animate-pulse"
              />
            ))}

          {/* Error state */}
          {!issueLoading && issueError && (
            <div className="md:col-span-3 rounded-2xl border bg-white p-6 text-center text-sm text-slate-600">
              Unable to load issue summary right now. Please try again later.
            </div>
          )}

          {/* Success state */}
          {!issueLoading &&
            !issueError &&
            ACTIONS(issueSummary).map((action) => (
              <ActionCard key={action.id} {...action} />
            ))}
        </div>
      </div>
    </section>
  );
}