import React, { useState } from "react";
import IssueHeader from "../components/issue_details_page/IssueHeader";
import IssueDetailsCard from "../components/issue_details_page/IssueDetailsCard";
import EvidenceGallery from "../components/issue_details_page/EvidenceGallery";
import IssueLocationMap from "../components/issue_details_page/IssueLocationMap";
import AdminDecisionPanel from "../components/issue_details_page/AdminDecisionPanel";
import ApproveIssueModal from "../components/issue_details_page/modal/ApproveIssueModal";
import RejectIssueModal from "../components/issue_details_page/modal/RejectIssueModal";
import EnlargeImage from "../components/issue_details_page/EnlargeImage";
import useAdminIssueDetailsService from "../hooks/admin/pending_issue_details/serviceHooks";
import IssueDetailSkeleton from "../components/issue_details_page/IssueDetailSkeleton";

/**
 * CivicEdge Admin: Issue Detail & Moderation Page
 * * Tech Stack: React, TailwindCSS
 * Theme: Modern Dark (Linear/Vercel inspired)
 */

const IssueDetailPage = () => {
  // --- State Management ---
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- Handlers ---
  const { issueDetails, issueDetailsLoading,handleadminInReviewDecition } = useAdminIssueDetailsService();
    const handleDecision = (payload) => {
    // Logic to close modals and update UI status would go here
    handleadminInReviewDecition(payload);
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
  };
  if (issueDetailsLoading ) {
    return <IssueDetailSkeleton/>
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* COMPONENT: IssueHeader 
          Move to: components/admin/issues/IssueHeader.jsx
        */}
        <IssueHeader issue={issueDetails} />

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Main Content (8/12) */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* COMPONENT: IssueDetailsCard 
              Move to: components/admin/issues/IssueDetailsCard.jsx
            */}
            <IssueDetailsCard issue={issueDetails} />

            {/* COMPONENT: EvidenceGallery 
              Move to: components/admin/issues/EvidenceGallery.jsx
            */}
            <EvidenceGallery
              issue={issueDetails}
              setSelectedImage={setSelectedImage}
            />

            {/* COMPONENT: IssueLocationMap 
              Move to: components/admin/issues/IssueLocationMap.jsx
            */}
            <IssueLocationMap location={issueDetails?.location} />
          </main>

          {/* RIGHT COLUMN: Sidebar (4/12) */}
          <aside className="col-span-12 lg:col-span-4">
            <AdminDecisionPanel
              issue={issueDetails}
              setIsApproveModalOpen={setIsApproveModalOpen}
              setIsRejectModalOpen={setIsRejectModalOpen}
            />
          </aside>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* COMPONENT: ApproveIssueModal 
        Move to: components/admin/modals/ApproveIssueModal.jsx
      */}
      {isApproveModalOpen && (
        <ApproveIssueModal
          open={isApproveModalOpen}
          handleDecision={handleDecision}
          setIsApproveModalOpen={setIsApproveModalOpen}
        />
      )}

      {/* COMPONENT: RejectIssueModal 
        Move to: components/admin/modals/RejectIssueModal.jsx
      */}
      {isRejectModalOpen && (
        <RejectIssueModal
          open={isRejectModalOpen}
          handleDecision={handleDecision}
          setIsRejectModalOpen={setIsRejectModalOpen}
        />
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <EnlargeImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
};

export default IssueDetailPage;
