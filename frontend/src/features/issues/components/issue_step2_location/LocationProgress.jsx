import { motion } from "framer-motion";
import { fadeInUp } from "../../ui/motion";

const steps = [
  "Issue Details",
  "Mark Location",
  "Add Photos",
  "A Few Questions",
  "Review Issue",
];

const LocationProgress = () => (
  <motion.section variants={fadeInUp} className="mb-9 ">
    <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-blue-100/60 to-white border border-blue-200/60">
      <div className="grid grid-cols-5 gap-3">
        {steps.map((name, idx) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className={`h-1.5 w-full rounded-full ${
                idx === 1 || idx === 0 ? "bg-blue-600" : "bg-blue-200"
              }`}
            />
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                idx === 1 || idx === 0 ? "text-blue-700" : "text-blue-400"
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default LocationProgress;