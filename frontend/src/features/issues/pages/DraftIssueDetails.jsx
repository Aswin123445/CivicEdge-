import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Circle,
  Trash2,
  ArrowRight,
  AlertTriangle,
  Construction
} from 'lucide-react';

// --- Constants & Variants ---
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: "easeOut" } 
  }
};

// --- Sub-Components ---

const StatusBadge = ({ time }) => (
  <span className="inline-flex items-center text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full w-fit">
    <Clock className="w-3 h-3 mr-1.5" />
    Saved {time}
  </span>
);

const ProgressStep = ({ name, status }) => (
  <div className="flex items-center gap-3">
    {status === 'complete' ? (
      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
    ) : (
      <Circle className="w-5 h-5 text-slate-600 shrink-0" />
    )}
    <span className={`text-sm font-medium ${status === 'complete' ? 'text-green-600' : 'text-slate-500'}`}>
      {name}
    </span>
  </div>
);

const PreviewCard = ({ icon, label, value, isDimmed = false, children }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <span className="font-bold text-slate-700 text-sm">{label}</span>
    </div>
    {children ? children : (
      <p className={`text-sm leading-relaxed ${isDimmed ? 'text-slate-300 italic' : 'text-slate-500'}`}>
        {value}
      </p>
    )}
  </div>
);

// --- Main Component ---

const DraftIssueDetails = ({ onBack, onContinue, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This would ideally come from a hook/props in a real app
  const draftData = {
    title: "Deep Pothole on Main St.",
    description: "There is a significant pothole near the intersection of Main and 4th. It's causing cars to swerve into the bike lane. About 2 feet wide.",
    category: "Roads & Infrastructure",
    location: "Downtown District, Ward 4",
    lastSaved: "2 hours ago",
    progress: [
      { name: "Basic Details", status: "complete" },
      { name: "Media Upload", status: "complete" },
      { name: "Location", status: "incomplete" },
      {name: "Behavioral Questions", status: "incomplete"},
      { name: "Review & Submit", status: "incomplete" },

    ],
    mediaCount: 2
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans antialiased">
      {/* Navigation */}
      <nav className="max-w-3xl mx-auto p-6">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors group font-medium"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Drafts
        </button>
      </nav>

      <motion.main 
        className="max-w-3xl mx-auto px-6"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* Header Section */}
        <motion.header variants={ITEM_VARIANTS} className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Draft Issue</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
            <p className="text-slate-500 text-lg">
              Review and continue editing your complaint.
            </p>
            <StatusBadge time={draftData.lastSaved} />
          </div>
        </motion.header>

        {/* Summary Section */}
        <motion.section variants={ITEM_VARIANTS} className="mb-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <Construction size={18} strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-widest">{draftData.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {draftData.title || "Untitled Issue"}
            </h2>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-4 py-1">
              "{draftData.description}"
            </p>
          </div>
        </motion.section>

{/* 🟦 CivicEdge Progress Tracker */}
<motion.section variants={ITEM_VARIANTS} className="mb-12">
  <div className="
    relative overflow-hidden
    rounded-[2.5rem] p-8
    bg-gradient-to-br from-blue-50 via-blue-100/60 to-white
    border border-blue-200/60
    shadow-lg shadow-blue-900/5
  ">
    
    {/* Subtle Civic Decorative Element */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -mr-16 -mt-16 blur-2xl" />

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
      <div>
        <h3 className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] mb-1">
          Submission Progress
        </h3>
        <p className="text-sm text-blue-700/80 font-medium">
          You’re more than halfway to submitting this issue.
        </p>
      </div>

      <div className="
        px-4 py-2
        bg-white/70 backdrop-blur-md
        rounded-2xl
        border border-blue-200/60
        text-xs font-bold text-blue-700
      ">
        Step 3 of 5
      </div>
    </div>

    {/* Progress Steps */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
      {draftData.progress.map((step, idx) => (
        <ProgressStep
          key={idx}
          name={step.name}
          status={step.status}
          variant="civic"   // 👈 important
        />
      ))}
    </div>
  </div>
</motion.section>

        {/* Details Grid */}
        <motion.section variants={ITEM_VARIANTS} className="space-y-6 mb-12">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-slate-900">Details Preview</h3>
            <span className="text-xs text-slate-400 font-medium">Read-only mode</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <PreviewCard 
              icon={<FileText />} 
              label="Issue Description" 
              value={draftData.description} 
            />
            
            <PreviewCard icon={<ImageIcon />} label="Uploaded Media">
              <div className="flex gap-3 mt-1">
                {[...Array(draftData.mediaCount)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300">
                    <ImageIcon size={20} />
                  </div>
                ))}
                <div className="w-16 h-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase text-center px-1">
                  Pending
                </div>
              </div>
            </PreviewCard>

            <PreviewCard 
              icon={<MapPin />} 
              label="Selected Location" 
              value={draftData.location || "Not yet specified"} 
              isDimmed={!draftData.location}
            />
          </div>
        </motion.section>

        {/* Actions Footer */}
        <motion.footer variants={ITEM_VARIANTS} className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-slate-400 hover:text-red-500 font-bold text-sm transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Draft
          </button>
          
          <button 
            onClick={onContinue}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 hover:shadow-blue-900/30 transition-all active:scale-[0.98] group"
          >
            Continue Editing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.footer>
      </motion.main>

      {/* Delete Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DeleteModal 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={() => {
              onDelete();
              setIsModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Separate Modal Component for better performance ---

const DeleteModal = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl"
    >
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">Delete draft?</h3>
      <p className="text-slate-500 mt-3 leading-relaxed">
        This action cannot be undone. You will lose all progress on this specific issue.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors"
        >
          Yes, Delete Permanently
        </button>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
        >
          Keep Draft
        </button>
      </div>
    </motion.div>
  </div>
);

export default DraftIssueDetails;