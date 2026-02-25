import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  History,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ---------------- Animation Variants ---------------- */

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

/* ---------------- Component ---------------- */

const IssueCreateBehaviorStep = () => {
    const navigate = useNavigate();
  const [responses, setResponses] = useState({
    recurring: null,
    impact: null
  });

  const impactOptions = [
    {
      id: 'low',
      label: 'Low impact',
      sub: 'Minor inconvenience, manageable'
    },
    {
      id: 'medium',
      label: 'Moderate impact',
      sub: 'Affects daily routine'
    },
    {
      id: 'high',
      label: 'High impact',
      sub: 'Safety risk or serious disruption'
    }
  ];

  /* 🔐 Requirement: both questions must be answered */
  const canContinue =
    responses.recurring !== null && responses.impact !== null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-slate-900">
      <motion.main
        className="max-w-2xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Section 1 — Header */}
        <motion.header variants={ITEM_VARIANTS} className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            A Moment to Reflect
          </h1>

          <p className="text-slate-500 mt-3 text-lg leading-relaxed">
            These questions are not about approval or rejection.
            They help you pause and think about the situation and its
            impact before submitting.
          </p>

          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-blue-700 bg-blue-50 w-fit px-3 py-1.5 rounded-full">
            <HelpCircle size={14} />
            Reflection step
          </div>
        </motion.header>

        {/* 🟦 Section 2 — Progress Indicator */}
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
                      idx <= 3 ? 'bg-blue-600' : 'bg-blue-200'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider text-center ${
                      idx === 3 ? 'text-blue-700' : 'text-blue-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 🟦 Section 3 — Reflection Questions */}
        <div className="space-y-14">
          {/* Question 1 */}
          <motion.section variants={ITEM_VARIANTS} className="space-y-4">
            <div className="flex items-start gap-3 ml-1">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
                <History size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">
                  Have you noticed this issue happening repeatedly in this area?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Repeated issues often need long-term attention.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Yes', 'No'].map(option => (
                <button
                  key={option}
                  onClick={() =>
                    setResponses({ ...responses, recurring: option })
                  }
                  className={`py-5 rounded-[1.5rem] border text-sm font-medium transition-shadow
                    ${
                      responses.recurring === option
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:shadow-sm'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Question 2 */}
          <motion.section variants={ITEM_VARIANTS} className="space-y-4">
            <div className="flex items-start gap-3 ml-1">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">
                  How serious is the impact of this issue right now?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Consider safety, inconvenience, and who might be affected.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {impactOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() =>
                    setResponses({ ...responses, impact: option.id })
                  }
                  className={`w-full p-5 rounded-[1.5rem] border transition-shadow text-left
                    ${
                      responses.impact === option.id
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:shadow-sm'
                    }`}
                >
                  <p
                    className={`font-semibold text-sm ${
                      responses.impact === option.id
                        ? 'text-blue-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {option.sub}
                  </p>
                </button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* 🟦 Section 4 — Guidance */}
        <motion.div
          variants={ITEM_VARIANTS}
          className="mt-14 p-6 bg-slate-100/60 rounded-3xl border border-slate-200 border-dashed"
        >
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            There’s no right or wrong answer here.
            Answering both questions helps create more responsible
            and meaningful civic reports.
          </p>
        </motion.div>

        {/* 🟦 Helper text when disabled */}
        {!canContinue && (
          <p className="text-xs text-slate-400 text-center mt-4">
            Please answer both questions to continue.
          </p>
        )}

        {/* 🟦 Section 5 — Actions */}
        <motion.footer
          variants={ITEM_VARIANTS}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200"
        >
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors group">
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button>

          <button
            onClick={() => navigate('/issue/2/submit') }
            disabled={!canContinue}
            className={`
              w-full sm:w-auto px-12 py-4 rounded-2xl font-semibold
              flex items-center justify-center gap-2 transition-all
              ${
                canContinue
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 active:scale-[0.98]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            Review my issue
            <ChevronRight size={18} />
          </button>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default IssueCreateBehaviorStep;