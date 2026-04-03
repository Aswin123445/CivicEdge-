// components/shared/Skeleton.jsx
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

export default Skeleton;
