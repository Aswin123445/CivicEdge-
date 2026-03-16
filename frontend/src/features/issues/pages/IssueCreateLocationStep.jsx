import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fadeInUp, containerVariants } from "../ui/motion";
import LocationHeader from "../components/issue_step2_location/LocationHeader";
import LocationProgress from "../components/issue_step2_location/LocationProgress";
import MapSection from "../components/issue_step2_location/MapSection";
import LocationDetailsPanel from "../components/issue_step2_location/LocationDetailsPanel";
import LocationFooter from "../components/issue_step2_location/LocationFooter";
import MapSearchBox from "../components/issue_step2_location/MapSearchBox";
import useLocationService from "../hooks/locationServiceHook";
import { errorToast, successToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { ChevronLeft } from "lucide-react";

const IssueCreateLocationPage = () => {
  const { addLocation } = useLocationService();
  const navigate = useNavigate();
  const {id} = useParams()
  const [coords, setCoords] = useState({ lat: 11.8745, lng: 75.3704,landmark:"N/A" });
  const [selectedZone, setSelectedZone] = useState("");
  const handleContinue = async() => {
    const req = { latitude: coords.lat, longitude: coords.lng, zone_id: selectedZone };
    try {
      await addLocation({req,id}).unwrap();
      successToast({ title: "Success", description: "Location added successfully." });
      navigate(`/issue/${id}/evidence`);
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };
    const handleBack = () => {
    navigate("/complaints");
  };
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <motion.main
        className="max-w-5xl mx-auto px-6 pt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Complaints Home</span>
        </button>
        <LocationHeader />
        <LocationProgress />
        <MapSearchBox onSelect = {setCoords}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-4">
          <MapSection setCoords={setCoords} coords={coords} />

          <LocationDetailsPanel
            coords={coords}
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
          />
        </div>

        <LocationFooter
          canContinue={!!selectedZone}
          onContinue={() => handleContinue()}
        />
      </motion.main>
    </div>
  );
};

export default IssueCreateLocationPage;
