import EvidenceSection, {
  EvidenceSectionSkeleton,
} from "../../components/membership_detall_page/EvidenceSection";
import GroupOverviewCard, {
  GroupOverviewCardSkeleton,
} from "../../components/membership_detall_page/GroupOverviewCard";
import GroupQuickFacts, {
  GroupQuickFactsSkeleton,
} from "../../components/membership_detall_page/GroupQuickFacts(1)";
import MembershipPageHeader from "../../components/membership_detall_page/MembershipPageHeader";
import ReapplyBar from "../../components/membership_detall_page/ReapplyBar";
import StatusBanner from "../../components/membership_detall_page/StatusBanner";
import SubmitApplicationBar from "../../components/membership_detall_page/SubmitApplicationBar";
import { useNavigate, useParams } from "react-router-dom";
import useVolunteerMembershipDetail from "../../hooks/citizen/volunteerMembershipDetail";
import { useState } from "react";
import MembershipTrackingCard, {
  MembershipTrackingCardSkeleton,
} from "../../components/membership_detall_page/MembershipTrackingCard";

const MembershipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // RTK Query hook (real data when integrated)
  const {
    membershipDetail,
    membershipDetailLoading,
    membershipDetailFetching,
    evidences,
    evidenceListLoading,
    evidenceListFetching,
    isFileUploading,
    handleUpload,
    handleDelete,
    isSubmitting,
    handleSubmit,
    handleLeaveGroup,
  } = useVolunteerMembershipDetail(id);
  const [uploadError, setUploadError] = useState(null);
  // const handleReapply = () => console.log("hi");

  const isLoading = membershipDetailLoading;

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Background refetch indicator */}
      {membershipDetailFetching && !membershipDetailLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      {/* PAGE HEADER */}
      <MembershipPageHeader
        membership={membershipDetail}
        onViewEvents={() => navigate(`/volunteer-army/${membershipDetail?.group_id}/events`)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* ── LEFT COLUMN ── */}
          <div className="col-span-12 lg:col-span-8">
            {/* Status banner */}
            <StatusBanner status={membershipDetail?.status} />

            {/* Group overview */}
            {isLoading ? (
              <GroupOverviewCardSkeleton />
            ) : (
              <GroupOverviewCard
                description={membershipDetail?.group_description}
                requirements={membershipDetail?.requirements}
              />
            )}

            {/* Evidence */}
            {isLoading  || evidenceListLoading || evidenceListFetching? (
              <EvidenceSectionSkeleton />
            ) : (
              <>
                {uploadError && (
                  <p className="mt-4 text-sm text-red-600 font-medium">
                    {uploadError}
                  </p>
                )}
                {membershipDetail?.status !== "REJECTED" && <EvidenceSection
                  status={membershipDetail?.status}
                  evidences={evidences}
                  onUpload={handleUpload}
                  onDelete={handleDelete}
                  onError={setUploadError}
                  isFileUploading={isFileUploading}
                />}
              </>
            )}

            {/* Submit bar */}
            {!isLoading && membershipDetail?.status === "PENDING" && (
              <SubmitApplicationBar
                hasEvidences={evidences.length > 0}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            )}

            {/* Reapply bar */}
            {/* {!isLoading && membershipDetail?.status === "REJECTED" && (
              <ReapplyBar onReapply={handleReapply} />
            )} */}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {isLoading ? (
              <MembershipTrackingCardSkeleton />
            ) : (
              <MembershipTrackingCard membership={membershipDetail} />
            )}

            {isLoading ? (
              <GroupQuickFactsSkeleton />
            ) : (
              <GroupQuickFacts
                riskLevel={membershipDetail?.risk_level}
                membersCount={membershipDetail?.group_members}
              />
            )}

            {/* Leave group — active only */}
            {!isLoading && membershipDetail?.status === "ACTIVE" && (
              <button
                onClick={() => handleLeaveGroup(membershipDetail?.id)}
                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors"
              >
                Leave Group
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MembershipDetailPage;
