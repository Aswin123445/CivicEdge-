import { useAdminCreatePollMutation } from "../../services/admin/pollService";
import React, { useState, useEffect, useMemo } from "react";
import { buildExpiryDateTime } from "../../utils";
import { uploadToCloudinary } from "../../../../utils/cloudinary";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { useNavigate } from "react-router-dom";
const validate = (formData, duplicateIndices) => {
  const errors = {};

  const question = formData.question?.trim();
  const context = formData.context?.trim();
  const didYouKnow = formData.did_you_know?.trim();

  //  Question
  if (!question) {
    errors.question = "Question is required";
  } else if (question.length < 15) {
    errors.question = "Minimum 15 characters required";
  } else if (!/[a-zA-Z]/.test(question)) {
    errors.question = "Must contain meaningful text";
  }

  //  Context
  if (!context) {
    errors.context = "Context is required";
  } else if (context.length < 10) {
    errors.context = "Minimum 10 characters required";
  } else if (!/[a-zA-Z]/.test(context)) {
    errors.context = "Must contain meaningful text";
  }

  //  Did You Know (optional)
  if (didYouKnow && didYouKnow.length < 10) {
    errors.did_you_know = "Must be at least 10 characters if provided";
  }

  //  Options
  if (formData.options.length < 2) {
    errors.options = "At least 2 options required";
  } else if (formData.options.some((o) => !o.text.trim())) {
    errors.options = "Options cannot be empty";
  } else if (duplicateIndices.length > 0) {
    errors.options = "Duplicate options are not allowed";
  }

  //  Expiry
  const expires_at = buildExpiryDateTime(formData);

  if (!expires_at) {
    errors.expires_at = "Expiry date is required";
  } else if (new Date(expires_at) <= new Date()) {
    errors.expires_at = "Must be a future date";
  }

  return errors;
};

export default function useAdminCreatePoll() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
    const err = validate(formData, duplicateIndices);
    console.log(err)
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setIsSubmitting(true);
    const expires_at = buildExpiryDateTime(formData);
    const payload = {
      ...formData,
      expires_at,
      options: formData.options.map((o) => ({ text: o.text })),
    };
    try {
      await createPoll(payload).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Poll created successfully",
      });
      setIsSubmitting(false);
      navigate("/dashboard/polls");
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
    getOptionGuidance,
    handleImageUpload,
    handleSubmit,
    navigate,
    errors,
  };
}
