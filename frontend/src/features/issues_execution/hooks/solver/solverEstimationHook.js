import { useNavigate } from "react-router-dom";
import { useSolverEstimateStep3Mutation } from "../../services/solver/issue_execution_service_solver";
import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";

export default function useSolverEstimation(draft_id, task_id) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    estimated_budget: "",
    estimated_duration_days: "",
    site_constraints: "",
    execution_risks: "",
  });
  const [solverEstimateStep3, { isLoading, isFetching, isSuccess, isError }] =
    useSolverEstimateStep3Mutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await solverEstimateStep3({ data: formData, draft_id }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "moving to the next task",
      });
      navigate(`/solver/tasks/${draft_id}/verification/evidence`, {
        state: { task_id: task_id },
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
    setLoading(false);
  };
  return {
    solverEstimateStep3,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    handleSubmit,
    loading,
    formData,
    setFormData,
  };
}
