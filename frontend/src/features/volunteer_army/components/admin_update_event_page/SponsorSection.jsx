// components/admin/events/update/SponsorSection.jsx
import { SectionCard, InputField } from "./FormPrimitives";

/**
 * @param {boolean}  isVisible
 * @param {function} onShow
 * @param {object}   formData
 * @param {function} onChange  - (field, value) => void
 * @param {boolean}  disabled
 */
const SponsorSection = ({ isVisible, onShow, formData, onChange, disabled }) => {
  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={onShow}
        className="w-full py-4 border-2 border-dashed border-slate-800 rounded-xl text-slate-600 font-black uppercase text-[10px] tracking-widest hover:border-blue-500/50 hover:text-blue-400 transition-all mb-6"
      >
        + Add Sponsor Metadata
      </button>
    );
  }

  return (
    <SectionCard title="Sponsorship (Optional)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Partner Name"
          value={formData?.sponsor_name}
          disabled={disabled}
          onChange={(v) => onChange("sponsor_name", v)}
        />
        <InputField
          label="Partner Website"
          value={formData?.sponsor_website}
          disabled={disabled}
          onChange={(v) => onChange("sponsor_website", v)}
        />
        <div className="md:col-span-2">
          <InputField
            label="Logo URL"
            value={formData?.sponsor_logo_url}
            disabled={disabled}
            onChange={(v) => onChange("sponsor_logo_url", v)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 block ml-1">
            Sponsor Message
          </label>
          <textarea
            className="w-full bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 outline-none focus:border-blue-500 transition-all resize-none disabled:opacity-50"
            placeholder="Sponsor message..."
            rows="3"
            value={formData?.sponsor_message ?? ""}
            disabled={disabled}
            onChange={(e) => onChange("sponsor_message", e.target.value)}
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default SponsorSection;
