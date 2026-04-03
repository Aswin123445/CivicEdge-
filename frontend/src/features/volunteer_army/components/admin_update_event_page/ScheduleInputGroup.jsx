// components/admin/events/update/ScheduleInputGroup.jsx
import { useState, useEffect } from "react";
import { CalendarDays, Clock, AlertCircle } from "lucide-react";

/**
 * Splits an ISO string into date + time inputs and emits back a combined ISO.
 * @param {string}   label
 * @param {string}   value     - ISO string e.g. "2026-04-02T09:00:00+05:30"
 * @param {function} onChange  - (isoString: string) => void
 * @param {boolean}  disabled
 * @param {string}   error
 */
const ScheduleInputGroup = ({ label, value, onChange, disabled = false, error }) => {
  const initialDate = value ? (value.split("T")[0] ?? "") : "";
  const initialTime =
    value && value.includes("T") ? (value.split("T")[1]?.substring(0, 5) ?? "") : "";

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (date && time) {
      onChange?.(`${date}T${time}:00+05:30`);
    }
  }, [date, time]);

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
        {label} *
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date */}
        <div className="relative group">
          <CalendarDays
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
            size={16}
          />
          <input
            type="date"
            value={date}
            disabled={disabled}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-200 outline-none focus:border-blue-400 transition-all disabled:opacity-50 appearance-none"
            style={{ colorScheme: "dark" }}
          />
        </div>

        {/* Time */}
        <div className="relative group">
          <Clock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
            size={16}
          />
          <input
            type="time"
            value={time}
            disabled={disabled}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-200 outline-none focus:border-blue-400 transition-all disabled:opacity-50 appearance-none"
            style={{ colorScheme: "dark" }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-red-500 ml-1">
          <AlertCircle size={12} />
          <p className="text-[10px] font-bold uppercase tracking-tight">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleInputGroup;
