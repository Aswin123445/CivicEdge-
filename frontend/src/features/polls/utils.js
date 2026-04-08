const getTimeRemaining = (dateString, status = null) => {
  if (!dateString) return null;

  const end = new Date(dateString);
  if (isNaN(end)) return null;

  const now = new Date();
  const diffMs = end - now;

  if (diffMs <= 0 || status === "closed") return "Poll Closed";

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days > 0) return `Closes in ${days} day${days > 1 ? "s" : ""}`;
  if (hours > 0) return `Closes in ${hours} hour${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `Closes in ${minutes} min`;

  return "Closing now";
};
export default getTimeRemaining;


const buildExpiryDateTime = (formData) => {
  const { expiry_date, expiry_time } = formData;

  if (!expiry_date || !expiry_time) return null;
  return `${expiry_date}T${expiry_time}:00`;
}; 

const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "closed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    }
  };
export { buildExpiryDateTime, getStatusColor };


