import React, { useState } from "react";
import AdminVerificationPageHeader from "../components/admin_verification_report_page/AdminVerificationPageHeader";
import AdminVerificationIssueContextCard from "../components/admin_verification_report_page/AdminVerificationIssueContextCard";
import AdminVerificationcitizenEvidenceGallery from "../components/admin_verification_report_page/AdminVerificationcitizenEvidenceGallery";
import AdminVerficationsolverReportCard from "../components/admin_verification_report_page/AdminVerficationsolverReportCard";
import AdminVerificationAdminActionPanel from "../components/admin_verification_report_page/AdminVerificationAdminActionPanel";
import AdminVerificationSolverInfoCard from "../components/admin_verification_report_page/AdminVerificationSolverInfoCard";
import AdminVerificationTaskInfoCard from "../components/admin_verification_report_page/AdminVerificationTaskInfoCard";
import DecisionModal from "../components/admin_verification_report_page/DecisionModal";
import useAdminPendingVerificationDetails from "../hooks/admin/admin_pending_verification_detail_hook/adminPendingDetailsHook";

import { useParams } from "react-router-dom";
import SolverEvidenceGallery from "../components/admin_verification_report_page/SolverEvidenceGallery";
import IssueDetailSkeleton from "../components/issue_details_page/IssueDetailSkeleton";
const AdminVerificationReportPage = () => {
  const { id } = useParams();
  const {
    pendingVerificationDetail,
    pendingVerificationDetailLoading,
    contractors,
    contractorsLoading,
    adminDecisionTask,
    adminDecisionTaskLoading,
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    handleSubmit,
    errors,
  } = useAdminPendingVerificationDetails(
    id,
    "/dashboard/execution/verification-reports",
  );
  // --- State Management ---

  const openModal = (type) => {
    setFormData((pre) => ({...pre,decision_type: type}));
    setIsModalOpen(true);
  };
  if (pendingVerificationDetailLoading || contractorsLoading) return <IssueDetailSkeleton />;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* COMPONENT: PageHeader 
          Move to: components/admin/verification/PageHeader.jsx
        */}
        <AdminVerificationPageHeader reportData={pendingVerificationDetail} />

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Content (col-span-8) */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* COMPONENT: IssueContextCard */}
            <AdminVerificationIssueContextCard
              reportData={pendingVerificationDetail}
            />

            {/* COMPONENT: CitizenEvidenceGallery */}
            <AdminVerificationcitizenEvidenceGallery
              reportData={pendingVerificationDetail}
            />

            {/* COMPONENT: SolverReportCard */}
            <AdminVerficationsolverReportCard
              reportData={pendingVerificationDetail}
            />

            {/* COMPONENT: SolverEvidenceGallery */}
            <SolverEvidenceGallery reportData={pendingVerificationDetail} />
          </main>

          {/* RIGHT COLUMN: Sidebar (col-span-4) */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* COMPONENT: SolverInfoCard */}
              <AdminVerificationSolverInfoCard
                reportData={pendingVerificationDetail}
              />

              {/* COMPONENT: TaskInfoCard */}
              <AdminVerificationTaskInfoCard  />

              {/* COMPONENT: AdminActionsPanel */}
              <AdminVerificationAdminActionPanel
                openModal={openModal}
                isModalOpen={isModalOpen}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* COMPONENT: DecisionModal */}
      {isModalOpen && (
        <DecisionModal
          formData={formData}
          onClose={() => setIsModalOpen(false)}
          handleSubmit={handleSubmit}
          contractors={contractors}
          setFormData={setFormData}
          adminDecisionTaskLoading={adminDecisionTaskLoading}
          errors={errors}
        />
      )}
    </div>
  );
};

// --- Sub-Components (Internal for single-file demo) ---

export default AdminVerificationReportPage;
