import { motion } from "framer-motion";
import { MapPin,  Info } from "lucide-react";
import { fadeInUp } from "../../ui/motion";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ClickHandler } from "../../utils";
import RecenterMap from "./Map";

const MapSection = ({setCoords, coords, height = "h-[450px]",zoom = 13}) => {
  return (
    <motion.section
      variants={fadeInUp}
      className="lg:col-span-2 space-y-4"
    >
      <div className={`
        relative
        ${height}
        bg-slate-200
        rounded-[2.5rem]
        border
        overflow-hidden
      `}>
        {/* 🗺️ Map layer */}
        <div className="absolute inset-0 z-10">
          <MapContainer
            center={[	coords.lat, coords.lng]} // Kannur
            zoom={zoom}
            className="w-full h-full"
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap lat={coords.lat} lng={coords.lng} />
            <ClickHandler onSelect={setCoords} />
          </MapContainer>
        </div>

        {/* 🧭 Center pin (visual only) */}
        <div className="
          absolute inset-0
          flex items-center justify-center
          pointer-events-none
          z-20
        ">
          <MapPin
            size={40}
            className="text-blue-600 fill-blue-600/20"
          />
        </div>

        {/* ℹ️ Top overlay UI */}
        <div className="
          absolute top-4 left-4 right-4
          flex justify-between
          z-30
          pointer-events-none
        ">
          <div className="
            bg-white/90 px-4 py-2
            rounded-2xl border
            flex items-center gap-2
            pointer-events-auto
          ">
            <Info size={14} className="text-blue-600" />
            <span className="text-xs font-bold">
              Click map to place pin
            </span>
          </div>
        </div>


      </div>
    </motion.section>
  );
};

export default MapSection;