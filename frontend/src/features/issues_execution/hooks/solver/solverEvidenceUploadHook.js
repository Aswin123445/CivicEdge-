import { useNavigate } from "react-router-dom";
import { uploadImagesBatch } from "../../../../utils/cloudinary";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { normalizeCloudinaryEvidenceSolverVerification } from "../../../issues/utils";
import { useSolverVerificationEvidenceStep4Mutation } from "../../services/solver/issue_execution_service_solver";
import { useState, useRef } from "react";
export default function useSolverEvidenceUploadHook(draft_id,task_id) {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState([]); // stores actual File object for upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [evidences, setEvidences] = useState([]); // stores image preview

  const [
    uploadEvidence,
    {
      isLoading: evidenceIsLoading,
      isFetching: evidenceFetching,
      isSuccess: evidenceSuccess,
      isError: evidenceError,
    },
  ] = useSolverVerificationEvidenceStep4Mutation();
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImageFile((prev) => [...prev, ...files]);

    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return {
          id: crypto.randomUUID(),
          public_id: `civicedge_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          secure_url: URL.createObjectURL(file),

          file_name: file.name,
          format: file.name.split(".").pop(),
          mime_type: file.type,
          resource_type: file.type.startsWith("video") ? "video" : "image",

          size: file.size,
          last_modified: file.lastModified,
        };
      });

      const newMetadata = await Promise.all(uploadPromises);

      setEvidences((prev) => [...prev, ...newMetadata]);
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({ title: "Image upload failed", description: message });
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmit = async () => {
    if (imageFile.length === 0) {
      errorToast({
        title: "No evidence uploaded",
        description: "Please upload at least one evidence file.",
      });
      return;
    }

    setIsSubmitting(true);
    // API Call: POST /solver/verification-draft/<draft_id>/evidence/
    try {
      const results = await uploadImagesBatch(imageFile,setIsSubmitting );
      const normalizedResults = results.map(
        normalizeCloudinaryEvidenceSolverVerification,
      );
        await uploadEvidence({
          req: { evidences: normalizedResults },
          draft_id,
        }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Evidence uploaded successfully",
      });
      navigate(`/solver/tasks/${draft_id}/verification/review`, {
        state: { task_id: task_id },
      });
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Image upload failed",
        description: `${message || "An error occurred during image upload."}`,
      });
    }
    setIsSubmitting(false);
  };
  const steps = [
    { id: 1, label: "Ground", status: "completed" },
    { id: 2, label: "Impact", status: "completed" },
    { id: 3, label: "Estimation", status: "completed" },
    { id: 4, label: "Evidence", status: "current" },
    { id: 5, label: "Submit", status: "pending" },
  ];
  const removeEvidence = (id) => {
    setEvidences((prev) => prev.filter((item) => item.public_id !== id));
  };
  return {
    uploadEvidence,
    evidenceIsLoading,
    evidenceFetching,
    evidenceSuccess,
    evidenceError,
    handleFileUpload,
    imageFile,
    setImageFile,
    setIsSubmitting,
    isSubmitting,
    isUploading,
    setIsUploading,
    evidences,
    setEvidences,
    handleSubmit,
    steps,
    removeEvidence,
    fileInputRef,
  };
}
