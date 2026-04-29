export function extractErrorMessage(error) {
  if (error?.status === 500) {
    return "We’re facing a temporary issue while processing your request. Our team is working on it. Please try again shortly.";
  }

  // Validation field errors first
  if (error?.data?.errors) {
    const errors = error.data.errors;

    const firstKey = Object.keys(errors)[0];

    if (firstKey) {
      const value = errors[firstKey];

      if (Array.isArray(value)) return value[0];

      return value;
    }
  }

  // fallback generic backend message
  if (error?.data?.message) {
    return error.data.message;
  }

  return "Something went wrong. Please try again.";
}
