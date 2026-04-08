import { useAdminCreatePollMutation } from "../../services/admin/pollService";
import React, { useState, useEffect, useMemo } from "react";
import { buildExpiryDateTime } from "../../utils";
import { uploadToCloudinary } from "../../../../utils/cloudinary";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { useNavigate } from "react-router-dom";
export default function useAdminCreatePoll() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    context: "",
    did_you_know: "",
    image_url: "",
    expires_at: "",
    expiry_time: "",
    expiry_date: "",
    options: [
      { id: Date.now(), text: "" },
      { id: Date.now() + 1, text: "" },
    ],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createPoll, { isLoading: createPollLoading }] =
    useAdminCreatePollMutation();

  const handleAddOption = () => {
    if (formData.options.length < 5) {
      setFormData({
        ...formData,
        options: [...formData.options, { id: Date.now(), text: "" }],
      });
    }
  };

  const handleRemoveOption = (id) => {
    if (formData.options.length > 2) {
      setFormData({
        ...formData,
        options: formData.options.filter((opt) => opt.id !== id),
      });
    }
  };

  const handleOptionChange = (id, value) => {
    setFormData({
      ...formData,
      options: formData.options.map((opt) =>
        opt.id === id ? { ...opt, text: value } : opt,
      ),
    });
  };
  const duplicateIndices = useMemo(() => {
    const texts = formData.options.map((o) => o.text.trim().toLowerCase());
    return texts
      .map((text, idx) =>
        text !== "" && texts.indexOf(text) !== idx ? idx : -1,
      )
      .filter((idx) => idx !== -1);
  }, [formData.options]);

  const isValid = useMemo(() => {
    const hasQuestion = formData.question.trim().length > 0;
    const hasContext = formData.context.trim().length > 0;
    const hasValidOptions =
      formData.options.every((o) => o.text.trim() !== "") &&
      formData.options.length >= 2 &&
      duplicateIndices.length === 0;
    const expires_at = buildExpiryDateTime(formData);
    const hasFutureDate =
      expires_at !== "" && new Date(expires_at) > new Date();

    return hasQuestion && hasContext && hasValidOptions && hasFutureDate;
  }, [formData, duplicateIndices]);

  const getOptionGuidance = () => {
    const count = formData.options.length;
    if (count === 2)
      return {
        text: "Consider adding more options for balanced discussion",
        color: "text-blue-400",
      };
    if (count >= 3 && count <= 4)
      return { text: "Good number of options", color: "text-emerald-400" };
    return {
      text: "Too many options may reduce clarity",
      color: "text-amber-400",
    };
  };
  const handleImageUpload = async (file) => {
    setIsUploading(true);
    const uploaded = await uploadToCloudinary(file);
    setIsUploading(false);
    setFormData({ ...formData, image_url: uploaded.secure_url });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    const expires_at = buildExpiryDateTime(formData);
    const payload = {
      ...formData,
      expires_at,
      options: formData.options.map((o) => ({ text: o.text })),
    };
    try {
      await createPoll(payload);
      successToast({
        title: "Action Successfull",
        description: "Poll created successfully",
      });
      setIsSubmitting(false);
      navigate("/admin/polls");
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Submission failed", description: message });
      setIsSubmitting(false);
    }
  };
  return {
    formData,
    setFormData,
    createPoll,
    createPollLoading,
    isUploading,
    setIsUploading,
    isSubmitting,
    setIsSubmitting,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    duplicateIndices,
    isValid,
    getOptionGuidance,
    handleImageUpload,
    handleSubmit,
    navigate
  };
}
