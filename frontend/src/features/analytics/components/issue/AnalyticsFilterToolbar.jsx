import React, { useMemo, useState } from "react";
import { ChevronDown, RotateCcw, CalendarDays } from "lucide-react";

export default function AnalyticsFilterToolbar({ urlSearchParams }) {
  const DEFAULT_FILTERS = {
    range: urlSearchParams.searchParams.get("range") || "30d",
    fromDate: urlSearchParams.searchParams.get("date_from") || "",
    toDate: urlSearchParams.searchParams.get("date_to") || "",
  };
  const [errors, setErrors] = useState({});

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ---------------------------------------
  // DATE OPTIONS
  // ---------------------------------------
  const dateRanges = useMemo(
    () => [
      { label: "Last 7 Days", value: "7d" },
      { label: "Last 30 Days", value: "30d" },
      { label: "Last 90 Days", value: "90d" },
      { label: "This Year", value: "1y" },
      { label: "Custom Range", value: "custom" },
    ],
    [],
  );

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------
  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };

    // Clear custom dates if preset selected
    if (key === "range" && value !== "custom") {
      updated.fromDate = "";
      updated.toDate = "";
    }

    setFilters(updated);
    setErrors({});
  };

  const applyFilters = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0]; 

    if (filters.range === "custom") {
      if (!filters.fromDate) {
        newErrors.fromDate = "Please select From Date.";
      }

      if (!filters.toDate) {
        newErrors.toDate = "Please select To Date.";
      }

      if (filters.fromDate && filters.fromDate > today) {
        newErrors.fromDate = "From Date cannot be in the future.";
      }

      if (filters.toDate && filters.toDate > today) {
        newErrors.toDate = "To Date cannot be in the future.";
      }

      if (
        filters.fromDate &&
        filters.toDate &&
        filters.fromDate > filters.toDate
      ) {
        newErrors.toDate = "To Date must be after From Date.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (filters.range === "custom") {
      urlSearchParams.setSearchParams({
        range: "custom",
        date_from: filters.fromDate,
        date_to: filters.toDate,
      });
    } else {
      urlSearchParams.setSearchParams({
        range: filters.range,
      });
    }
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    urlSearchParams.setSearchParams({});
  };

  // ---------------------------------------
  // SELECT COMPONENT
  // ---------------------------------------
  const FilterSelect = ({ label, value, options, onChange }) => (
    <div className="min-w-[220px]">
      <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full px-3 py-2 rounded-lg border border-slate-700 bg-[#1e1e1e] text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );

  // ---------------------------------------
  // DATE INPUT
  // ---------------------------------------
  const DateInput = ({ label, value, onChange }) => (
    <div className="min-w-[220px]">
      <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>

      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-[#1e1e1e] text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <CalendarDays className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-end">
      {/* DATE RANGE */}
      <FilterSelect
        label="Date Range"
        value={filters.range}
        options={dateRanges}
        onChange={(val) => updateFilter("range", val)}
      />

      {/* CUSTOM RANGE */}
      {filters.range === "custom" && (
        <>
        <div className = "flex flex-col">
          <DateInput
            label="From Date"
            value={filters.fromDate}
            onChange={(val) => updateFilter("fromDate", val)}
          />
          {errors.fromDate && (
            <p className="text-xs text-red-400 mt-1">{errors.fromDate}</p>
          )}
          </div>
          <div className="flex flex-col">
          <DateInput
            label="To Date"
            value={filters.toDate}
            onChange={(val) => updateFilter("toDate", val)}
          />
          {errors.toDate && (
            <p className="text-xs text-red-400 mt-1">{errors.toDate}</p>
          )}
          </div>
        </>
      )}

      {/* APPLY */}
      <button
        onClick={applyFilters}
        className="h-[42px] px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all"
      >
        Apply
      </button>

      {/* RESET */}
      <button
        onClick={resetFilters}
        className="h-[42px] px-4 rounded-lg border border-slate-700 bg-[#1e1e1e] text-sm text-blue-400 hover:text-blue-300 hover:border-slate-500 transition-all flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}
