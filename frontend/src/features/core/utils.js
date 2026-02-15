const getInitial = (name) => {
  if (!name || typeof name !== "string") return "U"; // default
  return name.trim().charAt(0).toUpperCase();
}; 

export default getInitial