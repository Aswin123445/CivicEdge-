import { useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useSolverImpactStep2Mutation } from "../../services/solver/issue_execution_service_solver";
import { useState } from "react";
export default function useSolverImpact(draft_id, task_id) {
  const navigate = useNavigate();
  const [solverImpactStep2, { isLoading, isFetching, isSuccess, isError }] =
    useSolverImpactStep2Mutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    public_impact_summary: "",
    estimated_people_affected: "",
    local_feedback_summary: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await solverImpactStep2({ data: formData, draft_id }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Issue Impact successfully.",
      });
      navigate(`/solver/tasks/${draft_id}/verification/estimation`, {
        state: { task_id: task_id },
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    solverImpactStep2,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    loading,
    formData,
    setFormData,
    handleSubmit,
    setLoading,
  };
}
