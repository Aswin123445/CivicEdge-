import {
  MapPin,
  Clock,
  FileText,
  ChevronRight,
  Hash,
  ClipboardList,
  FileBadge,
  CalendarCheck,
} from "lucide-react";
import Pagination from "../../../../components/common/PaginationBar";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/datenormalize";

export default function ReportTable({ tasks, pagination }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1e1e1e] border border-[#1e1e1e] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* header */}

          <thead>
            <tr className="border border-gray-700 bg-[#1e1e1e]">
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Task ID
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                task Title
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                task ID
              </th>
              <th className="px-6 py-4 text-xs text-slate-500 uppercase">
                Submitted
              </th>
              <th className="px-6 py-4 text-right text-xs text-slate-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          {/* body */}

          <tbody className="divide-y divide-[#374151]">
            {tasks.map((task) => (
              <tr key={task?.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-blue-400 font-mono">
                    <div className="flex items-center gap-1">
                  <Hash size={16} />
                  {task?.reference_id}
                    </div>

                </td>

                <td className="px-6 py-4 max-w-[250px]">
                  <div className="flex items-center gap-1">
                                        <ClipboardList size={16} />

                  <span className="truncate block">{task?.issue_title}</span>

                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <FileBadge size={16} />
                    {task?.issue_reference_id}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDate(task?.submitted_at)}
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/execution/verification-report/${task?.id}`,
                      )
                    }
                    className="inline-flex items-center gap-1 text-blue-400"
                  >
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
