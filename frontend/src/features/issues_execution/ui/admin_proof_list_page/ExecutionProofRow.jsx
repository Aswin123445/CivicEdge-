import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/datenormalize";

const ExecutionProofRow = ({ proof }) => {
  const navigate = useNavigate()
  const date = formatDate(proof?.submitted_at)
  return (
    <tr className="bg-[#1e1e1e] hover:bg-gray-700/100 transition-colors group">
      <td className="px-6 py-5">
        <span className="font-mono text-sm text-blue-400">{proof.reference_id}</span>
      </td>
      <td className="px-6 py-5">
        <span className="text-sm text-slate-300">{proof.issue_reference}</span>
      </td>
      <td className="px-6 py-5">
        <span className="text-sm text-slate-400">{date}</span>
      </td>
      <td className="px-6 py-5 text-right">
        <button
          onClick={() => {navigate(`/admin/execution/execution-proof/${proof?.id}`)}}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 bg-[#1e1e1e] group-hover:bg-blue-600 border border-slate-700 group-hover:border-blue-500 px-4 py-1.5 rounded-lg transition-all"
        >
          Review
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
export default ExecutionProofRow;