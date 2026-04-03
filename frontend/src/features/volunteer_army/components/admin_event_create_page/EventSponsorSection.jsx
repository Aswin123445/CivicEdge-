// components/admin/events/create/EventSponsorSection.jsx
import { Heart, ExternalLink } from "lucide-react";
import { InputField, SectionContainer } from "./FormPrimitives";

/**
 * @param {boolean}  isVisible
 * @param {function} onShow      - () => void
 * @param {function} onHide      - () => void
 * @param {object}   formData
 * @param {function} onChange    - (field, value) => void
 */
const EventSponsorSection = ({
  isVisible,
  onShow,
  onHide,
  formData,
  onChange,
}) => {
  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={onShow}
        className="w-full py-6 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-slate-600 hover:text-blue-400 hover:border-blue-500/30 transition-all font-black uppercase text-[10px] tracking-widest bg-slate-900/30"
      >
        <Heart size={16} /> + Attach Sponsor Data
      </button>
    );
  }

  return (
    <SectionContainer
      title="04. Sponsorship"
      subtitle="Optional metadata for event partners."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Partner Name"
          placeholder="Organization Title"
          value={formData?.sponsor_name}
          onChange={(v) => onChange("sponsor_name", v)}
        />
        {/* <InputField
          label="Logo URL"
          placeholder="https://image-link.com"
          value={formData?.sponsor_logo_url}
          onChange={(v) => onChange("sponsor_logo_url", v)}
        /> */}
        <div className="md:col-span-2">
          <InputField
            label="Partner Website"
            placeholder="https://civicedge.io"
            icon={<ExternalLink size={16} />}
            value={formData?.sponsor_website}
            onChange={(v) => onChange("sponsor_website", v)}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Sponsor Message"
            placeholder="Brief message from the sponsor..."
            value={formData?.sponsor_message}
            onChange={(v) => onChange("sponsor_message", v)}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onHide}
        className="mt-6 text-[10px] font-black text-red-500/70 hover:text-red-400 uppercase tracking-widest"
      >
        — Remove Sponsorship Section
      </button>
    </SectionContainer>
  );
};

export default EventSponsorSection;
