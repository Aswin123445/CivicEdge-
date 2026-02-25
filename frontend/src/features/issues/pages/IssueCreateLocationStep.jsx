import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fadeInUp,containerVariants } from "../ui/motion";
import LocationHeader from "../components/issue_step2_location/LocationHeader";
import LocationProgress from "../components/issue_step2_location/LocationProgress";
import MapSection from "../components/issue_step2_location/MapSection";
import LocationDetailsPanel from "../components/issue_step2_location/LocationDetailsPanel";
import LocationFooter from "../components/issue_step2_location/LocationFooter";




const IssueCreateLocationPage = () => {
  const navigate = useNavigate();

  const [coords, setCoords] = useState({ lat: 11.8745, lng: 75.3704 });
  const [selectedZone, setSelectedZone] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <motion.main
        className="max-w-5xl mx-auto px-6 pt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LocationHeader />
        <LocationProgress />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <MapSection />
          <LocationDetailsPanel
            coords={coords}
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
          />
        </div>

        <LocationFooter
          canContinue={!!selectedZone}
          onBack={() => navigate("/issue/1/media")}
          onContinue={() => navigate("/issue/1/evidence")}
        />
      </motion.main>
    </div>
  );
};

export default IssueCreateLocationPage;