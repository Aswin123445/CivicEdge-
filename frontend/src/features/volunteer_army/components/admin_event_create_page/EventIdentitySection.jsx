// components/admin/events/create/EventIdentitySection.jsx
import { useState,useEffect } from "react";
import { Users, Search, ChevronDown } from "lucide-react";
import Skeleton from "./Skeleton";
import { InputField, SectionContainer } from "./FormPrimitives";
import { useRef } from "react";
// ─── Group selector skeleton ───────────────────────────
const GroupSelectorSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-3 w-28" />
    <Skeleton className="h-14 w-full rounded-xl" />
  </div>
);

// ─── Group selector ────────────────────────────────────
const GroupSelector = ({ groups = [], value, onChange, error, isLoading }) => {
  const inputRef = useRef(null);
  const [search, setSearch]   = useState("");
  const [isOpen, setIsOpen]   = useState(false);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [setIsOpen]);
  if (isLoading) return <GroupSelectorSkeleton />;

  const filtered = Array.isArray(groups)
    ? groups.filter((g) =>
        (g?.derived_name ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div ref={inputRef} className="relative">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 block ml-1">
        Assigned Group *
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between bg-[#1e1e1e] border ${
          error ? "border-red-500/50" : "border-slate-800"
        } rounded-xl p-4 text-sm hover:border-slate-700 transition-all`}
      >
        <div className="flex items-center gap-3">
          <Users size={18} className="text-blue-400 shrink-0" />
          <span className={value ? "text-slate-100 font-bold" : "text-slate-500"}>
            {value?.name ?? "Search and select a group..."}
          </span>
        </div>
        <ChevronDown size={16} className="text-slate-600 shrink-0" />
      </button>

      {error && (
        <p className="text-[10px] text-red-500 font-bold ml-1 mt-1">{error}</p>
      )}

      {isOpen && (
        <div  className="absolute z-50 w-full  mt-2 bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-slate-800">
            <div className="flex items-center gap-2 bg-[#1e1e1e] rounded-lg px-3 py-2 border border-slate-800 focus-within:border-blue-500 transition-all">
              <Search size={14} className="text-slate-500 shrink-0" />
              <input
                className="bg-transparent text-xs outline-none w-full text-slate-200"
                placeholder="Type group name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((g) => (
                <div
                  key={g?.id ?? g?.name}
                  onClick={() => {
                    onChange?.(g);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/50 last:border-0"
                >
                  <p className="text-sm font-bold text-slate-200">
                    {g?.derived_name ?? "—"}
                  </p>
                  {g?.type && (
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                      {g.type}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="px-4 py-4 text-xs text-slate-500 font-medium text-center">
                No groups found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Section ───────────────────────────────────────────
/**
 * @param {Array}    groups        - from API hook
 * @param {boolean}  groupsLoading - hook loading state
 * @param {object}   formData
 * @param {function} onChange      - (field, value) => void
 * @param {object}   errors
 */
const EventIdentitySection = ({
  groups,
  groupsLoading,
  formData,
  onChange,
  errors = {},
}) => (
  <SectionContainer
    title="01. Identity"
    subtitle="Basic event identification and group ownership."
  >
    <div className="space-y-6">
      <GroupSelector
        groups={groups}
        value={formData?.group}
        onChange={(g) => onChange("group", g)}
        error={errors.group}
        isLoading={groupsLoading}
      />
      <InputField
        label="Event Title *"
        placeholder="e.g., Weekend Beach Restoration"
        value={formData?.title}
        onChange={(v) => onChange("title", v)}
        error={errors.title}
      />
    </div>
  </SectionContainer>
);

export default EventIdentitySection;
