import { MapPin } from "lucide-react";
import MapSection from "../../../issues/components/issue_step2_location/MapSection";

const IssueLocationMap = ({ location }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`;

  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Location</h2>

        <button
          onClick={() => window.open(googleMapsUrl, "_blank")}
          className="text-xs bg-[#1e1e1e] hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          Open in Google Maps
        </button>
      </div>

      {/* Location Details */}
      <div className="mb-4 space-y-1 text-sm text-slate-400">
        
        {/* Zone */}
        {location?.zone && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-500" />
            <span>
              <span className="text-slate-500">Zone:</span> {location.zone}
            </span>
          </div>
        )}

        {/* Landmark (Optional) */}
        {location?.landmark_description && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-500" />
            <span>
              <span className="text-slate-500"> Landmark:</span> {location.landmark_description}
            </span>
          </div>
        )}

      </div>

      {/* Map */}
      <div className="h-80  pointer-events-none flex items-center justify-center relative overflow-hidden ">
        
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Map */}
        <div className="absolute inset-0">
          <MapSection
            coords={{ lat: location.latitude, lng: location.longitude }}
            height="h-80"
            zoom={20}
          />
        </div>

      </div>

    </section>
  );
};

export default IssueLocationMap;