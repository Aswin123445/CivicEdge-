import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart3,
  Clock,
  Calendar,
  Info,
  AlertCircle,
  TrendingUp,
  Users,
  ChevronLeft,
  X,
  CheckCircle2,
  Share2,
  History,
  Activity,
  ArrowRight,
} from "lucide-react";
import useAdminPollDetails from "../hooks/admin/adminPollDetails";
import { getStatusColor } from "../utils";

/**
 * CivicEdge: Admin Poll Detail Page
 * A decision intelligence dashboard for managing and analyzing specific polls.
 */

const AdminPollDetailPage = () => {
  const { id } = useParams(); // Get poll ID from URL
  const { adminPollDetail, adminPollDetailLoading, adminPollDetailFetching } =
    useAdminPollDetails(id);
  // --- States ---
  const [activeTab, setActiveTab] = useState("overview"); // overview | analysis
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // --- Mock Primary Data (Detail API) ---
  const [poll, setPoll] = useState({
    id: "uuid-123",
    reference_id: "POL-0001",
    question:
      "Do you think traffic signals are required at the school junction?",
    context:
      "High traffic congestion reported near the school junction during peak hours. This poll aims to gather citizen sentiment before technical implementation.",
    did_you_know:
      "Implementing modern traffic signals can reduce minor intersection accidents by up to 30%.",
    image_url:
      "https://images.unsplash.com/photo-1545147429-6093af363d72?auto=format&fit=crop&q=80&w=800",
    expires_at: "2026-04-16T03:00:00",
    created_at: "2026-04-10T10:00:00",
    status: "active",
    results: [
      { label: "Yes, definitely", percent: 70, value: 140 },
      { label: "No, not needed", percent: 30, value: 60 },
    ],
    total_votes: 200,
  });

  // --- Mock Analysis Data ---
  const [analysisData, setAnalysisData] = useState({
    distribution: [
      { label: "Youth (18-25)", percent: 45, value: 90 },
      { label: "Adults (26-50)", percent: 40, value: 80 },
      { label: "Seniors (50+)", percent: 15, value: 30 },
    ],
    timeline: [
      { event: "Poll Created", time: "Apr 10, 10:00 AM" },
      { event: "Reached 100 Votes", time: "Apr 11, 02:30 PM" },
      { event: "Peak Participation", time: "Apr 12, 09:00 AM" },
    ],
  });

  // --- Logic: Lazy Load Analysis ---
  useEffect(() => {
    if (activeTab === "analysis" && !loadingAnalysis) {
      setLoadingAnalysis(true);
      // Simulate GET /distribution/ and /timeline/
      setTimeout(() => {
        setLoadingAnalysis(false);
      }, 800);
    }
  }, [activeTab]);

  // --- UI Helpers ---

  return (
    <div className="grid grid-cols-12 gap-8">
      {activeTab === "overview" ? (
        <OverviewTab poll={poll} />
      ) : (
        <AnalysisTab data={analysisData} loading={loadingAnalysis} />
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

/**
 * COMPONENT: OverviewTab
 */
const OverviewTab = ({ poll }) => (
  <>
    <div className="col-span-12 lg:col-span-7 space-y-8">
      {/* Context Section */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Info size={18} />
          <h2 className="text-xs font-black uppercase tracking-widest">
            Context & Background
          </h2>
        </div>
        <p className="text-slate-300 leading-relaxed">{poll?.context}</p>
      </section>

      {/* Results Section (CRITICAL) */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
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
                  {res.percent}% ({res.value} votes)
                </span>
              </div>
              <div className="w-full h-3bg-[#1e1e1e] rounded-full overflow-hidden border border-slate-800">
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
      <section className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
          <HelpCircle size={14} /> Did You Know?
        </h3>
        <p className="text-sm text-slate-300 italic leading-relaxed">
          "{poll?.did_you_know}"
        </p>
      </section>

      {/* Image Section */}
      {poll.image_url && (
        <section className="bg-slate-900 border border-slate-700 rounded-2xl p-2 overflow-hidden">
          <img
            src={poll.image_url}
            alt="Context"
            className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
          />
        </section>
      )}

      {/* Meta Stats */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
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
  </>
);

/**
 * COMPONENT: AnalysisTab
 */
const AnalysisTab = ({ data, loading }) => {
  if (loading)
    return (
      <div className="col-span-12 py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          Processing Analytics...
        </p>
      </div>
    );

  return (
    <>
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          label="Participation rate"
          value="+12%"
          sub="Since last 24h"
          icon={<TrendingUp size={20} className="text-emerald-400" />}
        />
        <SummaryCard
          label="Engaged Groups"
          value="3 Major"
          sub="Demographic reach"
          icon={<Activity size={20} className="text-blue-400" />}
        />
        <SummaryCard
          label="Leading Choice"
          value="Yes"
          sub="70% Majority"
          icon={<CheckCircle2 size={20} className="text-emerald-400" />}
        />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
            Demographic Distribution
          </h2>
          <div className="space-y-6">
            {data.distribution.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 w-24">
                  {item.label}
                </span>
                <div className="flex-1 h-2bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-700 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-xs font-black text-slate-200 w-12 text-right">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <section className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <History size={16} /> Poll Activity
          </h2>
          <div className="space-y-6">
            {data.timeline.map((event, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== data.timeline.length - 1 && (
                  <div className="absolute left-2 top-6 w-0.5 h-6 bg-slate-800" />
                )}
                <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-900/20 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-100">
                    {event.event}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

const SummaryCard = ({ label, value, sub, icon }) => (
  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/50 transition-all border-l-4 border-l-blue-600">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        {label}
      </span>
      {icon}
    </div>
    <div className="text-2xl font-black text-slate-100 mb-1">{value}</div>
    <div className="text-[10px] font-bold text-slate-500 uppercase">{sub}</div>
  </div>
);

const HelpCircle = ({ size, className }) => (
  <Info size={size} className={className} />
);

export default AdminPollDetailPage;
