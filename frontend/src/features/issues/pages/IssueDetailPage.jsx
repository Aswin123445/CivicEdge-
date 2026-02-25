import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Clipboard, 
  Clock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Image as ImageIcon,
  HelpCircle,
  Calendar,
  User
} from 'lucide-react';

// --- Animation Variants ---
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

const IssueDetailPage = () => {
  // Mock Data for "Open / Waiting for Review" State
  const issue = {
    id: "CE-774291",
    status: "Open",
    reviewed: false,
    title: "Damaged Pavement on Oak Street",
    category: "Roads & Infrastructure",
    description: "The sidewalk is cracking and uneven, posing a significant trip hazard for elderly residents near the community center.",
    submittedAt: "Feb 23, 2026 • 09:45 AM",
    location: { zone: "Greenwood Ward", lat: "11.8745", lng: "75.3704" },
    images: ["/api/placeholder/400/320", "/api/placeholder/400/320"],
    reflection: { recurring: "No", impact: "Moderate" }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-slate-900">
      <motion.main 
        className="max-w-3xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Section 1: Page Header */}
        <motion.header variants={ITEM_VARIANTS} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Status: {issue.status}
              </span>
              <button className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-blue-600 transition-colors">
                {issue.id} <Clipboard size={12} />
              </button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{issue.title}</h1>
          </div>
          <p className="text-sm text-slate-400 italic">Submitted {issue.submittedAt}</p>
        </motion.header>

        {/* 🟦 Section 2: Status Explanation Card */}
        <motion.section variants={ITEM_VARIANTS} className="mb-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
              <Clock size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Waiting for Review</h2>
              <p className="text-slate-500 leading-relaxed">
                Your issue has been successfully submitted. It has not yet been reviewed by an administrator. 
                Once reviewed, you’ll see updates here.
              </p>
              <p className="text-xs text-slate-400 font-medium pt-2">
                Note: Review times may vary depending on issue volume.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline */}
          <motion.section variants={ITEM_VARIANTS} className="lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              Activity Log
            </h3>
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Point 1: Submitted */}
              <div className="relative">
                <div className="absolute -left-[1.95rem] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                <p className="text-sm font-bold text-slate-800">Issue Submitted</p>
                <p className="text-xs text-slate-400">{issue.submittedAt}</p>
              </div>
              {/* Point 2: Waiting */}
              <div className="relative">
                <div className="absolute -left-[1.95rem] top-1 w-3 h-3 rounded-full bg-slate-200 border-2 border-white" />
                <p className="text-sm font-bold text-slate-400">Waiting for Review</p>
                <p className="text-xs text-slate-400 italic">Expected soon</p>
              </div>
              {/* Point 3: Muted Future State */}
              <div className="relative opacity-30">
                <div className="absolute -left-[1.95rem] top-1 w-3 h-3 rounded-full bg-slate-200 border-2 border-white" />
                <p className="text-sm font-medium text-slate-400">Assignment & Action</p>
              </div>
            </div>
          </motion.section>

          {/* Right Column: Details Content */}
          <div className="lg:col-span-2 space-y-6">
            <DetailCard title="Issue Information" icon={<FileText size={18} />}>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</span>
                  <p className="text-sm font-bold text-slate-700">{issue.category}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</span>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">{issue.description}</p>
                </div>
              </div>
            </DetailCard>

            <DetailCard title="Evidence" icon={<ImageIcon size={18} />}>
              <div className="grid grid-cols-2 gap-3">
                {issue.images.map((img, i) => (
                  <div key={i} className="aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden grayscale-[30%] opacity-80">
                    <img src={img} alt="Submitted Evidence" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </DetailCard>

            <DetailCard title="Location" icon={<MapPin size={18} />}>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-700">{issue.location.zone}</p>
                <p className="text-xs font-mono text-slate-400">Lat: {issue.location.lat} | Lng: {issue.location.lng}</p>
              </div>
            </DetailCard>
          </div>
        </div>

        {/* 🟦 Section 5: What Happens Next */}
        <motion.section variants={ITEM_VARIANTS} className="mt-12 p-8 bg-slate-100 rounded-[2rem] border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <HelpCircle size={18} className="text-blue-600" />
            Next Steps
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">• Authorities will review the details to ensure they are actionable.</li>
            <li className="flex items-start gap-2">• You will be notified automatically if the status changes.</li>
            <li className="flex items-start gap-2">• Status updates and officer assignments will appear in the Activity Log.</li>
          </ul>
        </motion.section>

        {/* 🟦 Section 6: Action Bar */}
        <motion.footer variants={ITEM_VARIANTS} className="mt-12 flex items-center justify-between pt-8 border-t border-slate-200">
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to My Issues
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <User size={14} />
            Submitted by you
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

// Reusable Detail Card
const DetailCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-blue-600 bg-blue-50 p-2 rounded-xl">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 text-sm tracking-tight">{title}</h3>
    </div>
    {children}
  </div>
);

export default IssueDetailPage;