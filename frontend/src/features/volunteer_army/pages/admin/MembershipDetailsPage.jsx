
import { useParams } from "react-router-dom";
import useAdminPendingMembershipDetails from "../../hooks/admin/adminPendingMembershipDetails";
import MembershipDetailHeader, { MembershipDetailHeaderSkeleton } from "../../components/admin_pending_membership_details/MembershipDetailHeader";
import UserInfoSection, { UserInfoSectionSkeleton } from "../../components/admin_pending_membership_details/UserInfoSection";
import GroupContextSection, { GroupContextSectionSkeleton } from "../../components/admin_pending_membership_details/GroupContextSection";
import SystemMetadataCard, { SystemMetadataCardSkeleton } from "../../components/admin_pending_membership_details/SystemMetadataCard";
import DecisionActionsPanel, { DecisionActionsPanelSkeleton } from "../../components/admin_pending_membership_details/DecisionActionsPanel";
import EvidenceSection, { EvidenceSectionSkeleton } from "../../components/admin_pending_membership_details/EvidenceSection";


const MembershipDetailsPage = () => {
  const { id } = useParams();

  // RTK Query hook
  const {
    membershipDetails,
    membershipDetailsLoading,
    membershipDetailsFetching,
    handleApprove,
    approveMembershipLoading,
    handleConfirmReject,
    rejectMembershipLoading,
    showRejectModal,
    setShowRejectModal
  } = useAdminPendingMembershipDetails(id);

  const membership = membershipDetails ?? [];

  const isLoading = membershipDetailsLoading || membershipDetailsFetching;


  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans antialiased">

      {/* Background refetch indicator */}
      {membershipDetailsFetching && !membershipDetailsLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        {isLoading ? (
          <MembershipDetailHeaderSkeleton />
        ) : (
          <MembershipDetailHeader membership={membership} />
        )}

        <div className="grid grid-cols-12 gap-6">

          {/* ── LEFT COLUMN ── */}
          <main className="col-span-12 lg:col-span-8 space-y-6">

            {isLoading ? <UserInfoSectionSkeleton />     : <UserInfoSection membership={membership} />}
            {isLoading ? <GroupContextSectionSkeleton /> : <GroupContextSection membership={membership} />}
            {isLoading ? <EvidenceSectionSkeleton />     : <EvidenceSection membership={membership} />}
          </main>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">

            {isLoading ? (
              <SystemMetadataCardSkeleton />
            ) : (
              <SystemMetadataCard membership={membership} />
            )}

            {isLoading ? (
              <DecisionActionsPanelSkeleton />
            ) : (
              <DecisionActionsPanel
                membership={membership}
                showModal={showRejectModal}
                onApprove={handleApprove}
                onOpenReject={() => setShowRejectModal(true)}
                onCloseReject={() => setShowRejectModal(false)}
                onConfirmReject={handleConfirmReject}
                approveMembershipLoading={approveMembershipLoading}
                rejectMembershipLoading={rejectMembershipLoading}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetailsPage;