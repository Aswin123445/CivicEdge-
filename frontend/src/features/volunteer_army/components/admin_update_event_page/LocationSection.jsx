// components/admin/events/update/LocationSection.jsx
import { MapPin, Users } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard, InputField } from "./FormPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const LocationSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-6">
    <div className="px-8 py-6 border-b border-slate-800/50 space-y-1">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-3 w-44" />
    </div>
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object}   formData
 * @param {function} onChange  - (field, value) => void
 * @param {object}   errors
 * @param {boolean}  disabled
 */
const LocationSection = ({ formData, onChange, errors = {}, disabled }) => (
  <SectionCard title="Location" subtitle="Define physical coordinates.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Location Name *"
        icon={<MapPin size={16} />}
        value={formData?.location_name}
        disabled={disabled}
        onChange={(v) => onChange("location_name", v)}
        error={errors.location_name}
      />

      <InputField
        label="Capacity *"
        type="number"
        icon={<Users size={16} />}
        value={formData?.capacity}
        disabled={disabled}
        onChange={(v) => onChange("capacity", v)}
        error={errors.capacity}
      />

      <div className="md:col-span-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 block ml-1">
          Full Address *
        </label>
        <textarea
          className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 focus:border-blue-500 outline-none transition-all resize-none disabled:opacity-50"
          rows="2"
          value={formData?.location_address ?? ""}
          disabled={disabled}
          onChange={(e) => onChange("location_address", e.target.value)}
        />
      </div>
    </div>
  </SectionCard>
);

export default LocationSection;
