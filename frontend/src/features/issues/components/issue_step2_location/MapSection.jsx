import { motion } from "framer-motion";
import { MapPin, Crosshair, Globe, Info } from "lucide-react";
import { fadeInUp } from "../../ui/motion";

const MapSection = () => (
  <motion.section
    variants={fadeInUp}
    className="lg:col-span-2 space-y-4"
  >
    <div className="relative h-[450px] bg-slate-200 rounded-[2.5rem] border overflow-hidden">
      <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
        <Globe className="w-32 h-32 text-blue-100" />
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <div className="bg-white/90 px-4 py-2 rounded-2xl border flex items-center gap-2">
          <Info size={14} className="text-blue-600" />
          <span className="text-xs font-bold">Click map to place pin</span>
        </div>
        <button className="bg-white p-3 rounded-2xl border">
          <Crosshair size={20} className="text-blue-600" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <MapPin size={40} className="text-blue-600 fill-blue-600/20" />
      </div>
    </div>
  </motion.section>
);

export default MapSection;