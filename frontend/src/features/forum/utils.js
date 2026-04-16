const validate = ({ title, content, categoryId }) => {
  const errors = {};
  if ((title ?? "").trim().length < 3)
    errors.title = "Title must be at least 3 characters";
  if ((content ?? "").trim().length < 7)
    errors.content = "Content must be at least 7 characters";
  if (!categoryId) errors.categoryId = "Please select a category";
  return errors;
};

// ─── Mock image upload (replace with real S3 / Cloudinary call) ──────────────


export { validate };