import React, { useMemo } from "react";
import {
  Users,
  Trophy,
  TrendingUp,
  Calendar,
  Activity,
  BarChart2,
} from "lucide-react";
import useAdminPollAnalysis from "../hooks/admin/adminPollAnalysis";
import { useParams } from "react-router-dom";
import VoteGrowthSkeleton from "../components/adminn_detail_poll_page/VoteGrowthSkeleton";
import VotingDistributionSkeleton from "../components/adminn_detail_poll_page/VotingDistributionSkeleton";

const AdminAnalysisTabPage = ({
  isLoading,
}) => {
  const { id } = useParams();
  const {
    adminPollDistribution,
    adminPollsTimeLine,
    isDistributionLoading,
    istimeLineLoading,
  } = useAdminPollAnalysis(id);
  // --- Null Safety & Defaults ---
  const distribution = adminPollDistribution?.distribution || [];
  const timeline = adminPollsTimeLine?.timeline || [];
  const totalVotes = adminPollDistribution?.total_votes || 0;

  // --- Logic: Derived Analytics ---
  const leadingOption = useMemo(() => {
    if (distribution.length === 0) return null;
    return [...distribution].sort((a, b) => b.percent - a.percent)[0];
  }, [distribution]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 5. Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          label="Total Votes"
          value={totalVotes.toLocaleString()}
          icon={<Users className="text-blue-500" size={20} />}
        />
        <SummaryCard
          label="Leading Option"
          value={leadingOption?.label || "N/A"}
          icon={<Trophy className="text-amber-500" size={20} />}
        />
        <SummaryCard
          label="Leading Percentage"
          value={leadingOption ? `${leadingOption.percent.toFixed(2)}%` : "0%"}
          icon={<TrendingUp className="text-emerald-500" size={20} />}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 6. Distribution Section (LEFT/MAIN) */}
        <div className="lg:col-span-8">
          <DistributionSection
            distribution={distribution}
            leadingId={leadingOption?.option_id}
            isDistributionLoading={isDistributionLoading}

          />
        </div>

        {/* 7. Timeline Section (RIGHT/SIDEBAR) */}
        <div className="lg:col-span-4">
          <TimelineSection timeline={timeline} isTimelineLoading={istimeLineLoading}/>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

/**
 * COMPONENT: SummaryCard
 */
const SummaryCard = ({ label, value, icon }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-slate-600 transition-colors">
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-100">{value}</p>
    </div>
    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </div>
);

/**
 * COMPONENT: DistributionSection
 * Move to: components/admin/analysis/DistributionSection.jsx
 */
const DistributionSection = ({ distribution, leadingId,isDistributionLoading }) => {
  const sortedData = [...distribution].sort((a, b) => b.percent - a.percent);
  if (isDistributionLoading) return <VotingDistributionSkeleton/>
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-8 text-blue-500">
        <BarChart2 size={18} />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-100">
          Voting Distribution
        </h3>
      </div>

      {sortedData.length > 0 ? (
        <div className="space-y-8">
          {sortedData.map((item) => (
            <div key={item.option_id} className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-100">
                    {item.label}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    {item.value} Votes
                  </p>
                </div>
                <p
                  className={`text-sm font-black ${item.option_id === leadingId ? "text-blue-500" : "text-slate-400"}`}
                >
                  {item.percent.toFixed(2)}%
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    item.option_id === leadingId
                      ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "bg-slate-500"
                  }`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">
            No votes recorded yet
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * COMPONENT: TimelineSection
 * Move to: components/admin/analysis/TimelineSection.jsx
 */
const TimelineSection = ({ timeline, isTimelineLoading }) => {
  const formatDate = (isoStr) => {
    return new Date(isoStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };
  if(isTimelineLoading) return <VoteGrowthSkeleton/>
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-8 text-blue-500">
        <Activity size={18} />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-100">
          Vote Growth
        </h3>
      </div>

      {timeline.length > 0 ? (
        <div className="space-y-4">
          {timeline.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-[#1e1e1e] border border-slate-800 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e1e] flex items-center justify-center text-blue-500">
                  <Calendar size={14} />
                </div>
                <span className="text-xs font-bold text-slate-300">
                  {formatDate(entry.time)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-100">
                  {entry.votes}
                </span>
                <span className="text-[10px] font-black uppercase text-slate-500">
                  Votes
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">No activity yet</p>
        </div>
      )}
    </div>
  );
};


export default AdminAnalysisTabPage;
