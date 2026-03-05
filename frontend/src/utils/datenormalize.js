export function formatDate(
  date,
  locale = "en-IN",
  options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  if (!date) return null;

  try {
    return new Date(date).toLocaleString(locale, options);
  } catch {
    return null;
  }
}