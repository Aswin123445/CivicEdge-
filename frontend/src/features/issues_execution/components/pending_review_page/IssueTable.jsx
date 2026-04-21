import { MapPin, Clock, FileText, ChevronRight } from "lucide-react";
import Pagination from "../../../../components/common/PaginationBar";
import { useNavigate } from "react-router-dom";

export default function IssueTable({ issues ,pagination, goToPage,page}) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1e1e1e] border border-[#1e1e1e] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* header */}

          <thead>
            <tr className="border border-gray-700 bg-[#1e1e1e]">
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Reference ID
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Issue Title
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Location
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Submitted
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Media
              </th>
              <th className="px-6 py-4 text-right text-xs text-slate-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          {/* body */}

          <tbody className="divide-y divide-[#374151]">
            {issues.map((issue) => (
              <tr key={issue?.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-blue-400 font-mono">
                  {issue?.reference_id}
                </td>

                <td className="px-6 py-4 max-w-[250px]">
                  <span className="truncate block">{issue.title}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {issue.location}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {issue?.submitted_display}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    {issue?.media_count} files
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button onClick={() => navigate(`/dashboard/execution/in-review/issues/${issue.id}/details`)} className="inline-flex items-center gap-1 text-blue-400">
                    View <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

              {!pagination?.isSinglePage && (
                <div className=" bottom-0 py-4 ">
                  <Pagination
                    currentPage={page}
                    totalPages={pagination?.totalPages}
                    isFirstPage={pagination?.isFirstPage}
                    isLastPage={pagination?.isLastPage}
                    onPageChange={goToPage}
                  />
                </div>
              )}
      </div>
    </div>
  );
}
