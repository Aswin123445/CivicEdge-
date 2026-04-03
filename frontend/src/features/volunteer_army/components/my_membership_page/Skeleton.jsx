// components/shared/Skeleton.jsx
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export default Skeleton;
