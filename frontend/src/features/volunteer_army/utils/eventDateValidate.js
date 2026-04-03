import { infoToast } from "../../../utils/Toaster";

const validate = (formData) => {
  const errors = {};

  // 🔹 Basic validations
  if (!formData.group)
    errors.group = "Please select a group";

  if (!(formData.title ?? "").trim())
    errors.title = "Title is required";

  if (!(formData.location_name ?? "").trim())
    errors.location_name = "Location name is required";

  if (!(formData.location_address ?? "").trim())
    errors.location_address = "Address is required";

  if (!formData.capacity || Number(formData.capacity) <= 0)
    errors.capacity = "Must be greater than 0";

  if (formData.start_time && formData.end_time) {
    const now = new Date();
    const start = new Date(formData.start_time);
    const end = new Date(formData.end_time);

    const minStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    if (start < minStart) {
      errors.start_time = "Start time must be at least 24 hours from now";
    }
    if (end <= start) {
      errors.end_time = "End time must be after start time";
    }
  }

  return errors;
};

const updateValidate = (formData,setErrors) => {
    let errs = {};
    if (!formData.title?.trim()) errs.title = "Title is required";
    if (!formData.location_name?.trim()) errs.location_name = "Location name is required";
    if (new Date(formData.end_time) <= new Date(formData.start_time)) {
      errs.end_time = "End time must be after start time";
    }
    if (formData.capacity <= 0) errs.capacity = "Must be > 0";
    
    setErrors(errs);
    if(Object.keys(errs).length > 0)
    infoToast({ title: "Validation Error", description: "Please correct the highlighted fields." });
    return Object.keys(errs).length === 0;
  };
export  {updateValidate}

export default validate;