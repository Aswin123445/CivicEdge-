import { useCreatePostMutation } from "../../services/citizen/forumServices";
import { useState } from "react";
import { validate } from "../../utils";
import { useNavigate } from "react-router-dom";
import { uploadImagesBatch } from "../../../../utils/cloudinary";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
export default function useCreatePost() {
  const navigate = useNavigate();
  const [createPost, { isLoading: createPostLoading }] =
    useCreatePostMutation();

  // Form fields
  const [fields, setFields] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  // Image state
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleAddImages = (fileList) => {
    const selected = Array.from(fileList ?? []);
    if (files.length + selected.length > 5) {
      setErrors((prev) => ({ ...prev, images: "Maximum 5 images allowed" }));
      return;
    }
    const newPreviews = selected.map((f) => URL.createObjectURL(f));
    setFiles((prev) => [...prev, ...selected]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    setErrors((prev) => ({ ...prev, images: null }));
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    let payload = {};
    try {
      const uploadedImages = await uploadImagesBatch(files, setIsSubmitting);
      const formattedImages = uploadedImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
      }));
      if (formattedImages.length > 0) payload.images = formattedImages;

      payload = {
        ...payload,
        title: fields.title.trim(),
        content: fields.content.trim(),
        category_id: fields.categoryId,
      };

      await createPost(payload).unwrap();
      successToast({
        title: "Post Created",
        description: "Your post has been created.",
      });
      navigate("/forum/home");
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({
        title: "Post creation failed",
        description: `${message || "An error occurred during post creation."}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/forum/home");
  };
  return {
    createPost,
    fields,
    setFields,
    files,
    setFiles,
    previews,
    setPreviews,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleAddImages,
    handleRemoveImage,
    handleSubmit,
    handleCancel,
  };
}
