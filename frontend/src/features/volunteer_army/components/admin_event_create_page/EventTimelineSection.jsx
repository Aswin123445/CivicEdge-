// components/admin/events/create/EventTimelineSection.jsx
import { Clock, CalendarDays } from "lucide-react";
import { SectionContainer } from "./FormPrimitives";

// Generate 30-min slots: 12:00 AM → 11:30 PM
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour        = Math.floor(i / 2);
  const min         = i % 2 === 0 ? "00" : "30";
  const ampm        = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${min} ${ampm}`;
});

const DateInput = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">
      {label}
    </label>
    <div className="relative group">
      <CalendarDays
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
        size={16}
      />
      <input
        type="date"
        className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-200 focus:border-blue-500 outline-none transition-all"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  </div>
);

const TimeSelect = ({ label, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Clock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
        size={16}
      />
      <select
        className={`w-full bg-[#1e1e1e] border ${
          error ? "border-red-500/50" : "border-slate-800"
        } rounded-xl py-3 pl-12 pr-4 text-sm text-slate-200 focus:border-blue-500 outline-none appearance-none transition-all`}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {TIME_SLOTS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
    {error && (
      <p className="text-[10px] text-red-400 font-bold ml-1">{error}</p>
    )}
  </div>
);

/**
 * @param {object}   formData
 * @param {function} onChange  - (field, value) => void
 * @param {object}   errors
 */
const EventTimelineSection = ({ formData, onChange, errors = {} }) =>{ 
  return (
  <SectionContainer
    title="03. Timeline"
    subtitle="Define the temporal boundaries of the event."
  >
    <div className="space-y-8">
      {/* Start row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput
          label="Start Date *"
          value={formData?.start_date}
          onChange={(v) => onChange("start_date", v)}
        />
        <TimeSelect
          label="Start Time *"
          value={formData?.start_time}
          onChange={(v) => onChange("start_time", v)}
        />
        {errors?.start_time && (
          <p className="text-[10px] text-red-400 font-bold ml-1">
            {errors.start_time}
          </p>
        )}
      </div>
      +
      {/* Divider */}
      <div className="flex items-center justify-center py-2">
        <div className="h-[1px] flex-1 bg-slate-800" />
        <span className="px-4 text-[10px] font-black text-slate-700 tracking-widest uppercase">
          To
        </span>
        <div className="h-[1px] flex-1 bg-slate-800" />
      </div>

      {/* End row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput
          label="End Date *"
          value={formData?.end_date}
          onChange={(v) => onChange("end_date", v)}
        />
        <TimeSelect
          label="End Time *"
          value={formData?.end_time}
          onChange={(v) => onChange("end_time", v)}
          error={errors.end_time}
        />
        {errors.end_date && (
          <p className="text-[10px] text-red-400 font-bold ml-1">
            {errors.end_date}
          </p>
        )}
      </div>
    </div>
  </SectionContainer>
);}

export default EventTimelineSection;
export { TIME_SLOTS };
