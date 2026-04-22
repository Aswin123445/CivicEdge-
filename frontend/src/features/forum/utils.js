const validate = ({ title, content, categoryId }) => {
  const errors = {};

  const cleanTitle = (title ?? "").trim();
  const cleanContent = (content ?? "").trim();

  //  Title
  if (!cleanTitle) {
    errors.title = "Title is required";
  } else if (cleanTitle.length < 5) {
    errors.title = "Title must be at least 5 characters";
  } else if (!/[a-zA-Z]/.test(cleanTitle)) {
    errors.title = "Title must contain meaningful text";
  } else if (!/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(cleanTitle)) {
    errors.title = "Invalid characters in title";
  }

  //  Content
  if (!cleanContent) {
    errors.content = "Content is required";
  } else if (cleanContent.length < 15) {
    errors.content = "Content must be at least 15 characters";
  } else if (!/[a-zA-Z]/.test(cleanContent)) {
    errors.content = "Content must contain meaningful text";
  } else if (!/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(cleanContent)) {
    errors.content = "Invalid characters in content";
  }

  //  Category
  if (!categoryId) {
    errors.categoryId = "Please select a category";
  }

  return errors;
};

export { validate };