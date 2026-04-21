import PageHeader from "../components/admin_execution_proof_details_page/PageHeader";
import AdminCompletionReportSection from "../components/admin_execution_proof_details_page/AdminCompletionReportSection";
import AdminEvidenceGallery from "../components/admin_execution_proof_details_page/AdminEvidenceGallery";
import AdminProofDetailsExecutionTimeLine from "../components/admin_execution_proof_details_page/AdminProofDetailsExecutionTimeLine";
import AdminProofDetailsRightSide from "../components/admin_execution_proof_details_page/AdminProofDetailsRightSide";
import DecisionModal from "../ui/admin_execution_proof_details_page/DecisionModal";
import AdminProofDetailsSkelton from "../components/admin_execution_proof_details_page/AdminProofDetailsSkelton";
import useAdminFinalDetailsHook from "../hooks/admin/admin_final_report_details/adminFinalDetailsHook";
import { useParams } from "react-router-dom";
import IssueEvidenceGallary from "../components/admin_execution_proof_details_page/IssueEvidenceGallary";
const AdminExecutionProofDetailPage = () => {
  const { id } = useParams();
  const {
    adminFinalReportDetail,
    adminFinalReportDetailLoading,
    adminFinalReportDetailFetching,
    showModal,
    setShowModal,
    decisionType,
    setDecisionType,
    isSubmitting,
    setIsSubmitting,
    submitData,
    setSubmitData,
    handleAdminDecision,
    errors,
  } = useAdminFinalDetailsHook(id);

  const handleOpenModal = (type) => {
    setDecisionType(type);
    setShowModal(true);
  };

  if (adminFinalReportDetailLoading || adminFinalReportDetailFetching) return <AdminProofDetailsSkelton />;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* COMPONENT: PageHeader 
            Move to: components/admin/execution/PageHeader.jsx
        */}
        <PageHeader proofData={adminFinalReportDetail} handleOpenModal={handleOpenModal} />

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDE: Review Content */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* COMPONENT: CompletionReportSection */}
            <AdminCompletionReportSection proofData={adminFinalReportDetail} />

            {/* COMPONENT: EvidenceGallery */}
            <AdminEvidenceGallery proofData={adminFinalReportDetail} />
            <IssueEvidenceGallary proofData={adminFinalReportDetail} />

            {/* COMPONENT: ExecutionTimeline */}
            <AdminProofDetailsExecutionTimeLine proofData={adminFinalReportDetail} />
          </main>

          {/* RIGHT SIDE: Sidebar Context Panel */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <AdminProofDetailsRightSide
              proofData={adminFinalReportDetail}
              handleOpenModal={handleOpenModal}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </aside>
        </div>
      </div>

      {/* COMPONENT: DecisionModal */}
      {showModal && (
        <DecisionModal
          type={decisionType}
          onClose={() => setShowModal(false)}
          onSubmit= {handleAdminDecision}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      )}
    </div>
  );
};

export default AdminExecutionProofDetailPage;
