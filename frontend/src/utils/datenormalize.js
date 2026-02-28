export function formatDate(
  date,
  locale = "en-IN",
  options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
) {
  if (!date) return null;

  try {
    return new Date(date).toLocaleDateString(locale, options);
  } catch {
    return null;
  }
}