import { useNavigate } from "react-router-dom";
import { uploadImagesBatch } from "../../../../utils/cloudinary";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { normalizeCloudinaryEvidenceSolverVerification } from "../../../issues/utils";
import {
  useSolverTaskCompleteMutation,
  useSolverTaskUpdateListQuery,
  useSolverTaskUpdateMutation,
} from "../../services/solver/issue_execution_service_solver";
import { useState } from "react";
export default function useSolverTaskUpdateHook(task_id) {
    const navigate = useNavigate();
  const { data, isLoading:isLoadingUpdate, isFetching:isFetchingUpdate } =
    useSolverTaskUpdateListQuery(task_id);
  const [
    updateProgress,
    { isLoading: isLoadingUpdateRes, isFetching: isFetchingUpdateRes },
  ] = useSolverTaskUpdateMutation();
  const progressUpdteas = data?.results || [];
  const progress_stat = data?.latest_progress_percentage || 0;
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagefile, setImagefile] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProgress = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {};

    const progress_summary = formData.get("progress_summary")?.trim();
    const progress_percentage = formData.get("progress_percentage");
    const blockers = formData.get("blockers")?.trim();
    const next_steps = formData.get("next_steps")?.trim();

    if (progress_summary) data.progress_summary = progress_summary;
    if (progress_percentage !== null && progress_percentage !== "")
      data.progress_percentage = Number(progress_percentage);
    if (blockers) data.blockers = blockers;
    if (next_steps) data.next_steps = next_steps;

    try {
      await updateProgress({ data, task_id }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Progress updated successfully.",
      });
    } catch (e) {
      const message = extractErrorMessage(e);
      errorToast({
        title: "something wrong",
        description: `${message || "An error occurred pleas try again."}`,
      });
    } finally {
      setIsProgressModalOpen(false);
    }
  };

  const [completeTask, { isLoading: isUpdateComplete }] =
    useSolverTaskCompleteMutation();

  const handleSubmitCompletion = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    const completion_summary = formData.get("completion_summary")?.trim();
    try {
      const results = await uploadImagesBatch(imagefile, setIsSubmitting);
      const normalizer = results.map(
        normalizeCloudinaryEvidenceSolverVerification,
      );
      const data = {
        completion_summary,
        evidences: normalizer,
      };
      await completeTask({
        data,
        task_id,
      }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Final Progress completed Sucessfully",
      });
      navigate(`/solver/task/${task_id}`);
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Image upload failed",
        description: `${message || "An error occurred during image upload."}`,
      });
    }
    finally {
      setIsCompletionModalOpen(false);
      setIsSubmitting(false);
    }
  };
  return {
    progressUpdteas,
    isLoadingUpdate,
    isFetchingUpdate,
    updateProgress,
    isLoadingUpdateRes,
    isFetchingUpdateRes,
    handleAddProgress,
    isProgressModalOpen,
    setIsProgressModalOpen,
    isCompletionModalOpen,
    setIsCompletionModalOpen,
    selectedFiles,
    setSelectedFiles,
    progress_stat,
    imagefile,
    setImagefile,
    isSubmitting,
    handleSubmitCompletion,
    setIsSubmitting
  };
}
