// components/admin/events/update/BasicInfoSection.jsx
import { Lock } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard, InputField } from "./FormPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const BasicInfoSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-6">
    <div className="px-8 py-6 border-b border-slate-800/50 space-y-1">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-3 w-48" />
    </div>
    <div className="p-8 space-y-6">
      {/* Group (locked) */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-28 w-full rounded-xl" />
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
const BasicInfoSection = ({ formData, onChange, errors = {}, disabled }) => (
  <SectionCard title="Basic Information" subtitle="Update core identification.">
    <div className="space-y-6">
      {/* Group — locked, never editable */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">
          Assigned Group (Fixed)
        </label>
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-sm text-slate-500 flex justify-between items-center italic">
          {formData?.group_name ?? "—"}
          <Lock size={14} className="opacity-50" />
        </div>
      </div>

      <InputField
        label="Event Title *"
        value={formData?.title}
        disabled={disabled}
        onChange={(v) => onChange("title", v)}
        error={errors.title}
      />

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">
          Description
        </label>
        <textarea
          className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 focus:border-blue-500 outline-none transition-all resize-none disabled:opacity-50"
          rows="4"
          value={formData?.description ?? ""}
          disabled={disabled}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  </SectionCard>
);

export default BasicInfoSection;
