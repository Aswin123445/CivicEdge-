import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Send,
  Edit3,
  MapPin,
  FileText,
  Image as ImageIcon,
  BrainCircuit,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ---------------- Animation Variants ---------------- */

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

/* ---------------- Page ---------------- */

const IssueReviewSubmitPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock consolidated draft data
  const issueDraft = {
    title: 'Damaged Pavement on Oak Street',
    category: 'Roads & Infrastructure',
    description:
      'The sidewalk is cracking and uneven, posing a significant trip hazard for elderly residents near the community center.',
    images: ['/api/placeholder/400/320', '/api/placeholder/400/320'],
    location: {
      lat: 11.8745,
      lng: 75.3704,
      zone: 'Greenwood Ward – Sector 4'
    },
    reflection: {
      recurring: 'Yes',
      impact: 'Moderate impact'
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/successfull/2')
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans antialiased text-slate-900">
      <motion.main
        className="max-w-2xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Header */}
        <motion.header variants={ITEM_VARIANTS} className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Review & Submit
          </h1>
          <p className="text-slate-500 mt-3 text-lg leading-relaxed">
            Please review all the details below before submitting.
            Once submitted, this issue will be sent to the concerned authorities.
          </p>
        </motion.header>

        {/* 🟦 Progress Indicator */}
        <motion.section variants={ITEM_VARIANTS} className="mb-12">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-blue-100/60 to-white border border-blue-200/60 shadow-lg shadow-blue-900/5">
            <div className="grid grid-cols-5 gap-3">
              {[
                'Issue Details',
                'Add Photos',
                'Mark Location',
                'A Few Questions',
                'Review Issue'
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-1.5 w-full rounded-full ${
                      idx <= 4 ? 'bg-blue-600' : 'bg-blue-200'
                    }`}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 text-center">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 🟦 Review Cards */}
        <div className="space-y-6 mb-12">

          {/* 1️⃣ Issue Details */}
          <ReviewCard
            title="Issue Details"
            icon={<FileText size={18} />}
            editLink="/complaints/new"
          >
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Title
                </span>
                <p className="text-base font-bold text-slate-800">
                  {issueDraft.title}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Category
                </span>
                <p className="text-sm font-medium text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded-md mt-1">
                  {issueDraft.category}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Description
                </span>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  {issueDraft.description}
                </p>
              </div>
            </div>
          </ReviewCard>

          {/* 2️⃣ Location */}
          <ReviewCard
            title="Location"
            icon={<MapPin size={18} />}
            editLink="/complaints/id/location"
          >
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">
                  {issueDraft.location.zone}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Lat: {issueDraft.location.lat}, Lng: {issueDraft.location.lng}
                </p>
              </div>
            </div>
          </ReviewCard>

          {/* 3️⃣ Evidence */}
          <ReviewCard
            title="Evidence"
            icon={<ImageIcon size={18} />}
            editLink="/complaints/id/media"
          >
            <div className="grid grid-cols-3 gap-3">
              {issueDraft.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-slate-100 border border-slate-200 overflow-hidden"
                >
                  <img
                    src={img}
                    alt="Evidence"
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </div>
              ))}
            </div>
          </ReviewCard>

          {/* 4️⃣ Reflection */}
          <ReviewCard
            title="Reflection Summary"
            icon={<BrainCircuit size={18} />}
            editLink="/complaints/id/behavior"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Repeated issue noticed
                </span>
                <p className="text-sm font-semibold text-slate-700">
                  {issueDraft.reflection.recurring}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Perceived impact
                </span>
                <p className="text-sm font-semibold text-slate-700">
                  {issueDraft.reflection.impact}
                </p>
              </div>
            </div>
          </ReviewCard>
        </div>

        {/* 🟦 Submission Notice */}
        <motion.section variants={ITEM_VARIANTS} className="mb-12">
          <div className="bg-blue-50/60 rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
            <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">
                Final confirmation
              </p>
              <p className="text-xs text-blue-700/80 leading-relaxed mt-1">
                By submitting this issue, you confirm that the information
                provided is accurate to the best of your knowledge.
                This issue cannot be edited after submission.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 🟦 Actions */}
        <motion.footer
          variants={ITEM_VARIANTS}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200"
        >
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors group">
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Questions
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-16 py-4 rounded-2xl font-semibold shadow-lg transition-all flex items-center justify-center gap-3
              ${
                isSubmitting
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white shadow-blue-900/20 hover:bg-blue-700 active:scale-[0.98]'
              }`}
          >
            {isSubmitting ? 'Submitting…' : 'Submit Issue'}
            {!isSubmitting && <Send size={18} />}
          </button>
        </motion.footer>
      </motion.main>
    </div>
  );
};

/* ---------------- Reusable Review Card ---------------- */

const ReviewCard = ({ title, icon, children }) => (
  <motion.div
    variants={ITEM_VARIANTS}
    className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="text-blue-600 bg-blue-50 p-2 rounded-xl">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default IssueReviewSubmitPage;