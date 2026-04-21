import { useNavigate } from "react-router-dom";

const IssueAssignmentTable = ({issues, isLoading}) => {
  const navigate = useNavigate();
  const handleAssignSolver = (issueId) => {
    navigate(`/dashboard/execution/solver-assignment/${issueId}/decision`);
  }
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-[#1e1e1e] bg-[#1e1e1e]/50">
              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                Reference ID
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                Reporter
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                Created
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {isLoading ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  Loading assignment queue...
                </td>
              </tr>
            ) : issues.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No issues currently awaiting assignment.
                </td>
              </tr>
            ) : (
              issues.map((issue) => (
                /* --- COMPONENT: IssueRow --- */
                <tr
                  key={issue.id}
                  className="hover:bg-[#1e1e1e]/80 transition-colors group"
                >
                  <td className="px-6 py-4 align-top">
                    <span className="font-mono text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      {issue.reference_id}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="text-xs text-slate-400">
                      {issue.category_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-slate-300">
                      {issue.reporter_email}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-slate-400">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(issue.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <button
                      onClick={() => handleAssignSolver(issue.id)}
                      className="bg-slate-100 hover:bg-white text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 focus:ring-2 focus:ring-slate-400 outline-none"
                    >
                      Assign Solver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueAssignmentTable;
