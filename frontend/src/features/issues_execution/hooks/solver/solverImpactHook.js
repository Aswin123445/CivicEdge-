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
const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    public_impact_summary: "",
    estimated_people_affected: "",
    local_feedback_summary: "",
  });
const validate = () => {
  const newErrors = {};

  const impact = formData.public_impact_summary?.trim();
  const feedback = formData.local_feedback_summary?.trim();
  const people = Number(formData.estimated_people_affected);

  //  Public Impact Summary
  if (!impact) {
    newErrors.public_impact_summary = "This field is required";
  } else if (impact.length < 15) {
    newErrors.public_impact_summary =
      "Must be at least 15 characters";
  } else if (!/[a-zA-Z]/.test(impact)) {
    newErrors.public_impact_summary =
      "Must contain meaningful text";
  }

  //  Estimated People Affected
  if (!formData.estimated_people_affected) {
    newErrors.estimated_people_affected = "Required";
  } else if (isNaN(people)) {
    newErrors.estimated_people_affected = "Must be a number";
  } else if (people <= 0) {
    newErrors.estimated_people_affected =
      "Must be greater than 0";
  } else if (people > 1000000) {
    newErrors.estimated_people_affected =
      "Unrealistic value";
  }

  //  Local Feedback Summary
  if (!feedback) {
    newErrors.local_feedback_summary = "This field is required";
  } else if (feedback.length < 10) {
    newErrors.local_feedback_summary =
      "Must be at least 10 characters";
  } else if (!/[a-zA-Z]/.test(feedback)) {
    newErrors.local_feedback_summary =
      "Must contain meaningful text";
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
    errors
  };
}
