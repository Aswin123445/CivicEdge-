import { motion } from 'framer-motion';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const steps = [
  'Issue Details',
  'Mark Location',
  'Add Photos',
  'A Few Questions',
  'Review Issue'
];

const IssueProgress = ({ activeStep = 0 }) => (
  <motion.section variants={ITEM_VARIANTS} className="mb-12">
    <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-blue-100/60 to-white border border-blue-200/60">
      <div className="grid grid-cols-5 gap-3">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div
              className={`h-1.5 w-full rounded-full ${
                idx <= activeStep ? 'bg-blue-600' : 'bg-blue-200'
              }`}
            />
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider text-center ${
                idx === activeStep ? 'text-blue-700' : 'text-blue-400'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default IssueProgress;