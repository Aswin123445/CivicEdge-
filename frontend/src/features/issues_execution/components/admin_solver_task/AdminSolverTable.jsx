import { MapPin, Clock, FileText, ChevronRight } from "lucide-react";
import Pagination from "../../../../components/common/PaginationBar";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/datenormalize";

export default function AdminSolverTable({ tasks ,pagination}) {

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
                Status
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Updated At
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Solver 
              </th>
              <th className="px-6 py-4 text-right text-xs text-slate-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          {/* body */}

          <tbody className="divide-y divide-[#374151]">
            {tasks?.map((task) => (
              <tr key={task?.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-blue-400 font-mono">
                  {task?.reference_id}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {task.status}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDate(task?.updated_at)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    {task?.solver_email} 
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button onClick={() => navigate(`/admin/execution/solver-tasks/${task?.id}`)} className="inline-flex items-center gap-1 text-blue-400">
                    View <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

              {!pagination?.isSinglePage && (
                <div className="sticky bottom-0 py-4 ">
                  <Pagination
                    currentPage={pagination?.page}
                    totalPages={pagination?.totalPages}
                    isFirstPage={pagination?.isFirstPage}
                    isLastPage={pagination?.isLastPage}
                    onPageChange={pagination?.goToPage}
                  />
                </div>
              )}
      </div>
    </div>
  );
}
