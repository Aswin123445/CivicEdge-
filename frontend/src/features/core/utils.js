const getInitial = (name) => {
  if (!name || typeof name !== "string") return "U"; // default
  return name.trim().charAt(0).toUpperCase();
}; 

export default getInitial
export function capitalizeWords(text = "") {
  if (!text) return "";

  return text
    .trim()
    .split(/\s+/)               // split on one or more spaces
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}


export const pulseAnimation = {
  animate: {
    boxShadow: [
      "0 0 0 rgba(0,0,0,0)",
      "0 0 12px rgba(59,130,246,0.25)",
      "0 0 0 rgba(0,0,0,0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};