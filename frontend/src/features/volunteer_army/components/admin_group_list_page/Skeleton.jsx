// components/admin/Skeleton.jsx

/**
 * Dark-theme skeleton primitive — use across all admin components.
 * @param {string} className - Tailwind sizing/shape classes
 */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`} />
);

export default Skeleton;
