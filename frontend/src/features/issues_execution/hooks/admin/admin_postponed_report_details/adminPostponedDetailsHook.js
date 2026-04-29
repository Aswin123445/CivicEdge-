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
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    decision_type: "",
    reason: "",
    public_message: "",
  });
  const validate = () => {
    const newErrors = {};

    const decision = formData.decision_type;
    const reason = formData.reason?.trim();
    const message = formData.public_message?.trim();

    //  Decision Type
    if (!decision) {
      newErrors.decision_type = "Please select a decision";
    }

    //  Reason
    if (!reason) {
      newErrors.reason = "Reason is required";
    } else if (reason.length < 3) {
      newErrors.reason = "Must be at least 3 characters";
    }

    //  Public Message (optional)
    if (message && message.length < 3) {
      newErrors.public_message = "Must be at least 3 characters if provided";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await adminDecisionTask({ data: formData, id: id }).unwrap();
      successToast({
        title: "decision successfull",
        description: "The decision has been made successfully.",
      });
      navigate(`/dashboard/execution/verification-reports`);
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
    handleSubmit,
    errors,
  };
}
