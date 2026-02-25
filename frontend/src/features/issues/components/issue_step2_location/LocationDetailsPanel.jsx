import { motion } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";
import { fadeInUp } from "../../ui/motion";

const zones = [
  "Central Business District",
  "North Ward - Sector 4",
  "South Ward - Sector 2",
  "East Industrial Zone",
  "West Residential District",
];

const LocationDetailsPanel = ({
  coords,
  selectedZone,
  onZoneChange,
}) => (
  <motion.section variants={fadeInUp} className="space-y-6">
    <div className="bg-white rounded-2xl p-6 border">
      <label className="text-xs font-bold text-slate-400 uppercase">
        Selected Coordinates
      </label>
      <div className="flex gap-4 mt-3">
        <div className="flex-1 bg-slate-50 p-3 rounded-xl">
          <span className="text-xs text-slate-400">Latitude</span>
          <p className="font-mono">{coords.lat}</p>
        </div>
        <div className="flex-1 bg-slate-50 p-3 rounded-xl">
          <span className="text-xs text-slate-400">Longitude</span>
          <p className="font-mono">{coords.lng}</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-6 border">
      <label className="text-xs font-bold text-slate-400 uppercase">
        Zone / Ward
      </label>
      <div className="relative mt-3">
        <select
          value={selectedZone}
          onChange={(e) => onZoneChange(e.target.value)}
          className="w-full bg-slate-50 border rounded-2xl px-5 py-4"
        >
          <option value="" disabled>
            Select Zone
          </option>
          {zones.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>
        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
      </div>
      <p className="text-xs text-slate-400 mt-3 italic">
        Choose the administrative zone of the issue.
      </p>
    </div>

    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
      <Info size={16} className="text-blue-600" />
      <p className="text-xs text-blue-800">
        You can change this before final submission.
      </p>
    </div>
  </motion.section>
);

export default LocationDetailsPanel;