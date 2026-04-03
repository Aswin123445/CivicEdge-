// components/admin/events/create/EventLogisticsSection.jsx
import { MapPin, Users } from "lucide-react";
import { InputField, SectionContainer } from "./FormPrimitives";

/**
 * @param {object}   formData
 * @param {function} onChange  - (field, value) => void
 * @param {object}   errors
 */
const EventLogisticsSection = ({ formData, onChange, errors = {} }) => (
  <SectionContainer
    title="02. Logistics"
    subtitle="Physical coordinates and volunteer capacity."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Venue Name *"
        placeholder="e.g., Central Park East Gate"
        icon={<MapPin size={16} />}
        value={formData?.location_name}
        onChange={(v) => onChange("location_name", v)}
        error={errors.location_name}
      />

      <InputField
        label="Max Capacity *"
        type="number"
        icon={<Users size={16} />}
        value={formData?.capacity}
        onChange={(v) => onChange("capacity", v)}
        error={errors.capacity}
      />

      {/* Full-width address textarea */}
      <div className="md:col-span-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 block ml-1">
          Exact Address *
        </label>
        <textarea
          className={`w-full bg-[#1e1e1e] border ${
            errors.location_address ? "border-red-500/50" : "border-slate-800"
          } rounded-xl p-4 text-sm text-slate-200 focus:border-blue-500 outline-none transition-all resize-none`}
          rows="3"
          placeholder="Street name, landmark, and zip code..."
          value={formData?.location_address ?? ""}
          onChange={(e) => onChange("location_address", e.target.value)}
        />
        {errors.location_address && (
          <p className="text-[10px] text-red-500 font-bold ml-1 mt-1">
            {errors.location_address}
          </p>
        )}
      </div>
    </div>
  </SectionContainer>
);

export default EventLogisticsSection;
