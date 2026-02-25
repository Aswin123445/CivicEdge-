import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Inbox, 
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Construction
} from 'lucide-react';

// --- Animation Variants ---
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

const IssueListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock Data
  const issues = [
    {
      id: "CE-774291",
      title: "Damaged Pavement on Oak Street",
      category: "Roads & Infrastructure",
      description: "The sidewalk is cracking and uneven, posing a significant trip hazard for elderly residents.",
      date: "Oct 24, 2023",
      status: "In Progress",
      zone: "Greenwood Ward"
    },
    {
      id: "CE-774285",
      title: "Broken Streetlight",
      category: "Public Safety",
      description: "The light at the corner of 5th and Main has been out for three days.",
      date: "Oct 20, 2023",
      status: "Submitted",
      zone: "Central District"
    },
    {
      id: "CE-774102",
      title: "Water Leakage on Park Avenue",
      category: "Water Supply",
      description: "Significant water flowing from a burst pipe near the park entrance.",
      date: "Oct 12, 2023",
      status: "Resolved",
      zone: "Greenwood Ward"
    }
  ];

  const statusStyles = {
    "Submitted": "bg-blue-50 text-blue-700 border-blue-100",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
    "Resolved": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Closed": "bg-slate-50 text-slate-500 border-slate-100"
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-slate-900">
      <motion.main 
        className="max-w-4xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Section 1: Page Header */}
        <motion.header variants={ITEM_VARIANTS} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Issues</h1>
            <p className="text-slate-500 mt-2">Track the status of issues you’ve reported.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-700 transition-all active:scale-[0.98]">
            <Plus size={18} />
            Report New Issue
          </button>
        </motion.header>

        {/* 🟦 Section 2: Filter Bar */}
        <motion.section variants={ITEM_VARIANTS} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {["All", "Submitted", "In Progress", "Resolved"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border
                  ${activeFilter === filter 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/10' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.section>

        {/* 🟦 Section 3: Issue List */}
        <motion.section variants={ITEM_VARIANTS} className="space-y-4">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <div 
                key={issue.id}
                className="group relative bg-white border border-slate-200 rounded-[1.8rem] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-wider ${statusStyles[issue.status]}`}>
                        {issue.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.id}</span>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {issue.title}
                      </h2>
                      <p className="text-sm text-slate-500 line-clamp-1 mt-1 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Construction size={14} className="text-slate-300" />
                        {issue.category}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={14} className="text-slate-300" />
                        {issue.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Zone</p>
                      <p className="text-xs font-bold text-slate-500">{issue.zone}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* 🟦 Section 4: Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <Inbox size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No issues reported yet</h3>
              <p className="text-slate-500 mt-2 text-center max-w-xs leading-relaxed">
                When you report issues in your community, they will appear here for you to track.
              </p>
              <button className="mt-8 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-700 transition-all">
                Report Your First Issue
              </button>
            </div>
          )}
        </motion.section>

        {/* 🟦 Section 5: Pagination (Subtle) */}
        {issues.length > 0 && (
          <motion.footer variants={ITEM_VARIANTS} className="mt-12 flex items-center justify-center gap-4">
            <button disabled className="px-5 py-2 text-sm font-bold text-slate-300 cursor-not-allowed">Previous</button>
            <div className="flex items-center gap-1">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg text-sm font-bold">1</span>
            </div>
            <button className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Next</button>
          </motion.footer>
        )}
      </motion.main>
    </div>
  );
};

export default IssueListPage;