import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ExternalLink, 
  List, 
  ArrowRight, 
  Clipboard, 
  Clock, 
  ShieldCheck, 
  Bell 
} from 'lucide-react';
import useBehavioralService from '../hooks/behaviouralService';
import ReviewIssueCombinedSkeleton from '../ui/skeltons/ReviewIssueCombinedSkeleton';
import { useNavigate, useParams } from 'react-router-dom';

// --- Animation Variants (CivicEdge Standard) ---
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

const IssueSubmitSuccessPage = ({ issueId = "CE-774291", issueTitle = "Damaged Pavement on Oak Street" }) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { reviewData,isLoadingReview } = useBehavioralService();
  
  const handleCopyId = () => {
    navigator.clipboard.writeText(issueId);
  };
  const issue = reviewData?.issue;
  if (isLoadingReview) return (<ReviewIssueCombinedSkeleton/>);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900">
      <motion.main 
        className="max-w-xl w-full"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Section 1: Success Indicator */}
        <motion.div variants={ITEM_VARIANTS} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-[2rem] text-blue-600 mb-6 border border-blue-100">
            <CheckCircle2 size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Issue Submitted Successfully</h1>
          <p className="text-slate-500 mt-3 text-lg">
            Your issue has been recorded and sent to the concerned authorities.
          </p>
        </motion.div>

        {/* 🟦 Section 2: Issue Summary (Lightweight) */}
        <motion.section variants={ITEM_VARIANTS} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm mb-8">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-1">Issue Title</span>
              <p className="text-base font-bold text-slate-800">{issue?.title}</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-50">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-1">Issue ID</span>
                <button 
                  onClick={handleCopyId}
                  className="flex items-center gap-2 text-sm font-mono text-slate-600 hover:text-blue-600 transition-colors group"
                >
                  {issue?.reference_id}
                  <Clipboard size={14} className="text-slate-300 group-hover:text-blue-400" />
                </button>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-1 text-right">Current Status</span>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  Submitted
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 🟦 Section 3: What Happens Next */}
        <motion.section variants={ITEM_VARIANTS} className="mb-10 px-2">
          <h3 className="text-sm font-bold text-slate-800 mb-6">What happens next?</h3>
          <div className="space-y-5">
            {[
              { icon: <ShieldCheck size={18} />, text: "Authorities will review the validity of your report." },
              { icon: <Clock size={18} />, text: "You can track real-time status updates on the issue page." },
              { icon: <Bell size={18} />, text: "You will receive a notification once an officer is assigned." }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 text-sm text-slate-600">
                <div className="text-blue-600 mt-0.5">{step.icon}</div>
                <p className="leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 🟦 Section 4: Primary Actions */}
        <motion.footer variants={ITEM_VARIANTS} className="flex flex-col sm:flex-row gap-4 mb-12">
          <button onClick={() => navigate(`/complaints/${id}`)} className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
            View Issue Details
            <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          
          <button onClick={() => navigate('/complaints')} className="flex-1 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
            <List size={18} className="text-slate-400" />
            Issue Home
          </button>
        </motion.footer>

        {/* 🟦 Section 5: Gentle Closing Message */}
        <motion.div variants={ITEM_VARIANTS} className="text-center pt-6 border-t border-slate-100">
          <p className="text-slate-400 text-sm leading-relaxed">
            Thank you for taking the time to report this issue.<br />
            <span className="font-medium text-slate-500">Your participation helps improve the community.</span>
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default IssueSubmitSuccessPage;