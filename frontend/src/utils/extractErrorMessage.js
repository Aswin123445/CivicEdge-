export function extractErrorMessage(error) {
  const data = error?.data;

  if (!data) return 'Something went wrong. Please try again.';

  //  NEW: Handle array response directly
  if (Array.isArray(data)) {
    return data[0];
  }

  //  DRF non-field errors
  if (Array.isArray(data.non_field_errors)) {
    return data.non_field_errors[0];
  }

  //  DRF detail message
  if (typeof data.detail === 'string') {
    return data.detail;
  }

  //  Field-level errors
  if (typeof data === 'object') {
    const firstKey = Object.keys(data)[0];
    const firstError = data[firstKey];

    if (Array.isArray(firstError)) {
      return `${firstKey}: ${firstError[0]}`;
    }
  }

  //  Fallback
  return 'Something went wrong. Please try again.';
}