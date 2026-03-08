import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/datenormalize";

const IssueHeader = ({ issue }) => {
  const date = formatDate(issue?.created_at);
  const navigate = useNavigate()
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <button onClick={() => {navigate("/admin/execution/in-review/issues/")}} className="flex items-center text-slate-400 hover:text-slate-100 transition-colors mb-2 text-sm">
          <span className="mr-2">←</span> Back to Issues
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Issue #{issue?.reference_id}
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
            {issue.status}
          </span>
        </div>
        <p className="text-slate-400 mt-1">
          {issue.category_name} • Reported on {date}
        </p>
      </div>
    </header>
  );
};

export default IssueHeader;
