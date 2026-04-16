import React from "react";
import useAdminPollDetails from "../hooks/admin/adminPollDetails";
import { useParams } from "react-router-dom";
import { BarChart3, Calendar, Clock, HelpCircle, Info } from "lucide-react";
import AdminDetailsOverviewSkeleton from "../components/adminn_detail_poll_page/AdminDetailsOverviewSkeleton";
const AdminDetailsOverview = () => {
  const { id } = useParams();
  const {
    adminPollDetail: poll,
    adminPollDetailLoading,
    adminPollDetailFetching,
  } = useAdminPollDetails(id);
  if (adminPollDetailLoading || adminPollDetailFetching) return <AdminDetailsOverviewSkeleton />;
  return (
    <div>
      <div className="col-span-12 lg:col-span-7 space-y-8">
        {/* Context Section */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-blue-400">
            <Info size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">
              Context & Background
            </h2>
          </div>
          <p className="text-slate-300 leading-relaxed">{poll?.context}</p>
        </section>

        {/* Results Section (CRITICAL) */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 text-emerald-400">
            <BarChart3 size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">
              Live Voting Results
            </h2>
          </div>
          <div className="space-y-6">
            {poll.results.map((res, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-100">{res.label}</span>
                  <span className="text-blue-400">
                    {Number(res?.percent).toFixed(2)}% ({res.value} votes)
                  </span>
                </div>
                <div className="w-full h-3 bg-[#1e1e1e] rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "bg-slate-700"}`}
                    style={{ width: `${res.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-12 lg:col-span-5 space-y-8">
        {/* Did You Know */}
        <section className="bg-[#1e1e1e] border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
            <HelpCircle size={14} /> Did You Know?
          </h3>
          <p className="text-sm text-slate-300 italic leading-relaxed">
            "{poll?.did_you_know}"
          </p>
        </section>

        {/* Image Section */}
        {poll.image_url && (
          <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-2 overflow-hidden">
            <img
              src={poll.image_url}
              alt="Context"
              className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </section>
        )}

        {/* Meta Stats */}
        <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
            Timestamps
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lgbg-[#1e1e1e] flex items-center justify-center">
                <Calendar size={14} className="text-blue-500" />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase">
                  Created
                </p>
                <p className="font-bold text-slate-200">Apr 10, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lgbg-[#1e1e1e] flex items-center justify-center">
                <Clock size={14} className="text-orange-500" />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase">
                  Deadline
                </p>
                <p className="font-bold text-slate-200">Apr 16, 2026</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDetailsOverview;
