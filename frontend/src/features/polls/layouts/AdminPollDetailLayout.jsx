import { ChevronLeft, Clock, Share2, Users, AlertCircle } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useAdminPollDetails from "../hooks/admin/adminPollDetails";
import { getStatusColor } from "../utils";
import { useParams } from "react-router-dom";
import AdminDetailsHeaderSkeleton from "../components/adminn_detail_poll_page/AdminDetailsHeaderSkeleton";
const AdminPollDetailLayout = () => {

  const { id } = useParams();
  const {
    adminPollDetail: poll,
    adminPollDetailLoading,
    adminPollDetailFetching,
    handleClosePoll,
    closePollLoading,
    isModalOpen,
    setIsModalOpen,
    navigate
  } = useAdminPollDetails(id);
  if (adminPollDetailLoading || adminPollDetailFetching) return <AdminDetailsHeaderSkeleton />;
  return (
    <div className="bg-[#1e1e1e] text-slate-100 font-sans selection:bg-blue-500/30 pb-20">
      {/* 6.1 Header Section */}
      <header className="border-b border-slate-800 bg-[#1e1e1e] backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button onClick={() => navigate('/admin/polls')} className="flex items-center gap-2 text-slate-500 hover:text-slate-100 text-sm font-bold mb-4 transition-colors">
            <ChevronLeft size={16} /> Back to Management
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(poll.status)}`}
                >
                  {poll.status}
                </span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {poll.reference_id}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black leading-tight line-clamp-2 md:line-clamp-3">
                {poll?.question || "Loading..."}
              </h1>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-blue-500" />{" "}
                  {poll.total_votes} Total Votes
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-orange-500" /> Closes Apr 16,
                  2026
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {poll.status === "active" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-900/20"
                >
                  Close Poll
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              isActive
                ? "pb-4 text-sm font-black uppercase tracking-widest transition-all relative text-blue-500 border-b-[3px] border-blue-500"
                : "pb-4 text-sm font-black uppercase tracking-widest transition-all relative text-slate-500 hover:text-slate-300"
            }
          >
            Overview
          </NavLink>

          <NavLink
            to="analysis"
            className={({ isActive }) =>
              isActive
                ? "pb-4 text-sm font-black uppercase tracking-widest transition-all relative text-blue-500 border-b-[3px] border-blue-500"
                : "pb-4 text-sm font-black uppercase tracking-widest transition-all relative text-slate-500 hover:text-slate-300"
            }
          >
            Analysis
          </NavLink>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                End this participation?
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Are you sure you want to close this poll? This will stop
                citizens from voting immediately.
              </p>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClosePoll}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-900/20"
                >
                  {closePollLoading ? "Closing..." : "Confirm Close"}
                </button>
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPollDetailLayout;
