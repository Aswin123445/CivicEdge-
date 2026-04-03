// pages/admin/AdminUpdateEventPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Hook
import useUpdateEvent from "../../hooks/admin/updateEvent";
import UpdateEventPageHeader, { UpdateEventPageHeaderSkeleton } from "../../components/admin_update_event_page/UpdateEventPageHeader";
import BasicInfoSection, { BasicInfoSectionSkeleton } from "../../components/admin_update_event_page/BasicInfoSection";
import LocationSection, { LocationSectionSkeleton } from "../../components/admin_update_event_page/LocationSection";
import ScheduleSection, { ScheduleSectionSkeleton } from "../../components/admin_update_event_page/ScheduleSection";
import UpdateEventFormFooter from "../../components/admin_update_event_page/UpdateEventFormFooter";
import SponsorSection from "../../components/admin_update_event_page/SponsorSection";
import { updateValidate } from "../../utils/eventDateValidate";



// ─── Helpers ──────────────────────────────────────────
const formatWithOffset = (val) => {
  if (!val) return "";
  if (val.includes("+")) return val;
  return `${val}:00+05:30`;
};

// ─── Page ─────────────────────────────────────────────
const AdminUpdateEventPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const {
    updateEventLoading,
    eventData,
    eventDetailsLoading,
    updateEventAction,
  } = useUpdateEvent(id);

  // ─── Full page loading state (data not yet arrived) ───
  if (eventDetailsLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-slate-100 font-sans pb-10">
        <UpdateEventPageHeaderSkeleton />
        <main className="max-w-4xl mx-auto px-6 space-y-4">
          <BasicInfoSectionSkeleton />
          <LocationSectionSkeleton />
          <ScheduleSectionSkeleton />
        </main>
      </div>
    );
  }

  return (
    <AdminUpdateEventForm
      eventData={eventData}
      updateEventLoading={updateEventLoading}
      updateEventAction={updateEventAction}
      navigate={navigate}
    />
  );
};

// ─── Inner form — only mounts after data is ready ─────
// Separated so useState initializes with real data, not null.
const AdminUpdateEventForm = ({
  eventData,
  updateEventLoading,
  updateEventAction,
  navigate,
}) => {
  const isLocked =
    eventData?.status === "CANCELLED" ||
    eventData?.runtime_status === "COMPLETED";

  const [formData, setFormData]     = useState(eventData ?? {});
  const [originalData]              = useState(eventData ?? {});
  const [errors, setErrors]         = useState({});
  const [showSponsor, setShowSponsor] = useState(
    !!(eventData?.sponsor_name)
  );

  const isDirty =
    JSON.stringify(formData) !== JSON.stringify(originalData);

  // ─── Single field updater ──────────────────────────
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ─── Submit ───────────────────────────────────────
  const handleSubmit = async () => {
    if (!updateValidate(formData, setErrors) || isLocked) return;

    const payload = {
      ...formData,
      start_time: formatWithOffset(formData.start_time),
      end_time:   formatWithOffset(formData.end_time),
    };

    await updateEventAction(payload);
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 font-sans pb-10">

      {/* HEADER */}
      <UpdateEventPageHeader eventData={eventData} isLocked={isLocked} />

      <main className="max-w-4xl mx-auto px-6">

        {/* 01 — Basic Info */}
        <BasicInfoSection
          formData={formData}
          onChange={handleChange}
          errors={errors}
          disabled={isLocked}
        />

        {/* 02 — Location */}
        <LocationSection
          formData={formData}
          onChange={handleChange}
          errors={errors}
          disabled={isLocked}
        />

        {/* 03 — Schedule */}
        <ScheduleSection
          formData={formData}
          onChange={handleChange}
          errors={errors}
          disabled={isLocked}
        />

        {/* 04 — Sponsorship (optional) */}
        <SponsorSection
          isVisible={showSponsor}
          onShow={() => setShowSponsor(true)}
          formData={formData}
          onChange={handleChange}
          disabled={isLocked}
        />

        {/* Sticky footer */}
        <UpdateEventFormFooter
          isDirty={isDirty}
          loading={updateEventLoading}
          disabled={isLocked}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default AdminUpdateEventPage;