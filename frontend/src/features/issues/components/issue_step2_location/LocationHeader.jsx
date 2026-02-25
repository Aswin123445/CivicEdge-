import { motion } from "framer-motion";
import { fadeInUp } from "../../ui/motion";

const LocationHeader = () => (
  <motion.header variants={fadeInUp} className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900">Select Location</h1>
    <p className="text-slate-500 mt-2 text-lg">
      Mark the issue on the map and choose the relevant zone.
    </p>
    <p className="text-xs text-slate-400 mt-1">
      You can adjust this anytime before submitting.
    </p>
  </motion.header>
);

export default LocationHeader;