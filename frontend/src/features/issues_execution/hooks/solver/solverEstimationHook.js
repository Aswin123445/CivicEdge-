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
  const [errors, setErrors] = useState({});
  const [solverEstimateStep3, { isLoading, isFetching, isSuccess, isError }] =
    useSolverEstimateStep3Mutation();
  const validate = () => {
    const newErrors = {};

    const budget = Number(formData.estimated_budget);
    const duration = Number(formData.estimated_duration_days);
    const constraints = formData.site_constraints?.trim();
    const risks = formData.execution_risks?.trim();

    //  Budget
    if (!formData.estimated_budget) {
      newErrors.estimated_budget = "Budget is required";
    } else if (isNaN(budget)) {
      newErrors.estimated_budget = "Must be a number";
    } else if (budget <= 0) {
      newErrors.estimated_budget = "Must be greater than 0";
    } else if (budget > 100000000) {
      newErrors.estimated_budget = "Unrealistic value";
    }

    //  Duration
    if (!formData.estimated_duration_days) {
      newErrors.estimated_duration_days = "Duration is required";
    } else if (isNaN(duration)) {
      newErrors.estimated_duration_days = "Must be a number";
    } else if (duration <= 0) {
      newErrors.estimated_duration_days = "Must be at least 1 day";
    } else if (duration > 3650) {
      newErrors.estimated_duration_days = "Too long";
    }

    //  Site Constraints
    if (!constraints) {
      newErrors.site_constraints = "This field is required";
    } else if (constraints.length < 10) {
      newErrors.site_constraints = "Minimum 10 characters required";
    } else if (!/[a-zA-Z]/.test(constraints)) {
      newErrors.site_constraints = "Must contain meaningful text";
    }

    //  Execution Risks
    if (!risks) {
      newErrors.execution_risks = "This field is required";
    } else if (risks.length < 10) {
      newErrors.execution_risks = "Minimum 10 characters required";
    } else if (!/[a-zA-Z]/.test(risks)) {
      newErrors.execution_risks = "Must contain meaningful text";
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
  console.log(errors)
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
    errors,
  };
}
