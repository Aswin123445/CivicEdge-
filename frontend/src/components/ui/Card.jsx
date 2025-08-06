export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-md border border-gray-200 p-7 max-w-sm w-full ${className}`}
    >
      {children}
    </div>
  );
}
