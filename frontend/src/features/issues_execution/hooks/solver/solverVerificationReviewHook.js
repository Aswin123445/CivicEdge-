import {
  useDraftDetailQuery,
  useSolverSubmitVerificationMutation,
} from "../../services/solver/issue_execution_service_solver";
import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useNavigate } from "react-router-dom";

export default function useSolverVerificationReviewHook(draft_id,task_id) {
      const navigate = useNavigate();
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [solverSubmitVerification, { isLoading: submit }] =
    useSolverSubmitVerificationMutation();
  const { data: draft, isLoading, isFetching } = useDraftDetailQuery(draft_id);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    // API Call: POST /solver/tasks/<task_id>/submit-verification/
    try {
      await solverSubmitVerification({task_id}).unwrap();
      navigate(`/solver/task/${task_id}`);
      successToast({
        title: "Submmission Successfull",
        description: "Verification submitted successfully please wait for approval!",
      })
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
    setIsSubmitting(false);
    setShowConfirmModal(false);
  };

  return {
    draft,
    isLoading,
    isFetching,
    submit,
    solverSubmitVerification,
    isSubmitting,
    showConfirmModal,
    setShowConfirmModal,
    handleFinalSubmit,
  };
}
