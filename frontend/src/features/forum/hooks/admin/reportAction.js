import { useState } from "react";
import { useReportTakeActionMutation } from "../../services/admin/forumServices";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";

export default function useReportTakeAction(id) {
  const [reportAction, { isLoading: reportActionLoading }] =
    useReportTakeActionMutation();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [actionReason, setActionReason] = useState("");
  const [validationError, setValidationError] = useState("");
  const handleActionSubmit = async () => {
    setValidationError("");

    if (
      ["hide", "remove", "reject"].includes(selectedAction) &&
      !actionReason.trim()
    ) {
      setValidationError("A reason is required for this action.");
      return;
    }

    setIsActionLoading(true);

    try {
      await reportAction({
        data: {
          action: selectedAction,
          reason: actionReason,
        },
        id,
      }).unwrap();
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Error",
        description: message || "An error occurred",
      });
      setValidationError("Failed to process action. Please try again.");
    } finally {
      setIsActionLoading(false);
      setModalOpen(false);
      setSelectedAction("");
      setActionReason("");
    }
  };
  return {
    reportActionLoading,
    isActionLoading,
    modalOpen,
    setModalOpen,
    selectedAction,
    setSelectedAction,
    actionReason,
    setActionReason,
    validationError,
    setValidationError,
    handleActionSubmit,
  };
}
