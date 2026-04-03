// components/admin/events/update/ScheduleSection.jsx
import { Info } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./FormPrimitives";
import ScheduleInputGroup from "./ScheduleInputGroup";

// ─── Skeleton ─────────────────────────────────────────
export const ScheduleSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-6">
    <div className="px-8 py-6 border-b border-slate-800/50 space-y-1">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-3 w-36" />
    </div>
    <div className="p-8 space-y-8">
      {/* Start group */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-24" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800/50" />

      {/* End group */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-20" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* Timezone note */}
      <Skeleton className="h-3 w-56" />
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
const ScheduleSection = ({ formData, onChange, errors = {}, disabled }) => (
  <SectionCard title="Schedule" subtitle="Temporal boundaries (IST).">
    <div className="space-y-8">
      <ScheduleInputGroup
        label="Event Start"
        value={formData?.start_time}
        disabled={disabled}
        onChange={(v) => onChange("start_time", v)}
      />

      <div className="border-t border-slate-800/50 relative">
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
          To
        </span>
      </div>

      <ScheduleInputGroup
        label="Event End"
        value={formData?.end_time}
        disabled={disabled}
        error={errors.end_time}
        onChange={(v) => onChange("end_time", v)}
      />

      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
        <Info size={12} className="text-blue-400 shrink-0" />
        <span>Timezone: India Standard Time (+05:30)</span>
      </div>
    </div>
  </SectionCard>
);

export default ScheduleSection;
