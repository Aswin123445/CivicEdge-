import { motion } from "framer-motion";
import issuehome from "../../../../assets/issue.webp";

const HeroIllustration = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    className="
      relative
      w-72 h-72
      sm:w-96 sm:h-96
      lg:w-[30rem] lg:h-[30rem]
      xl:w-[34rem] xl:h-[34rem]
      rounded-full
      overflow-hidden
      bg-gradient-to-br from-blue-50 via-slate-50 to-white
      flex items-center justify-center
    "
  >
    {/* Subtle outer ring */}
    <div className="absolute inset-0 rounded-full border border-blue-100/60" />

    {/* Hero Image */}
    <img
      src={issuehome}
      alt="People collaboratively repairing and caring for their city"
      className="w-full h-full object-cover scale-[1.08]"
      draggable={false}
    />

    {/* Soft overlay for UI blending */}
    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 via-transparent to-transparent" />
  </motion.div>
);

export default HeroIllustration;