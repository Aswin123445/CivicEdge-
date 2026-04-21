import { useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../../utils/Toaster";
import { useAdminSubmitFinalReportDecisionMutation, useGetAdminFinalReportDetailQuery } from "../../../services/admin/issue_execution_service";
import { useState } from "react";
export default function useAdminFinalDetailsHook(id) {
  // --- State ---
  const [showModal, setShowModal] = useState(false);
  const [decisionType, setDecisionType] = useState(null); // 'APPROVE' or 'REJECT'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState(null);
  const {
    data: adminFinalReportDetail,
    isLoading: adminFinalReportDetailLoading,
    isFetching: adminFinalReportDetailFetching,
  } = useGetAdminFinalReportDetailQuery(id);


  const [adminFinalReportDecision, { isLoading: adminFinalReportDecisionLoading }] = useAdminSubmitFinalReportDecisionMutation();
  const naviagate = useNavigate();
  const handleAdminDecision = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const decision = decisionType
    const public_message = formData.get("public_message"); 
    const reason = formData.get("reason"); 
    const data = {
      decision,
      public_message,
      reason,
    }
    try {
      await adminFinalReportDecision({ data, id }).unwrap();
      successToast({
        title: "decision successfull",
        description: "The decision has been made successfully.",
      });
      naviagate(`/dashboard/execution/execution-proofs`);
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
    finally{
      setIsSubmitting(false);
      setShowModal(false);
    }
  }
  return {
    adminFinalReportDetail,
    adminFinalReportDetailLoading,
    adminFinalReportDetailFetching,
    showModal,
    setShowModal,
    decisionType,
    setDecisionType,
    isSubmitting,
    setIsSubmitting,
    handleAdminDecision,
    submitData,
    setSubmitData,
  };
}
