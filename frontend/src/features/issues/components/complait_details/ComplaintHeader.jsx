import { ChevronLeft, Clock } from "lucide-react";
import { formatDate } from "../../../../utils/datenormalize";
import { STATUS_STYLES } from "../../utils";
import {useNavigate} from "react-router-dom"; 
export default function ComplaintHeader({ issue }) {
  const navigate = useNavigate();
  const date = formatDate(issue?.issue.updated_at);
  const complaint = issue?.issue;
  return (
    <header className="bg-white border-b border-slate-200 pt-12 pb-8 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/complaints/list')} className="flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to My Complaints
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              {complaint?.category.label}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-slate-500 text-sm">
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                REF: {complaint?.reference_id}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Updated {date}
              </div>
            </div>
          </div>

          <span
            className={`px-6 py-2 rounded-full bg-blue-50 border text-center border-blue-100 text-blue-700 font-bold text-sm uppercase tracking-widest ${STATUS_STYLES[complaint?.status.code]}`}
          >
            {complaint?.status.label}
          </span>
        </div>
      </div>
    </header>
  );
}
