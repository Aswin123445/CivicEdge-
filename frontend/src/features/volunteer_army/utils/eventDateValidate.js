import { infoToast } from "../../../utils/Toaster";

const validate = (formData) => {
  const errors = {};

  const group = formData.group;
  const title = (formData.title ?? "").trim();
  const location_name = (formData.location_name ?? "").trim();
  const location_address = (formData.location_address ?? "").trim();
  const capacity = Number(formData.capacity);
  const description = (formData.description ?? "").trim();

  // Group
  if (!group) {
    errors.group = "Please select a group";
  }

  // Title
  if (!title) {
    errors.title = "Title is required";
  } else if (title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  } else if (title.length > 120) {
    errors.title = "Title must be less than 120 characters";
  } else if (!/[a-zA-Z]/.test(title)) {
    errors.title = "Title must contain letters";
  } else if (/^(test|event|aaaa+|qwerty)$/i.test(title)) {
    errors.title = "Please enter a meaningful title";
  }

  // Location name
  if (!location_name) {
    errors.location_name = "Location name is required";
  } else if (location_name.length < 3) {
    errors.location = "Location seems too short";
  } else if (location_name.length > 100) {
    errors.location_name = "Location name is too long";
  } else if (!/[a-zA-Z]/.test(location_name)) {
    errors.location_name = "Location must contain letters";
  }

  if (!location_address) {
    errors.location_address = "Location address is required";
  } else if (location_address.length < 15) {
    errors.location_address = "Location address seems too short";
  } else if (location_address.length > 300) {
    errors.location_address = "Location address name is too long";
  } else if (!/[a-zA-Z]/.test(location_address)) {
    errors.location_address = "Location address must contain letters";
  }


  // Capacity
  if (!formData.capacity) {
    errors.capacity = "Capacity is required";
  } else if (Number.isNaN(capacity)) {
    errors.capacity = "Capacity must be a number";
  } else if (capacity <= 0) {
    errors.capacity = "Must be greater than 0";
  } else if (!Number.isInteger(capacity)) {
    errors.capacity = "Capacity must be a whole number";
  } else if (capacity > 10000) {
    errors.capacity = "Capacity is too large";
  }

  // Date & Time
  if (!formData.start_time) {
    errors.start_time = "Start time is required";
  }

  if (!formData.end_time) {
    errors.end_time = "End time is required";
  }

  if (formData.start_time && formData.end_time) {
    const now = new Date();
    const start = new Date(formData.start_time);
    const end = new Date(formData.end_time);

    if (isNaN(start.getTime())) {
      errors.start_time = "Invalid start time";
    }

    if (isNaN(end.getTime())) {
      errors.end_time = "Invalid end time";
    }

    if (!errors.start_time && !errors.end_time) {
      const minStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      if (start < minStart) {
        errors.start_time = "Start time must be at least 24 hours from now";
      }

      if (end <= start) {
        errors.end_time = "End time must be after start time";
      }

      const minDurationMinutes = 30;
      const diffMinutes = (end - start) / (1000 * 60);

      if (diffMinutes < minDurationMinutes) {
        errors.end_time = "Event must be at least 30 minutes long";
      }

      const maxDurationDays = 7;
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);

      if (diffDays > maxDurationDays) {
        errors.end_time = "Event duration is too long";
      }
    }
  }

  return errors;
};

const updateValidate = (formData, setErrors) => {
  let errs = {};

  const title = formData.title?.trim();
  const location = formData.location_name?.trim();
  const capacity = Number(formData.capacity);


  // Title
  if (!title) {
    errs.title = "Title is required";
  } else if (title.length < 5) {
    errs.title = "Title must be at least 5 characters";
  } else if (!/[a-zA-Z]/.test(title)) {
    errs.title = "Title must contain letters";
  }

  // Location
  if (!location) {
    errs.location_name = "Location name is required";
  } else if (location.length < 3) {
    errs.location_name = "Location seems too short";
  }

  // Dates
  const start = new Date(formData.start_time);
  const end = new Date(formData.end_time);

  if (isNaN(start)) errs.start_time = "Invalid start time";
  if (isNaN(end)) errs.end_time = "Invalid end time";

  if (!errs.start_time && !errs.end_time) {
    if (end <= start) {
      errs.end_time = "End time must be after start time";
    }
  }

  // Capacity
  if (!capacity || capacity <= 0) {
    errs.capacity = "Capacity must be greater than 0";
  } else if (capacity > 1000) {
    errs.capacity = "Capacity too large";
  }

  setErrors(errs);

  if (Object.keys(errs).length > 0) {
    infoToast({
      title: "Validation Error",
      description: "Please correct the highlighted fields.",
    });
  }

  return Object.keys(errs).length === 0;
};
export { updateValidate };

export default validate;
