
import useCreateEvent from "../../hooks/admin/createEvent";
import CreateEventPageHeader from "../../components/admin_event_create_page/CreateEventPageHeader";
import EventIdentitySection from "../../components/admin_event_create_page/EventIdentitySection";
import EventLogisticsSection from "../../components/admin_event_create_page/EventLogisticsSection";
import EventTimelineSection from "../../components/admin_event_create_page/EventTimelineSection";
import EventSponsorSection from "../../components/admin_event_create_page/EventSponsorSection";
import CreateEventFormActions from "../../components/admin_event_create_page/CreateEventFormActions";

const CreateEventPage = () => {
  const {
    groupData: apiGroups,
    groupisLoading,
    formData,
    errors,
    isSubmitting,
    showSponsor,
    setShowSponsor,
    handleChange,
    handleSubmit,
    navigate,
  } = useCreateEvent();
  const groups = Array.isArray(apiGroups) ? apiGroups : [];

  const handleCancel = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 font-sans pb-10">
      {/* PAGE HEADER */}
      <CreateEventPageHeader />

      <main className="max-w-4xl mx-auto px-6 space-y-3">
        {/* 01 — Identity + Group selector */}
        <EventIdentitySection
          groups={groups}
          groupsLoading={groupisLoading}
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        {/* 02 — Logistics */}
        <EventLogisticsSection
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        {/* 03 — Timeline */}
        <EventTimelineSection
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        {/* 04 — Sponsorship (optional toggle) */}
        <EventSponsorSection
          isVisible={showSponsor}
          onShow={() => setShowSponsor(true)}
          onHide={() => setShowSponsor(false)}
          formData={formData}
          onChange={handleChange}
        />

        {/* Actions */}
        <CreateEventFormActions
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default CreateEventPage;
