import { useNavigate } from "react-router-dom";
import {
  useAdminDecisionTaskMutation,
  useGetContractorsQuery,
  useGetPendingVerificationDetailQuery,
} from "../../../services/admin/issue_execution_service";

import { useState } from "react";
import { errorToast, successToast } from "../../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";
export default function useAdminPendingVerificationDetails(id) {
  const navigate = useNavigate();
  const [adminDecisionTask, { isLoading: adminDecisionTaskLoading }] =
    useAdminDecisionTaskMutation();
  const { data: contra, isLoading: contractorsLoading } =
    useGetContractorsQuery();
  const { data: pendingVerificationDetail, pendingVerificationDetailLoading } =
    useGetPendingVerificationDetailQuery(id);
  const contractors = contra?.results || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    decision_type: "",
    reason: "",
    public_message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminDecisionTask({ data: formData, id: id }).unwrap();
      successToast({
        title: "decision successfull",
        description: "The decision has been made successfully.",
      });
      navigate(`/admin/execution/verification-reports`);

    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    } finally {
      setIsModalOpen(false);
    }
  };
  return {
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
    handleSubmit
  };
}
